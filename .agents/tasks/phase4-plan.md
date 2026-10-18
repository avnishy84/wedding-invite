# Phase 4 Implementation Plan — Core Components

## Context

Existing infrastructure:
- Design tokens in `src/styles/tokens.css` (colours, spacing, fonts)
- Base styles in `src/styles/base.css` (reveal animations, box-sizing)
- Typography in `src/styles/typography.css`
- Textures in `src/styles/textures.css`
- `useLang()` hook with `LangProvider` wrapping `App` in `main.tsx`
- `useReveal()` hook for scroll-triggered fade-up animations
- `OrnamentDivider` component with lotus SVG (supports lotus/kalash/paisley variants)
- `weddingData` content file with dummy bilingual data
- Types in `src/content/types.ts`: `BilingualString`, `WeddingEvent`, `WeddingData`

All CSS modules should import no global styles (those are already imported in main.tsx). Every section component receives `weddingData` either via import or via useLang's `t()` for strings table lookups.

---

## Implementation Order

- [ ] **1. Create useCountdown hook**
      Files: `src/hooks/useCountdown.ts`
      - Signature: `useCountdown(isoDate: string, tz: string) => { days, hours, minutes, seconds, isPast }`
      - Uses `setInterval(1000)`, clears on unmount with `useEffect` return cleanup
      - No external date libraries — native `Date` only
      - Manual UTC offset for Asia/Kolkata: +330 minutes (UTC+5:30)
      - Calculate diff in milliseconds between target date and current IST time
      - Return `isPast: true` when target date < now
      Verify: `npm run test` — useCountdown tests (see step 2 for test file)

- [ ] **2. Write tests for useCountdown**
      Files: `src/tests/hooks/useCountdown.test.ts`
      - Test 1: future date returns correct breakdown (days, hours, minutes, seconds)
      - Test 2: past date returns `isPast: true`
      - Test 3: date exactly now returns zero values or isPast boundary
      - Use Vitest, render hook via `renderHook` from `@testing-library/react`
      - Mock `Date.now()` with `vi.useFakeTimers()` for deterministic tests
      Verify: `npm run test src/tests/hooks/useCountdown.test.ts` — all pass

- [ ] **3. Create ics.ts library for iCalendar generation**
      Files: `src/lib/ics.ts`
      - `generateIcs(event: WeddingEvent, lang: 'en' | 'hi'): string` — returns valid iCalendar string
      - Format: `BEGIN:VCALENDAR`, `VERSION:2.0`, `PRODID:-//Wedding Invitation//EN`
      - `BEGIN:VEVENT`, `DTSTART;TZID=Asia/Kolkata:YYYYMMDDTHHmmss` (no dashes, no colons in datetime)
      - `SUMMARY:<event.name[lang]>`, `LOCATION:<event.venue[lang]>`, `DESCRIPTION:Dress Code: <event.dressCode[lang]>`
      - `END:VEVENT`, `END:VCALENDAR`
      - Each line max 75 chars (iCalendar spec); wrap long lines with CRLF + space
      - `downloadIcs(event: WeddingEvent, lang: 'en' | 'hi', filename: string): void` — creates Blob, triggers anchor download
      Verify: `npm run test` (see step 4 for test file)

- [ ] **4. Write tests for ics.ts**
      Files: `src/tests/lib/ics.test.ts`
      - Test 1: `generateIcs` returns string containing `BEGIN:VCALENDAR` and `END:VCALENDAR`
      - Test 2: DTSTART includes `TZID=Asia/Kolkata` and correct format `YYYYMMDDTHHmmss`
      - Test 3: SUMMARY, LOCATION, DESCRIPTION contain expected event data
      - Test 4: `downloadIcs` creates a Blob and calls `document.createElement('a')` with `download` attribute (mock `createElement` and `click`)
      Verify: `npm run test src/tests/lib/ics.test.ts` — all pass

