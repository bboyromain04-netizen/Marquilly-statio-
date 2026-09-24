#!/usr/bin/env python3
"""Génère un kit de publication YouTube prêt à l'emploi pour un épisode ou une compilation.

Usage :
    python3 publication/generate_kit.py episodes/<slug>/
    python3 publication/generate_kit.py compilations/<slug>/ --force

Le dossier source doit contenir :
    brief.json                  (obligatoire — voir episodes/README.md)
    video_final.mp4             (ou tout autre .mp4)
    thumbnails/A.png B.png C.png (optionnel — sinon des placeholders sont générés)

Produit publication/<slug>/ avec video.mp4, thumb_A/B/C.png, metadata.json, checklist.md,
et ajoute une ligne dans publication/suivi.csv (statut = EN_ATTENTE_DE_VALIDATION).
"""
from __future__ import annotations

import argparse
import csv
import json
import shutil
import sys
from datetime import timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from lib.scheduling import next_slot  # noqa: E402
from lib.thumbnails import generate_placeholder  # noqa: E402

PUBLICATION_DIR = Path(__file__).resolve().parent
SUIVI_CSV = PUBLICATION_DIR / "suivi.csv"
CATEGORY = {"name": "Éducation", "id": "27"}
TITLE_TEMPLATE = "{comptine} 👏 avec {perso} - Chansons pour bébé - Comptines Maternelles"
SUIVI_FIELDS = [
    "slug", "type", "titre", "statut",
    "publication_prevue_paris", "publication_prevue_utc", "vues_j7",
]


def load_brief(source: Path) -> dict:
    brief_path = source / "brief.json"
    if not brief_path.exists():
        raise SystemExit(f"brief.json introuvable dans {source}")
    return json.loads(brief_path.read_text(encoding="utf-8"))


def build_title(brief: dict) -> str:
    if brief.get("title"):
        return brief["title"]
    perso = " & ".join(brief.get("characters", ["Nino"]))
    return TITLE_TEMPLATE.format(comptine=brief.get("comptine", "Comptine"), perso=perso)


def build_description(brief: dict) -> str:
    lines = ["🎶 Une comptine du domaine public, réinventée avec Nino et ses amis !", ""]
    chapters = brief.get("chapters", [])
    if chapters:
        lines.append("⏱️ Chapitres :")
        lines.extend(f"{ch['time']} {ch['label']}" for ch in chapters)
        lines.append("")
    if brief.get("pedagogie"):
        lines.append(f"🧸 Dans cet épisode, on apprend : {', '.join(brief['pedagogie'])}.")
        lines.append("")
    if brief.get("playlist"):
        lines.append(f"📺 Retrouve tous les épisodes dans la playlist : {brief['playlist']}")
    lines.append("👉 Abonne-toi pour ne rater aucune nouvelle comptine !")
    if brief.get("synthetic_content_declared"):
        lines.append("")
        lines.append(
            "ℹ️ Vidéo réalisée avec des outils d'animation assistée par IA, "
            "sous supervision créative humaine."
        )
    lines.append("")
    lines.append("#comptines #chansonspourbebe #comptinesmaternelles")
    return "\n".join(lines)


def find_video(source: Path) -> Path:
    for name in ("video_final.mp4", "video.mp4"):
        candidate = source / name
        if candidate.exists():
            return candidate
    matches = sorted(source.glob("*.mp4"))
    if matches:
        return matches[0]
    raise SystemExit(f"Aucun fichier .mp4 trouvé dans {source}")


def build_thumbnail_hook(brief: dict) -> str:
    """Texte très court (1-3 mots, règle étape 5) pour le placeholder — jamais le titre complet."""
    if brief.get("thumbnail_text"):
        return brief["thumbnail_text"]
    words = brief.get("comptine", "Comptine").split("(")[0].split()
    return " ".join(words[:3])


def build_thumbnails(source: Path, out_dir: Path, hook_text: str) -> list[str]:
    src_thumbs = source / "thumbnails"
    names = []
    for variant in ("A", "B", "C"):
        dest = out_dir / f"thumb_{variant}.png"
        candidate = src_thumbs / f"{variant}.png"
        if candidate.exists():
            shutil.copyfile(candidate, dest)
        else:
            generate_placeholder(variant, hook_text, dest)
        names.append(dest.name)
    return names


def build_checklist(brief: dict, title: str) -> str:
    synth_box = "x" if brief.get("synthetic_content_declared") else " "
    return f"""# Checklist de publication — {title}

- [x] Conçue pour les enfants = OUI (obligatoire, non modifiable)
- [{synth_box}] Déclaration de contenu synthétique ajoutée (si applicable)
- [ ] Son vérifié (pas de saturation, paroles compréhensibles)
- [ ] Personnages visuellement cohérents avec les fiches de référence
- [ ] Aucun élément de marque tierce (personnage, logo, chanson) détecté
- [ ] Chapitres corrects et synchronisés avec la vidéo finale
- [ ] 3 miniatures testées (A/B/C) et lisibles en petit format
- [ ] Titre conforme au format de packaging

STATUT: EN_ATTENTE_DE_VALIDATION
VALIDATION: (tape OK ici une fois vérifié, puis passe STATUT à VALIDE)
"""


def append_suivi(row: dict) -> None:
    is_new = not SUIVI_CSV.exists()
    with SUIVI_CSV.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=SUIVI_FIELDS)
        if is_new:
            writer.writeheader()
        writer.writerow(row)


def generate_kit(source: Path, force: bool = False) -> Path:
    brief = load_brief(source)
    slug = brief.get("slug", source.name)
    out_dir = PUBLICATION_DIR / slug
    if out_dir.exists() and not force:
        raise SystemExit(f"{out_dir} existe déjà (relance avec --force pour régénérer)")
    out_dir.mkdir(parents=True, exist_ok=True)

    shutil.copyfile(find_video(source), out_dir / "video.mp4")

    title = build_title(brief)
    thumbnails = build_thumbnails(source, out_dir, build_thumbnail_hook(brief))

    content_type = brief.get("type", "episode")
    publish_dt = next_slot(content_type, SUIVI_CSV)
    publish_utc = publish_dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")

    metadata = {
        "title": title,
        "description": build_description(brief),
        "tags": brief.get("tags", []),
        "category": CATEGORY,
        "playlist": brief.get("playlist"),
        "privacyStatus": "private",
        "madeForKids": True,
        "publishAt_utc": publish_utc,
        "publishAt_paris": publish_dt.isoformat(),
        "thumbnails": thumbnails,
    }
    (out_dir / "metadata.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out_dir / "checklist.md").write_text(build_checklist(brief, title), encoding="utf-8")

    append_suivi({
        "slug": slug,
        "type": content_type,
        "titre": title,
        "statut": "EN_ATTENTE_DE_VALIDATION",
        "publication_prevue_paris": publish_dt.isoformat(),
        "publication_prevue_utc": publish_utc,
        "vues_j7": "",
    })

    return out_dir


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("source", type=Path, help="Dossier source (contient brief.json + video_final.mp4)")
    parser.add_argument("--force", action="store_true", help="Régénère le kit même s'il existe déjà")
    args = parser.parse_args()

    out_dir = generate_kit(args.source, force=args.force)
    print(f"✅ Kit généré : {out_dir}")
    for item in sorted(out_dir.iterdir()):
        print(f"   - {item.name}")


if __name__ == "__main__":
    main()
