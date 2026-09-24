# Module de publication YouTube

Phases 1 et 2 du pipeline de publication (voir plus bas pour les phases 3-4 :
boucle de performance, commande de validation humaine).

## Phase 1 — kit de publication

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

## Phase 2 — uploader API

**Prérequis avant toute utilisation réelle : audit de conformité YouTube validé.**
Le script existe et fonctionne dès maintenant en `--dry-run` (aucune requête envoyée),
mais l'upload réel nécessite tes propres identifiants OAuth (voir ci-dessous).

### Mise en place (une seule fois)

1. Dans [Google Cloud Console](https://console.cloud.google.com/) : crée un projet, active
   **YouTube Data API v3**, configure l'écran de consentement OAuth, puis crée un
   **ID client OAuth** de type "Application de bureau" et télécharge le JSON.
2. Place ce fichier (ex. dans `publication/secrets/client_secret.json` — dossier gitignoré,
   ne sera jamais commité).
3. `cp .env.example .env` puis renseigne `YOUTUBE_CLIENT_SECRETS_FILE`.
4. `pip install -r publication/requirements.txt`

### Utilisation

```bash
python3 publication/upload.py --dry-run        # simule, zéro requête réelle
python3 publication/upload.py                  # traite la file (max 5 uploads/jour)
python3 publication/upload.py --slug <slug>    # force un seul kit précis
```

La première exécution réelle ouvre un navigateur pour l'autorisation OAuth (une fois),
le jeton est ensuite réutilisé et rafraîchi automatiquement.

**Ce que fait le script, pour chaque kit validé (voir Phase 4 ci-dessous) :**
- upload résumable (`videos.insert`) avec `snippet` + `status`
- `selfDeclaredMadeForKids: true` sur **toutes** les vidéos, sans exception, non paramétrable
- `privacyStatus: "private"` + `publishAt` (repris tel quel du `publishAt_utc` généré en phase 1)
- miniature via `thumbnails.set` (la 1ʳᵉ de la liste, `thumb_A.png` par défaut) — les variantes
  B/C restent en local : l'API Data v3 n'expose pas le test A/B de miniatures, à activer à la
  main dans YouTube Studio
- ajout à la playlist cible via `playlistItems.insert` (résolution/création automatique de
  l'ID, mis en cache dans `publication/playlists.json`)
- file d'attente à quota : max **5 uploads/jour** (`publication/upload_state.json`, réinitialisé
  chaque jour à l'heure de Paris) ; une erreur `quotaExceeded`/`dailyLimitExceeded` interrompt
  proprement la boucle, la file restante repart automatiquement au lancement suivant
- journal dans `publication/upload_log.csv` (slug, id vidéo YouTube, date d'upload, statut)

### Sécurité des identifiants

- `client_secret.json` et `token.json` vivent dans `publication/secrets/`, gitignoré.
- `.env` (chemins vers ces fichiers) est gitignoré ; seul `.env.example` est versionné.
- Aucun secret n'est jamais écrit dans le code.

## Ce qui n'est PAS encore construit ici

- **Phase 3 — boucle de performance** (YouTube Analytics API, mise à jour de `suivi.csv`,
  top/flop 3 épisodes) : prochaine étape.
- **Phase 4 — validation humaine** (commande listant les kits `EN_ATTENTE_DE_VALIDATION`) :
  déjà appliquée par `upload.py` (aucun upload sans `VALIDATION: OK` dans `checklist.md`),
  mais la commande de listing dédiée reste à construire.
