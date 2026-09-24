#!/usr/bin/env python3
"""Uploader YouTube (phase 2) — upload résumable, programmation, miniature, playlist.

Ne traite QUE les kits validés (voir la partie 4 : il faut avoir tapé "OK" après
`VALIDATION:` dans checklist.md). `selfDeclaredMadeForKids` est toujours `true`,
sans exception, sur toute vidéo envoyée par ce script.

Installation :
    pip install -r publication/requirements.txt
    cp .env.example .env   # puis renseigne YOUTUBE_CLIENT_SECRETS_FILE

Usage :
    python3 publication/upload.py                # traite la file (max 5 uploads/jour)
    python3 publication/upload.py --dry-run       # simule, aucune requête envoyée
    python3 publication/upload.py --slug <slug>   # force un seul kit (ignore le quota)

Gestion du quota : un compteur journalier (heure de Paris) est conservé dans
upload_state.json. Si l'API renvoie quotaExceeded/dailyLimitExceeded, la file
d'attente s'arrête proprement — les kits restants sont simplement retraités au
prochain lancement (le lendemain), aucune action manuelle n'est nécessaire.
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

PUBLICATION_DIR = Path(__file__).resolve().parent
REPO_ROOT = PUBLICATION_DIR.parent
SUIVI_CSV = PUBLICATION_DIR / "suivi.csv"
UPLOAD_LOG_CSV = PUBLICATION_DIR / "upload_log.csv"
STATE_FILE = PUBLICATION_DIR / "upload_state.json"
PLAYLISTS_FILE = PUBLICATION_DIR / "playlists.json"

PARIS = ZoneInfo("Europe/Paris")
MAX_UPLOADS_PER_DAY = 5
SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube",
]
UPLOAD_LOG_FIELDS = ["slug", "youtube_video_id", "uploaded_at_utc", "publishAt_utc", "status"]


class QuotaExceededError(RuntimeError):
    pass


# ── Sélection de la file d'attente ──────────────────────────────────────────

def is_validated(kit_dir: Path) -> bool:
    """True seulement si checklist.md porte `VALIDATION: OK` (tapé à la main)."""
    checklist = kit_dir / "checklist.md"
    if not checklist.exists():
        return False
    for line in checklist.read_text(encoding="utf-8").splitlines():
        if line.strip().upper().startswith("VALIDATION:"):
            remainder = line.split(":", 1)[1].strip().upper()
            return remainder.startswith("OK")
    return False


def _already_uploaded_slugs() -> set[str]:
    if not UPLOAD_LOG_CSV.exists():
        return set()
    with UPLOAD_LOG_CSV.open(newline="", encoding="utf-8") as f:
        return {row["slug"] for row in csv.DictReader(f) if row.get("status") == "OK"}


def iter_pending_kits():
    uploaded = _already_uploaded_slugs()
    for kit_dir in sorted(p for p in PUBLICATION_DIR.iterdir() if p.is_dir()):
        if kit_dir.name in ("lib", "secrets") or kit_dir.name.startswith("."):
            continue
        metadata_path = kit_dir / "metadata.json"
        if not metadata_path.exists() or kit_dir.name in uploaded:
            continue
        if not is_validated(kit_dir):
            continue
        yield kit_dir.name, kit_dir, json.loads(metadata_path.read_text(encoding="utf-8"))


# ── Quota journalier ─────────────────────────────────────────────────────────

def _today_paris() -> str:
    return datetime.now(PARIS).date().isoformat()


def load_state() -> dict:
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        if state.get("date") == _today_paris():
            return state
    return {"date": _today_paris(), "count": 0}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


# ── Journal d'upload ─────────────────────────────────────────────────────────

def _log_upload(slug: str, video_id: str | None, metadata: dict, status: str) -> None:
    is_new = not UPLOAD_LOG_CSV.exists()
    with UPLOAD_LOG_CSV.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=UPLOAD_LOG_FIELDS)
        if is_new:
            writer.writeheader()
        writer.writerow({
            "slug": slug,
            "youtube_video_id": video_id or "",
            "uploaded_at_utc": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "publishAt_utc": metadata.get("publishAt_utc", ""),
            "status": status,
        })


# ── Client OAuth (imports paresseux : --dry-run marche sans ces libs) ──────

def _require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise SystemExit(f"Variable d'environnement manquante : {name} (voir .env.example)")
    return value


def get_youtube_client():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    client_secrets = _require_env("YOUTUBE_CLIENT_SECRETS_FILE")
    token_path = Path(os.environ.get("YOUTUBE_TOKEN_FILE", str(PUBLICATION_DIR / "secrets" / "token.json")))

    creds = None
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(client_secrets, SCOPES)
            creds = flow.run_local_server(port=0)
        token_path.parent.mkdir(parents=True, exist_ok=True)
        token_path.write_text(creds.to_json(), encoding="utf-8")

    return build("youtube", "v3", credentials=creds)


def _is_quota_error(http_error) -> bool:
    try:
        reason = json.loads(http_error.content).get("error", {}).get("errors", [{}])[0].get("reason", "")
    except Exception:
        reason = ""
    return reason in ("quotaExceeded", "dailyLimitExceeded", "rateLimitExceeded")


def resolve_playlist_id(youtube, name: str) -> str:
    cache = json.loads(PLAYLISTS_FILE.read_text(encoding="utf-8")) if PLAYLISTS_FILE.exists() else {}
    if name in cache:
        return cache[name]

    request = youtube.playlists().list(part="snippet", mine=True, maxResults=50)
    while request is not None:
        response = request.execute()
        for item in response.get("items", []):
            if item["snippet"]["title"] == name:
                cache[name] = item["id"]
                PLAYLISTS_FILE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
                return item["id"]
        request = youtube.playlists().list_next(request, response)

    created = youtube.playlists().insert(
        part="snippet,status",
        body={"snippet": {"title": name}, "status": {"privacyStatus": "public"}},
    ).execute()
    cache[name] = created["id"]
    PLAYLISTS_FILE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
    return created["id"]


def upload_one(youtube, kit_dir: Path, metadata: dict) -> str:
    from googleapiclient.errors import HttpError
    from googleapiclient.http import MediaFileUpload

    body = {
        "snippet": {
            "title": metadata["title"],
            "description": metadata["description"],
            "tags": metadata.get("tags", []),
            "categoryId": metadata["category"]["id"],
        },
        "status": {
            "privacyStatus": "private",
            "publishAt": metadata["publishAt_utc"],
            # Non négociable (étape 7) : vrai sur TOUTES les vidéos, sans exception.
            "selfDeclaredMadeForKids": True,
        },
    }
    media = MediaFileUpload(str(kit_dir / "video.mp4"), chunksize=-1, resumable=True, mimetype="video/mp4")
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

    response = None
    while response is None:
        try:
            status, response = request.next_chunk()
        except HttpError as e:
            if e.resp.status == 403 and _is_quota_error(e):
                raise QuotaExceededError() from e
            if e.resp.status in (500, 502, 503, 504):
                time.sleep(5)
                continue
            raise
        if status:
            print(f"   upload en cours : {int(status.progress() * 100)}%")

    video_id = response["id"]
    print(f"   ✅ vidéo créée : {video_id}")

    thumbnails = metadata.get("thumbnails") or []
    if thumbnails:
        thumb_path = kit_dir / thumbnails[0]
        if thumb_path.exists():
            youtube.thumbnails().set(videoId=video_id, media_body=MediaFileUpload(str(thumb_path))).execute()
            print(f"   ✅ miniature définie : {thumbnails[0]}")
            if len(thumbnails) > 1:
                autres = ", ".join(thumbnails[1:])
                print(f"   ℹ️ {autres} restent locales — active le test A/B dans YouTube Studio "
                      "(non exposé par l'API Data v3).")

    playlist_name = metadata.get("playlist")
    if playlist_name:
        playlist_id = resolve_playlist_id(youtube, playlist_name)
        youtube.playlistItems().insert(
            part="snippet",
            body={"snippet": {"playlistId": playlist_id,
                               "resourceId": {"kind": "youtube#video", "videoId": video_id}}},
        ).execute()
        print(f"   ✅ ajoutée à la playlist « {playlist_name} »")

    return video_id


# ── Boucle principale ────────────────────────────────────────────────────────

def _print_plan(metadata: dict) -> None:
    thumbnails = metadata.get("thumbnails") or []
    print(f"   catégorie      : {metadata['category']['name']}")
    print(f"   privacyStatus  : private -> publishAt {metadata['publishAt_paris']} (Paris) "
          f"/ {metadata['publishAt_utc']} (UTC)")
    print("   madeForKids    : true (non négociable)")
    print(f"   miniature      : {thumbnails[0] if thumbnails else '(aucune)'}")
    print(f"   playlist       : {metadata.get('playlist') or '(aucune)'}")
    print("   [dry-run] aucune requête envoyée à l'API YouTube")


def run(dry_run: bool, only_slug: str | None) -> None:
    state = load_state()
    remaining = MAX_UPLOADS_PER_DAY - state["count"]
    if remaining <= 0 and not only_slug:
        print(f"Quota du jour atteint ({MAX_UPLOADS_PER_DAY}/jour) — relance demain.")
        return

    youtube = None if dry_run else get_youtube_client()

    processed = 0
    for slug, kit_dir, metadata in iter_pending_kits():
        if only_slug and slug != only_slug:
            continue
        if not only_slug and processed >= remaining:
            break

        print(f"\n[{slug}] {metadata['title']}")
        if dry_run:
            _print_plan(metadata)
            processed += 1
            if only_slug:
                break
            continue

        try:
            video_id = upload_one(youtube, kit_dir, metadata)
        except QuotaExceededError:
            print("⚠️ Quota YouTube dépassé — file d'attente conservée, reprise automatique demain.")
            break
        except Exception as exc:  # noqa: BLE001 — on journalise et on continue la file
            print(f"❌ Échec upload {slug} : {exc}")
            _log_upload(slug, None, metadata, status="ERREUR")
            continue

        _log_upload(slug, video_id, metadata, status="OK")
        state["count"] += 1
        save_state(state)
        processed += 1
        if only_slug:
            break

    if processed == 0:
        print("Aucun kit validé en attente d'upload "
              "(tape OK après `VALIDATION:` dans checklist.md pour en débloquer un).")


def main() -> None:
    env_path = REPO_ROOT / ".env"
    if env_path.exists():
        try:
            from dotenv import load_dotenv
            load_dotenv(env_path)
        except ImportError:
            print("ℹ️ python-dotenv non installé — .env ignoré, variables d'environnement système utilisées.")

    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true", help="Simule sans rien envoyer à l'API YouTube")
    parser.add_argument("--slug", help="Ne traite que ce kit précis (ignore le quota journalier)")
    args = parser.parse_args()

    run(dry_run=args.dry_run, only_slug=args.slug)


if __name__ == "__main__":
    main()
