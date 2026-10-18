# Ankita & Avnish Wedding Invitation

A single-page, mobile-first Indian wedding invitation website with vintage ethnic design.

## Tech Stack

- **Build:** Vite + React 18 + TypeScript (strict)
- **Styling:** CSS Modules + CSS Variables (design tokens)
- **Backend:** Firebase Hosting + Firestore (RSVP)
- **Fonts:** Self-hosted via @fontsource
- **i18n:** Custom bilingual support (EN/HI)

## Setup

### Prerequisites
- Node 20+
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Required variables:
- `VITE_ENABLE_RSVP_FIRESTORE=true` (set to `false` to use WhatsApp fallback)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Development

```bash
npm run dev
```

Open http://localhost:5173

### Mobile Testing

```bash
npm run dev -- --host
```

Access from mobile using your local IP (e.g., http://192.168.x.x:5173)

## Editing Content

All wedding data (names, dates, events, venues) and bilingual strings live in:

```
src/content/wedding.ts
```

Edit this file to update:
- Couple names and family details
- Wedding date and timezone
- Event list (Haldi, Mehndi, Sangeet, etc.)
- Venue information
- All UI text (English + Hindi)

**Note:** Hindi strings marked with `// TODO: native review` should be verified by a Hindi speaker.

## Testing

```bash
npm run test          # Run tests once
npm run test:watch    # Watch mode
npm run coverage      # Coverage report
```

## Build

```bash
npm run build
```

Build output: `dist/`

## Quality Checks

```bash
npm run checkall      # lint + test + build
```

Must pass before deploying.

## Deployment

### Initial Setup

1. **Enable Firestore in Firebase Console:**
   - Go to https://console.firebase.google.com/project/ankitaavnishwedding/firestore
   - Click "Create database" and choose a region
   - Start in production mode

2. **Deploy Firestore Rules:**

```bash
firebase deploy --only firestore:rules
```

3. **Deploy Hosting:**

```bash
npm run build
firebase deploy --only hosting
```

### Preview Channel (Testing)

```bash
npm run build
firebase hosting:channel:deploy preview --expires 7d
```

### Production Deploy

```bash
npm run checkall
npm run build
firebase deploy --only hosting,firestore:rules
```

## GitHub CI/CD Setup

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys on push to `main`/`master`.

### Required GitHub Secrets

Add these in your GitHub repo → Settings → Secrets and variables → Actions:

1. **Firebase Service Account:**
   ```bash
   # Generate a service account key
   firebase init hosting:github
   # OR manually at: https://console.firebase.google.com/project/ankitaavnishwedding/settings/serviceaccounts/adminsdk
   ```
   
   Add as secret: `FIREBASE_SERVICE_ACCOUNT`

2. **Environment Variables** (same as `.env`):
   - `VITE_ENABLE_RSVP_FIRESTORE`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

Once configured, every push to `main` will:
1. Run linter
2. Run tests
3. Build the app
4. Deploy to Firebase Hosting

## RSVP Management

RSVPs are stored in Firestore collection `rsvps`.

### View RSVPs

1. Firebase Console → Firestore Database
2. Navigate to `rsvps` collection
3. Each document has: name, guests, events, attending, message, createdAt

### Export RSVPs to CSV

```bash
# Install firestore-export-import
npm install -g firestore-export-import

# Export
firestore-export --accountCredentials serviceAccountKey.json --backupFile rsvps-backup.json --nodePath rsvps

# Convert JSON to CSV (use online tool or script)
```

OR use the Firebase Console UI to manually export.

## Project Structure

```
wedding-invite/
├─ .github/workflows/      # CI/CD
├─ public/
│  ├─ images/              # Gallery photos (WebP, max 200 KB each)
│  ├─ audio/               # Optional background music
│  ├─ favicon.svg
│  ├─ og-image.jpg         # 1200×630 social preview
│  └─ manifest.webmanifest
├─ src/
│  ├─ assets/ornaments/    # SVG decorations
│  ├─ components/          # All UI components
│  ├─ content/wedding.ts   # ALL DATA + STRINGS (single source of truth)
│  ├─ hooks/               # useLang, useCountdown, useReveal
│  ├─ lib/                 # Firebase, RSVP, ICS generation
│  ├─ styles/              # Global CSS (tokens, base, typography, textures)
│  ├─ tests/               # Unit tests
│  ├─ App.tsx
│  └─ main.tsx
├─ firebase.json
├─ firestore.rules
└─ .env
```

## Performance Targets

- Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95
- Initial JS bundle: < 150 KB gzip
- LCP: < 2.5s on 4G

## Custom Domain (Optional)

1. Firebase Console → Hosting → Add custom domain
2. Follow DNS setup instructions
3. Update OG tags in `index.html`:
   - `<meta property="og:url">`
   - `<link rel="canonical">`
   - `manifest.webmanifest` → `start_url`

## Music

Place background music at `public/audio/wedding-music.mp3` (< 1 MB recommended).

The music toggle never autoplays — requires user gesture to start.

## License

Private project for personal use.
