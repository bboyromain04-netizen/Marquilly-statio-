# Module de publication YouTube

Phase 1 du pipeline de publication (voir la conversation projet pour les phases 2-4 :
uploader API, boucle de performance, validation humaine).

## Utilisation

```bash
pip install -r publication/requirements.txt
python3 publication/generate_kit.py episodes/<slug>/
python3 publication/generate_kit.py compilations/<slug>/
```

Chaque appel produit `publication/<slug>/` avec :

- `video.mp4` — copie du rendu final
- `thumb_A.png`, `thumb_B.png`, `thumb_C.png` — 1280x720, tes vraies miniatures Canva si
  déposées dans `<source>/thumbnails/{A,B,C}.png`, sinon un placeholder généré automatiquement
  (couleurs de la charte, texte court, mention "à remplacer via Canva")
- `metadata.json` — titre, description avec chapitres horodatés, tags, playlist, catégorie
  Éducation (id YouTube `27`), `madeForKids: true`, `privacyStatus: "private"`, et un créneau
  de publication conseillé (`publishAt_paris` / `publishAt_utc`)
- `checklist.md` — "Conçue pour les enfants = OUI" (fixe), déclaration de contenu synthétique,
  et les vérifications qualité à cocher manuellement avant validation

et ajoute une ligne dans `publication/suivi.csv` (statut `EN_ATTENTE_DE_VALIDATION`).

## Créneaux de publication

Rythme cible (étape 6) : 3 épisodes/semaine (lun/mer/ven 16h Paris) + 1 compilation/semaine
(sam 9h Paris). `lib/scheduling.py` propose automatiquement le prochain créneau libre en lisant
`suivi.csv`, converti en UTC pour l'API YouTube (`publishAt`).

## Ce qui n'est PAS encore construit ici

- **Phase 2 — uploader API** (`videos.insert`, OAuth 2.0, `selfDeclaredMadeForKids`,
  programmation, gestion de quota, `--dry-run`) : à construire une fois l'audit de conformité
  validé.
- **Phase 3 — boucle de performance** (YouTube Analytics API, mise à jour de `suivi.csv`,
  top/flop 3 épisodes) : à construire ensuite.
- **Phase 4 — validation humaine** (commande listant les kits `EN_ATTENTE_DE_VALIDATION`) :
  aucune vidéo ne doit être uploadée sans passage de `checklist.md` en statut `VALIDE`.
