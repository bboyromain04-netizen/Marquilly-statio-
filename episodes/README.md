# Convention des dossiers `episodes/` et `compilations/`

Chaque épisode ou compilation terminé vit dans son propre dossier :

```
episodes/<slug>/
  brief.json          # obligatoire — métadonnées source (voir schéma ci-dessous)
  video_final.mp4      # obligatoire — rendu final (ou tout autre .mp4 trouvé dans le dossier)
  thumbnails/           # optionnel
    A.png B.png C.png   # 1280x720 — si absentes, publication/generate_kit.py génère un placeholder
```

`compilations/<slug>/` suit exactement la même convention, avec `"type": "compilation"` dans le brief.

## Schéma de `brief.json`

| Champ | Obligatoire | Description |
|---|---|---|
| `slug` | non (déduit du nom du dossier sinon) | identifiant unique, utilisé comme nom de dossier dans `publication/` |
| `type` | non (`"episode"` par défaut) | `"episode"` ou `"compilation"` — détermine le créneau de publication |
| `title` | non | titre YouTube final ; sinon généré depuis `comptine` + `characters` au format de l'étape 5 |
| `comptine` | oui | nom de la comptine du domaine public (ou titre de la chanson originale) utilisée |
| `thumbnail_text` | non | texte très court (1-3 mots) pour les miniatures placeholder ; sinon dérivé de `comptine` |
| `characters` | non | liste des personnages présents (`["Nino"]`, etc.) |
| `chapters` | non | liste de `{"time": "MM:SS", "label": "..."}` pour les chapitres horodatés |
| `tags` | non | tags YouTube |
| `playlist` | non | playlist cible |
| `pedagogie` | non | notions pédagogiques abordées (chiffres, couleurs, routines...) |
| `synthetic_content_declared` | non | `true` si le contenu doit porter la mention de contenu synthétique |

Voir `episodes/pluie-pluie-va-ten-01/` pour un exemple complet.
