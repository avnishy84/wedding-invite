# Design — Wedding Invitation Site

## Architecture Overview

Single-page application (SPA). No routing — all sections are stacked vertically and scroll-navigated.

```
main.tsx
└── App.tsx
    ├── TopBar (LangToggle + MusicToggle)
    ├── Hero
    │   └── HeroRunners
    ├── Blessing
    ├── Couple
    ├── OrnamentDivider
    ├── Countdown
    ├── Events
    ├── OrnamentDivider
    ├── Venue
    ├── Rsvp (conditional on VITE_ENABLE_RSVP_FIRESTORE)
    ├── Gallery
    └── Footer
```

## Data Flow

```
src/content/wedding.ts  ──►  useLang hook  ──►  all components
                                 ▲
                           LangToggle (toggles en/hi)
```

All copy is typed as `{ en: string; hi: string }`. The `useLang` hook returns a `t()` function that selects the active language string.

## Component Contracts

### `useLang` hook
```ts
type Lang = 'en' | 'hi';
interface UseLang {
  lang: Lang;
  t: (s: { en: string; hi: string }) => string;
  toggle: () => void;
}
```

### `useCountdown` hook
```ts
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}
// Returns live countdown to a target Date
function useCountdown(target: Date): TimeLeft
```

### `useReveal` hook
```ts
// Returns a ref to attach to a container; adds 'revealed' class when in viewport
function useReveal<T extends HTMLElement>(): React.RefObject<T>
```

### Content shape (`src/content/wedding.ts`)
```ts
interface BiString { en: string; hi: string }

interface Person {
  name: BiString;
  parents: BiString;
  photo?: string;  // path under public/images/
}

interface WeddingEvent {
  id: string;
  name: BiString;
  date: Date;
  venue: string;   // venue id ref
  dressCode?: BiString;
}

interface Venue {
  id: string;
  name: BiString;
  address: BiString;
  mapsUrl: string;
}
```

## Style Architecture

```
src/styles/
  tokens.css      — CSS custom properties (colours, spacing, font sizes)
  base.css        — reset, body, html defaults
  typography.css  — @font-face declarations, h1–h6, body, .devanagari
  textures.css    — paper grain overlay, vignette keyframes
```

Each component owns `ComponentName.module.css`. Global tokens are imported in `base.css` via `@import`.

## State Management

No global state library. State lives as close to the consumer as possible:
- Language: `useState` inside `useLang`, lifted to `App.tsx` via context or prop-drilling (two levels max).
- Music: `useState` in `MusicToggle`, refs to `<audio>` element.
- Countdown: `useState` + `setInterval` inside `useCountdown`.
- RSVP form: local `useState` in `Rsvp` component.

## Firebase Integration

```
src/lib/firebase.ts   — lazy init, exports `db` (Firestore)
src/lib/rsvp.ts       — addDoc wrapper with validation, only imported when flag is true
```

The RSVP section checks `import.meta.env.VITE_ENABLE_RSVP_FIRESTORE` at render time. When `false`, the form is not rendered and Firebase is never initialised.

## Accessibility Design Decisions

- `<html lang>` attribute controlled by `useLang` via `document.documentElement.lang`.
- All decorative SVG ornaments use `aria-hidden="true"`.
- Interactive elements (toggles, RSVP form, venue links) have visible focus styles via `tokens.css --gold`.
- Countdown announces updates via `aria-live="polite"` on the timer container.

## Animation Strategy

All animations use CSS only (no JS animation libraries in Phase 1–3):
- `.shimmer` — background-clip gradient on `.hero-names`, plays once on load.
- `.mandala` — `transform: rotate()` in a 120 s `animation` loop.
- `.reveal` — `opacity` + `translateY` transition triggered by `useReveal` adding `.revealed` class.
- Toran sway — `@keyframes sway` with `transform: rotate(-2deg) / rotate(2deg)`, 4 s ease-in-out infinite.
- **HeroRunners** — inline SVG characters (groom + bride); run cycle (leg/arm swing, body bob, dupatta flow) via CSS `@keyframes`; horizontal travel via a `transform: translateX` keyframe with `animation-delay` for the bride; animate only `transform` and `opacity`; no JS animation library. Sits below the arch in z-order, uses `pointer-events: none`, and sizes with `clamp()`/`vw` so it works from 360 px up. The component has no copy of its own, so FR-12 is unaffected.
- All wrapped in `@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }`. When `prefers-reduced-motion: reduce` is set, HeroRunners SHALL NOT render.