- [ ] **5. Generate placeholder WebP images for Gallery**
      Files: `public/images/placeholder-1.webp` through `placeholder-6.webp`
      - Create a Node.js script `scripts/generate-placeholders.mjs` that uses `sharp` to generate 6 WebP images (400x600px) with solid background colours (e.g., maroon, gold, peacock, saffron, parchment, ivory)
      - Each image ~5-10 KB
      - Run script: `node scripts/generate-placeholders.mjs`
      Verify: Check `public/images/` contains 6 WebP files; `npm run build` succeeds and images are in `dist/images/`

- [ ] **6. Create Hero component**
      Files: `src/components/Hero/Hero.tsx`, `src/components/Hero/Hero.module.css`
      - CSS grid: all layers on same cell via `grid-template-areas` or `display: grid; > * { grid-area: 1 / 1 }`
      - Layers (bottom to top): ivory background with texture, mandala SVG (rotate 120s infinite, opacity 0.12), arch.svg frame (gold stroke), content layer
      - Content: invocation (`weddingData.meta.invocation[lang]`), bride name (script font `var(--font-script)`), `t('weds')`, groom name, wedding date formatted via `Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeZone: 'Asia/Kolkata' })`
      - Name shimmer: `@keyframes shimmer` with `background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)`, `background-size: 200% 100%`, `background-clip: text`, `-webkit-background-clip: text`, `-webkit-text-fill-color: transparent`, `animation: shimmer 2s ease-in-out 1`
      - Optional: toran.svg at top with `@keyframes sway` 4s ease-in-out infinite alternate
      - All animations wrapped in `@media (prefers-reduced-motion: no-preference)` — under `reduce` they are `animation: none`
      - Full viewport height: `min-height: 100svh` (or 100vh with fallback)
      - Scroll cue at bottom: down arrow or text `t('scrollCue')`
      Verify: `npm run dev` — Hero renders full screen with all layers, names shimmer once, mandala rotates

- [ ] **7. Create Blessing component**
      Files: `src/components/Blessing/Blessing.tsx`, `src/components/Blessing/Blessing.module.css`
      - Ivory panel, centred text, max-width 720px
      - Large invocation (same as Hero or slightly smaller), then body blessing quote from `weddingData.couple.coupleNote[lang]`
      - `<OrnamentDivider variant="lotus" />` below text
      - All copy bilingual via `useLang` `t()` or `weddingData` direct access
      Verify: `npm run dev` — Blessing renders below Hero, invocation and blessing text visible, lotus divider below

- [ ] **8. Create Couple component**
      Files: `src/components/Couple/Couple.tsx`, `src/components/Couple/Couple.module.css`
      - Maroon panel: `background: var(--maroon)`, ivory text `color: var(--ivory)`
      - Two blocks side-by-side on desktop (flexbox or grid 2-col >=768px), stacked on mobile
      - Block 1: Bride's name (`weddingData.couple.brideName[lang]`), parents (`brideParents[lang]`)
      - Block 2: Groom's name (`groomName[lang]`), parents (`groomParents[lang]`)
      - `<OrnamentDivider variant="paisley" />` between blocks (or below first block on mobile)
      - Couple note below both blocks: `weddingData.couple.coupleNote[lang]`
      Verify: `npm run dev` — Couple panel shows maroon background, ivory text, two family blocks, paisley divider

- [ ] **9. Create Countdown component**
      Files: `src/components/Countdown/Countdown.tsx`, `src/components/Countdown/Countdown.module.css`
      - Calls `useCountdown(weddingData.weddingDateIso, weddingData.timezone)`
      - Four boxes displaying Days, Hours, Minutes, Seconds — each box has large number (clamp 2rem-4rem) and label below
      - Labels: `t('days')`, `t('hours')`, `t('minutes')`, `t('seconds')`
      - If `isPast === true`, show `t('celebrationMessage')` instead
      - Boxes use parchment background, gold border, centred text
      - Grid layout: 2x2 on mobile, 4x1 on desktop
      Verify: `npm run dev` — Countdown shows four boxes with numbers ticking down each second

