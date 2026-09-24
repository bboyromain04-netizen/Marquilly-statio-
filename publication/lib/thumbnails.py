"""Génère une miniature 1280x720 de secours quand aucune miniature Canva n'est fournie.

Sert de filet de sécurité pour que le kit de publication soit toujours complet ;
en production, dépose tes vraies miniatures dans <episode>/thumbnails/A.png, B.png, C.png
pour qu'elles soient reprises telles quelles à la place de ce placeholder.
"""
from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SIZE = (1280, 720)

# Charte de marque (3 couleurs saturées validées à l'étape 1)
JAUNE_SOLEIL = (255, 201, 60)
VERT_MENTHE = (78, 205, 196)
ROSE_CORAIL = (255, 111, 145)

VARIANTS = {
    "A": {"bg": JAUNE_SOLEIL, "accent": ROSE_CORAIL},
    "B": {"bg": VERT_MENTHE, "accent": JAUNE_SOLEIL},
    "C": {"bg": ROSE_CORAIL, "accent": VERT_MENTHE},
}

_FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def _font(size: int) -> ImageFont.FreeTypeFont:
    for candidate in _FONT_CANDIDATES:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def generate_placeholder(variant: str, hook_text: str, out_path: Path) -> None:
    """hook_text : 1 à 3 mots max (règle étape 5) — jamais le titre YouTube complet."""
    cfg = VARIANTS.get(variant, VARIANTS["A"])
    img = Image.new("RGB", SIZE, cfg["bg"])
    draw = ImageDraw.Draw(img)

    # Halo de couleur à droite : emplacement réservé au personnage (rendu OpenArt) en prod.
    draw.ellipse([SIZE[0] - 560, -100, SIZE[0] + 140, 600], fill=cfg["accent"])

    title_font = _font(140)
    lines = textwrap.wrap(hook_text, width=16)[:2]
    y = 260
    for line in lines:
        draw.text((56, y), line, font=title_font, fill=(35, 30, 30),
                   stroke_width=6, stroke_fill=(255, 255, 255))
        y += 170

    tag_font = _font(32)
    draw.text((56, SIZE[1] - 64), f"PLACEHOLDER {variant} — a remplacer via Canva",
              font=tag_font, fill=(50, 45, 45))

    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "PNG")
