---
inclusion: always
---

# Project Structure
wedding-invite/
├─ .kiro/ (steering, specs, hooks)
├─ public/
│  ├─ images/            # optimised WebP gallery and hero assets
│  ├─ audio/             # optional music loop
│  ├─ favicon.svg, og-image.jpg, manifest.webmanifest
├─ src/
│  ├─ assets/ornaments/  # SVG: paisley, mandala, border, arch, lotus, divider
│  ├─ components/        # Hero, Blessing, Couple, Countdown, Events, Venue, Rsvp, Gallery, Footer, LangToggle, MusicToggle, OrnamentDivider
│  ├─ content/wedding.ts # ALL couple/event data + EN/HI strings (single source of truth)
│  ├─ hooks/             # useLang, useCountdown, useReveal
│  ├─ lib/firebase.ts    # Firebase init (lazy)
│  ├─ lib/rsvp.ts        # RSVP submit + validation
│  ├─ styles/            # tokens.css, base.css, typography.css, textures.css
│  ├─ App.tsx, main.tsx
├─ firebase.json, .firebaserc, firestore.rules, .env.example
└─ PLAN.md

Conventions: one component per folder (`Hero/Hero.tsx`, `Hero.module.css`), named exports,
PascalCase components, camelCase hooks prefixed `use`.