- [ ] **10. Create Events component**
      Files: `src/components/Events/Events.tsx`, `src/components/Events/Events.module.css`
      - Ivory panel, max-width 1080px
      - Grid: 1-col mobile, 2-col >=768px
      - Each event card: parchment background (`var(--parchment)`), double gold border (outer + inner via `box-shadow` or nested div), mandala watermark at opacity 0.08 positioned absolute behind content
      - Card content: event name (`event.name[lang]`), date (formatted via `Intl.DateTimeFormat` with `{ dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' }`), venue name (`event.venue[lang]`), dress-code badge (`event.dressCode[lang]`)
      - "Add to Calendar" button: calls `downloadIcs(event, lang, event.id + '.ics')` from `ics.ts`
      - Import `weddingData.events`, map over array
      Verify: `npm run dev` — Events grid shows all events, clicking "Add to Calendar" downloads .ics file

- [ ] **11. Create Venue component**
      Files: `src/components/Venue/Venue.tsx`, `src/components/Venue/Venue.module.css`
      - Peacock panel: `background: var(--peacock)`, ivory text `color: var(--ivory)`
      - Venue name (`weddingData.venue.name[lang]`), address (`address[lang]`), travel notes (`travelNotes[lang]`)
      - "Open in Google Maps" button: `<a href={weddingData.venue.mapsUrl} target="_blank" rel="noopener noreferrer">{t('openMaps')}</a>`
      - All copy bilingual
      Verify: `npm run dev` — Venue panel shows peacock background, ivory text, Maps button opens link in new tab

- [ ] **12. Create Lightbox component**
      Files: `src/components/Lightbox/Lightbox.tsx`, `src/components/Lightbox/Lightbox.module.css`
      - Fixed overlay (position fixed, inset 0, z-index var(--z-lightbox), background rgba(0,0,0,0.9))
      - Image centred: flexbox or grid, max-width 90vw, max-height 90vh
      - Prev/Next arrows on sides (buttons with svg icons or unicode arrows)
      - Close button top-right (button with X icon)
      - Keyboard nav: `useEffect` with `keydown` listener — ArrowLeft (prev), ArrowRight (next), Escape (close)
      - Focus trap: when opened, focus first button, prevent Tab outside lightbox
      - `role="dialog"`, `aria-modal="true"`, `aria-label="Image lightbox"`
      - Props: `images: string[]`, `currentIndex: number`, `onClose: () => void`, `onPrev: () => void`, `onNext: () => void`
      Verify: Manual test in browser — keyboard nav works, focus trapped, Escape closes

- [ ] **13. Create Gallery component**
      Files: `src/components/Gallery/Gallery.tsx`, `src/components/Gallery/Gallery.module.css`
      - CSS grid: 2-col mobile, 3-col >=768px, max-width 1080px, gap var(--space-6)
      - Each cell: `<figure><img src="/images/placeholder-N.webp" loading="lazy" width="400" height="600" alt="Wedding memory N" /><figcaption class="visually-hidden">...</figcaption></figure>`
      - On click, open Lightbox with current image index
      - Lightbox component lazy-loaded: `const Lightbox = React.lazy(() => import('./Lightbox/Lightbox'))`, wrap in `<Suspense fallback={<div>Loading...</div>}>`
      - State: `const [lightboxOpen, setLightboxOpen] = useState(false)`, `const [currentIndex, setCurrentIndex] = useState(0)`
      Verify: `npm run dev` — Gallery grid shows 6 placeholder images, clicking one opens lightbox

- [ ] **14. Create Footer component**
      Files: `src/components/Footer/Footer.tsx`, `src/components/Footer/Footer.module.css`
      - Maroon panel: `background: var(--maroon)`, ivory text `color: var(--ivory)`
      - Contact section: `t('contactUs')` heading, two WhatsApp links from `weddingData.contact.phone1`, `phone2` — format as `<a href="https://wa.me/910000000001" target="_blank" rel="noopener noreferrer">WhatsApp</a>`
      - Script accent sign-off: `"With love, {weddingData.couple.brideName[lang]} & {weddingData.couple.groomName[lang]}"` in `var(--font-script)`
      - Copyright line: `© 2027` (or current year via `new Date().getFullYear()`)
      Verify: `npm run dev` — Footer shows maroon background, ivory text, WhatsApp links, sign-off

