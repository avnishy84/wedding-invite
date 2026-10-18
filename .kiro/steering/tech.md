---
inclusion: always
---

# Tech Stack
- Build: Vite + React 18 + TypeScript (strict)
- Styling: plain CSS Modules plus global CSS variables (design tokens). No Tailwind, no UI kit.
- Animation: CSS animations/transitions first; Framer Motion only if clearly needed
  (scroll reveals). Respect prefers-reduced-motion.
- i18n: lightweight custom hook (`useLang`) with `en` and `hi` dictionaries. No heavy i18n libs.
- Backend: Firebase only: Hosting (required), Firestore for RSVPs (optional, flag-controlled).
- Fonts: self-hosted via @fontsource (no runtime Google Fonts calls).
- Images: WebP or AVIF, `loading="lazy"`, explicit width/height, max 200 KB each.
- Package manager: npm. Node 20+.
- Lint/format: ESLint + Prettier. Tests: Vitest + React Testing Library for logic/components.

Rules:
- Keep dependencies minimal. Justify any new dependency in the task summary.
- No `any`. No inline styles except dynamic values. No dead code.
- Config via `import.meta.env` (VITE_*). Never commit secrets (Firebase web config is public by design,
  but keep it in `.env` and `.env.example`).
