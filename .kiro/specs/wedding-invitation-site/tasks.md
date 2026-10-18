# Tasks — Wedding Invitation Site

## Phase 1 — Project Scaffold & Toolchain

- [x] 1.1 Init Vite + React 18 + TypeScript project
- [x] 1.2 Configure TypeScript (strict, ES2020, bundler moduleResolution)
- [x] 1.3 Install and configure ESLint (v8 + typescript-eslint + react + jsx-a11y + prettier)
- [x] 1.4 Install and configure Prettier (v3)
- [x] 1.5 Install Vitest + React Testing Library; add placeholder test and setup file
- [x] 1.6 Create folder structure (components, hooks, lib, styles, content, tests, public/images, public/audio, assets/ornaments)
- [x] 1.7 Add .env.example and ensure .gitignore covers .env
- [x] 1.8 Set npm scripts (dev, build, preview, lint, format, test, test:watch, coverage, checkall)
- [x] 1.9 Replace Vite boilerplate with minimal App.tsx and main.tsx stubs
- [x] 1.10 Verify: lint + test + build all exit 0

## Phase 2 — Design Tokens & Global Styles

- [ ] 2.1 Create `src/styles/tokens.css` — all CSS custom properties (colours, spacing, radii, font families)
- [ ] 2.2 Create `src/styles/base.css` — reset, body/html defaults, box-sizing, scroll-behaviour
- [ ] 2.3 Create `src/styles/typography.css` — @font-face via @fontsource, fluid type scale with clamp()
- [ ] 2.4 Create `src/styles/textures.css` — paper grain SVG overlay, vignette keyframes
- [ ] 2.5 Import all style sheets in `main.tsx`
- [ ] 2.6 Add prefers-reduced-motion global rule
- [ ] 2.7 Verify: build passes, no flash of unstyled content on dev server

## Phase 3 — Content File & Hooks

- [ ] 3.1 Create `src/content/wedding.ts` with dummy data (couple, events, venues, all bilingual strings)
- [ ] 3.2 Implement `useLang` hook — manages lang state, exposes `t()` and `toggle()`; sets `document.documentElement.lang`
- [ ] 3.3 Implement `useCountdown` hook — interval-based, returns TimeLeft object
- [ ] 3.4 Implement `useReveal` hook — IntersectionObserver, adds `.revealed` CSS class
- [ ] 3.5 Write unit tests for `useLang`, `useCountdown`, `useReveal`
- [ ] 3.6 Verify: `npm run checkall` passes

## Phase 4 — TopBar Components

- [ ] 4.1 Build `LangToggle` component — button, aria-label, calls `toggle()` from useLang
- [ ] 4.2 Build `MusicToggle` component — button, refs audio element, muted by default
- [ ] 4.3 Build sticky TopBar wrapper in `App.tsx` with both toggles
- [ ] 4.4 Write tests for LangToggle and MusicToggle
- [ ] 4.5 Verify: `npm run checkall` passes

## Phase 5 — Hero & Blessing Sections

- [ ] 5.1 Create `OrnamentDivider` component — lotus/kalash SVG, aria-hidden
- [ ] 5.2 Build `Hero` component — jharokha arch, couple names, date, invocation; shimmer animation; mandala
- [x] 5.2a Build HeroRunners component (inline SVG groom + bride, CSS module, run-once, exit, reduced-motion hidden)
- [x] 5.2b Test HeroRunners (renders aria-hidden, absent under reduced motion)
- [x] 5.2c Verify: npm run checkall passes; manual check at 360 px and 1280 px
- [ ] 5.3 Build `Blessing` component — invocation text, family blessing panel
- [ ] 5.4 Add reveal animation to Hero and Blessing via `useReveal`
- [ ] 5.5 Write tests for Hero (renders names, date, invocation) and Blessing
- [ ] 5.6 Verify: `npm run checkall` passes

## Phase 6 — Couple, Countdown & Events Sections

- [ ] 6.1 Build `Couple` component — bride and groom cards with photo (lazy WebP), name, family, bio
- [ ] 6.2 Build `Countdown` component — uses useCountdown, aria-live, expired state
- [ ] 6.3 Build `Events` component — event cards with name, date (Intl.DateTimeFormat), time, venue ref, dress code
- [ ] 6.4 Apply reveal animations to all three components
- [ ] 6.5 Write tests for Couple, Countdown (expired/active), Events
- [ ] 6.6 Verify: `npm run checkall` passes

## Phase 7 — Venue, RSVP & Gallery Sections

- [ ] 7.1 Build `Venue` component — venue cards with name, address, Google Maps link
- [ ] 7.2 Implement `src/lib/firebase.ts` — lazy Firebase init behind env flag
- [ ] 7.3 Implement `src/lib/rsvp.ts` — form validation + Firestore addDoc
- [ ] 7.4 Build `Rsvp` component — conditional on VITE_ENABLE_RSVP_FIRESTORE; form with name, attendance, meal, message; success/error states
- [ ] 7.5 Build `Gallery` component — CSS grid, lazy-loaded WebP images, lightbox on tap
- [ ] 7.6 Write tests for Venue, Rsvp (flag off renders null, flag on renders form), Gallery
- [ ] 7.7 Verify: `npm run checkall` passes

## Phase 8 — Footer & Assembly

- [ ] 8.1 Build `Footer` component — closing message, family names, copyright
- [ ] 8.2 Assemble all sections in `App.tsx` in correct order with OrnamentDividers
- [-] 8.3 Wire `useLang` context/prop through App to all components
- [ ] 8.4 Final accessibility audit — one h1, heading order, alt text, focus rings, tap targets
- [ ] 8.5 Verify: `npm run checkall` passes; manual check on mobile viewport

## Phase 9 — Firebase Hosting & Deployment Config

- [ ] 9.1 Create `firebase.json` — hosting config, SPA rewrite rule, cache headers for assets
- [ ] 9.2 Create `.firebaserc` — project alias (dummy project id)
- [ ] 9.3 Create `firestore.rules` — allow write to rsvp collection, deny reads
- [ ] 9.4 Create `public/manifest.webmanifest` — PWA manifest with name, icons, theme colour
- [ ] 9.5 Verify: `npm run build` produces clean `dist/`; `firebase deploy --only hosting` (dry run)

## Phase 10 — Performance & Final Polish

- [ ] 10.1 Audit image sizes — all under 200 KB, WebP/AVIF
- [ ] 10.2 Add `<meta>` tags — og:title, og:image, og:description, twitter:card
- [ ] 10.3 Verify Lighthouse mobile score ≥90 performance, 100 accessibility
- [ ] 10.4 Cross-browser check — Chrome, Safari, Firefox on mobile viewport
- [ ] 10.5 Final `npm run checkall` — clean pass
- [ ] 10.6 Tag release `v1.0.0`