- [ ] **15. Create TopBar component with LangToggle and MusicToggle placeholder**
      Files: `src/components/TopBar/TopBar.tsx`, `src/components/TopBar/TopBar.module.css`
      - Sticky bar: `position: sticky`, `top: 0`, `z-index: var(--z-topbar)`, semi-transparent ivory background
      - Contains `<LangToggle />` (already exists) and `<MusicToggle />` (placeholder button that does nothing yet — will be implemented in Phase 5)
      - MusicToggle: button with speaker icon (SVG or unicode 🔊), aria-label "Toggle music"
      - Flexbox: space-between, padding var(--space-4)
      Verify: `npm run dev` — TopBar sticks at top, shows LangToggle and placeholder MusicToggle button

- [ ] **16. Assemble App.tsx with all sections**
      Files: `src/App.tsx`
      - Import all components: Hero, Blessing, Couple, Countdown, Events, Venue, Gallery, Footer, TopBar, OrnamentDivider
      - Import `useReveal` hook
      - Render order:
        1. `<TopBar />`
        2. `<Hero />`
        3. `<section ref={useReveal()} data-reveal><Blessing /></section>`
        4. `<section ref={useReveal()} data-reveal><Couple /></section>`
        5. `<section ref={useReveal()} data-reveal><Countdown /></section>`
        6. `<OrnamentDivider variant="lotus" />`
        7. `<section ref={useReveal()} data-reveal><Events /></section>`
        8. `<OrnamentDivider variant="paisley" />`
        9. `<section ref={useReveal()} data-reveal><Venue /></section>`
        10. `<OrnamentDivider variant="lotus" />`
        11. `<section data-reveal>RSVP stub — "Coming Soon" message</section>` (RSVP Phase 6)
        12. `<section ref={useReveal()} data-reveal><Gallery /></section>`
        13. `<Footer />`
      - Each section wrapped in `<section>` with `ref={useReveal()}` and `data-reveal` attribute, except TopBar and Footer
      Verify: `npm run dev` — full page renders, scroll triggers reveal animations section by section

- [ ] **17. Verify full build and tests**
      - Run `npm run test` — all new tests pass (useCountdown, ics.ts)
      - Run `npm run lint` — zero errors, zero warnings
      - Run `npm run build` — exits 0, `dist/` folder contains all assets
      - Manual check: open `dist/index.html` in browser (via `npx serve dist`) — site loads, all sections visible, animations work
      Verify: All three commands pass; built site works in browser

---

## Tricky Integration Points

1. **useCountdown timezone handling**: Asia/Kolkata is UTC+5:30, not a whole-hour offset — manual calculation required: `const istOffset = 330 * 60 * 1000; const now = new Date().getTime() + istOffset;` This is error-prone; test thoroughly with fake timers.

2. **iCalendar DTSTART format**: Must be `YYYYMMDDTHHmmss` with no separators, e.g., `20270214T190000` — easy to get wrong. Ensure parsing from ISO string removes dashes and colons correctly. Test file verifies this.

3. **Hero CSS grid layer stacking**: All four layers (background, mandala, arch, content) on same grid cell requires `grid-template-areas` with repeated name or `grid-area: 1 / 1` on all children. Z-index may be needed if SVGs overlap unexpectedly.

4. **Lightbox keyboard nav and focus trap**: Must add/remove event listener on mount/unmount AND when lightbox opens/closes. Focus trap requires `useEffect` to `querySelector` all focusable elements and prevent Tab outside dialog — consider `focus-trap` library if manual impl is too complex, but prefer native since project avoids heavy deps.

5. **Gallery lazy loading Lightbox**: React.lazy requires default export in Lightbox.tsx — ensure `export default function Lightbox(...)` not named export. Suspense fallback must be outside Lightbox component.

