"""Calcule le prochain créneau de publication conseillé (heure de Paris -> UTC)."""
from __future__ import annotations

import csv
from datetime import date, datetime, time, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

PARIS = ZoneInfo("Europe/Paris")
UTC = timezone.utc

# Rythme cible (étape 6) : 3 épisodes/semaine + 1 compilation/semaine.
# (jour_semaine, heure) — 0 = lundi ... 6 = dimanche.
SLOTS: dict[str, list[tuple[int, time]]] = {
    "episode": [(0, time(16, 0)), (2, time(16, 0)), (4, time(16, 0))],  # lun/mer/ven 16h
    "compilation": [(5, time(9, 0))],  # samedi 9h
    "short": [(0, time(18, 0)), (1, time(18, 0)), (2, time(18, 0)), (3, time(18, 0)), (4, time(18, 0))],
}


def _already_scheduled(suivi_path: Path, content_type: str) -> set[datetime]:
    used: set[datetime] = set()
    if not suivi_path.exists():
        return used
    with suivi_path.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row.get("type") != content_type:
                continue
            raw = row.get("publication_prevue_utc")
            if not raw:
                continue
            try:
                used.add(datetime.fromisoformat(raw.replace("Z", "+00:00")).astimezone(PARIS))
            except ValueError:
                continue
    return used


def _iter_slots(start: datetime, weekly_slots: list[tuple[int, time]]):
    day0 = start.date()
    offset = 0
    while True:
        d: date = day0 + timedelta(days=offset)
        for slot_weekday, at in weekly_slots:
            if slot_weekday == d.weekday():
                candidate = datetime.combine(d, at, tzinfo=PARIS)
                if candidate > start:
                    yield candidate
        offset += 1


def next_slot(content_type: str, suivi_path: Path, now: datetime | None = None) -> datetime:
    """Retourne le prochain créneau libre (Europe/Paris) pour ce type de contenu."""
    now = now or datetime.now(PARIS)
    weekly_slots = SLOTS.get(content_type, SLOTS["episode"])
    used = _already_scheduled(suivi_path, content_type)
    for candidate in _iter_slots(now, weekly_slots):
        if candidate not in used:
            return candidate
    raise RuntimeError("Aucun créneau trouvé")  # ne devrait jamais arriver
