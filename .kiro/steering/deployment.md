---
inclusion: fileMatch: ["firebase.json", ".firebaserc", "firestore.rules", "*.md"]
---

# Deployment

## Platform
Firebase Hosting (single-page app, rewrite all to index.html).

## Build output
`dist/` produced by `npm run build` (`tsc -b && vite build`).

## Firebase config files
- `firebase.json` — hosting config, rewrite rule, cache headers
- `.firebaserc` — project alias
- `firestore.rules` — Firestore security rules (if RSVP enabled)

## Environment
- All runtime config via `import.meta.env` (VITE_* variables).
- `.env` is git-ignored; `.env.example` is committed as a template.
- `VITE_ENABLE_RSVP_FIRESTORE=false` disables Firestore writes when not needed.

## Deploy command
```
firebase deploy --only hosting
```

## CI/CD (optional)
GitHub Actions: `npm ci && npm run checkall && npm run build && firebase deploy --token $FIREBASE_TOKEN`