6. **useReveal ref callback pattern**: Each section needs its own `useReveal()` call — do NOT reuse same ref across multiple elements. Pattern: `const reveal1 = useReveal(); const reveal2 = useReveal();` OR call `useReveal()` inline: `<section ref={useReveal()}>`.

7. **Animation reduced-motion**: Every `@keyframes` animation MUST be wrapped in `@media (prefers-reduced-motion: no-preference) { ... }` with a fallback `@media (prefers-reduced-motion: reduce) { animation: none; }` to respect user preference. Easy to forget on shimmer, mandala rotate, sway.

8. **Intl.DateTimeFormat locale and timezone**: Hero wedding date uses `{ dateStyle: 'full', timeZone: 'Asia/Kolkata' }` — no `timeStyle` since we only show date. Events cards use `{ dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' }` to show both. Locale defaults to browser's, but pass `'en-IN'` explicitly for consistency.

9. **WhatsApp link format**: Must be `https://wa.me/910000000001` (no spaces, no dashes, country code without +). The `weddingData.contact.phone1` already has `+91` prefix — strip it in href: `href={`https://wa.me/${phone.replace(/\D/g, '')}`}`.

10. **Placeholder image script**: `sharp` package must be installed as devDependency first: `npm install --save-dev sharp`. Script in `scripts/generate-placeholders.mjs` (ESM) so `import sharp from 'sharp'` works. Run with Node 18+.

---

## Dependencies to Install (if missing)

- `sharp` (devDependency) for placeholder image generation: `npm install --save-dev sharp`

Check `package.json` first — if `sharp` already exists, skip. All other deps (React, Vite, TypeScript, Vitest, Testing Library) should already be installed from Phase 1-3.

---

## Files Created (Total: ~30 files)

### Hooks (2)
- `src/hooks/useCountdown.ts`
- `src/tests/hooks/useCountdown.test.ts`

### Libraries (2)
- `src/lib/ics.ts`
- `src/tests/lib/ics.test.ts`

### Components (18)
- `src/components/Hero/Hero.tsx`
- `src/components/Hero/Hero.module.css`
- `src/components/Blessing/Blessing.tsx`
- `src/components/Blessing/Blessing.module.css`
- `src/components/Couple/Couple.tsx`
- `src/components/Couple/Couple.module.css`
- `src/components/Countdown/Countdown.tsx`
- `src/components/Countdown/Countdown.module.css`
- `src/components/Events/Events.tsx`
- `src/components/Events/Events.module.css`
- `src/components/Venue/Venue.tsx`
- `src/components/Venue/Venue.module.css`
- `src/components/Lightbox/Lightbox.tsx`
- `src/components/Lightbox/Lightbox.module.css`
- `src/components/Gallery/Gallery.tsx`
- `src/components/Gallery/Gallery.module.css`
- `src/components/Footer/Footer.tsx`
- `src/components/Footer/Footer.module.css`
- `src/components/TopBar/TopBar.tsx`
- `src/components/TopBar/TopBar.module.css`

### Scripts & Images (7)
- `scripts/generate-placeholders.mjs`
- `public/images/placeholder-1.webp` through `placeholder-6.webp` (6 images)

### Modified (1)
- `src/App.tsx` (currently stub, will be fully assembled)

---

## Post-Phase 4 State

After this phase:
- All core sections visible and functional (Hero, Blessing, Couple, Countdown, Events, Venue, Gallery, Footer)
- TopBar with LangToggle and MusicToggle placeholder
- Scroll-reveal animations on all sections
- Countdown ticks down to wedding date
- Events cards have working "Add to Calendar" button
- Gallery opens lightbox on image click
- Full bilingual support (EN/HI toggle works across all sections)
- Site builds without errors
- All tests pass

**Not yet implemented (future phases):**
- RSVP form (Phase 6)
- MusicToggle functionality (Phase 5)
- Firebase integration (Phase 7)
- Actual couple photos (Phase 8 content population)
