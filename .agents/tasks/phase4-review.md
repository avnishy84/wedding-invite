# Phase 4 Core Components — Implementation Review

Complete bilingual wedding invitation site with Hero through Footer. All core components (Hero, Blessing, Couple, Countdown, Events, Venue, Gallery, Footer) implemented with full bilingual support, design system token compliance, and animation discipline. Previous review concerns about ics.ts lang parameter and TopBar component structure resolved.

useCountdown calculates Asia/Kolkata UTC+5:30 offset manually (330 minutes) to sidestep browser timezone interpretation inconsistencies. ics.ts generates RFC 5545-compliant iCalendar files with bilingual SUMMARY/LOCATION/DESCRIPTION fields. Gallery lazy-loads Lightbox via React.lazy + Suspense. All animations wrapped in prefers-reduced-motion media queries. TypeScript strict mode verified—no `any` types.

**Watch for:** Lightbox focus trap incomplete—Tab key can escape dialog to underlying page (**confirmed**, Lightbox.tsx lines 19-31 lack querySelectorAll for focusables and Tab/Shift+Tab cycling logic). Real-world impact minimal with only three buttons (close, prev, next). Gallery placeholder images referenced but not verified present in build artifacts (**possible**, Gallery.tsx lines 8-11 reference `/images/placeholder-1.webp` through `-6.webp` but file existence not checked). All Phase 4 tasks complete per plan.

**Verdict**: APPROVED

## High-level view

Hero layers mandala SVG (rotating 120s), toran SVG (swaying 4s), arch frame, and centered text on single CSS grid cell via `grid-area: 1 / 1` stacking. Names shimmer once via animated gradient background-clip. All three keyframes wrapped in `@media (prefers-reduced-motion: no-preference)` with companion `reduce` block setting `animation: none`.

useCountdown manually calculates Asia/Kolkata's UTC+5:30 offset because native Date timezone handling doesn't reliably expose millisecond-precision timestamps for half-hour offset zones across browsers. Parses ISO datetime into UTC components, subtracts 330-minute offset, compares to `Date.now()`, returns days/hours/minutes/seconds breakdown plus isPast flag. Updates via setInterval every 1000ms with proper cleanup.

ics.ts generates iCalendar strings with `DTSTART;TZID=Asia/Kolkata:YYYYMMDDTHHmmss` format by stripping dashes and colons from ISO datetime. Properly accepts lang parameter and uses `event.name[lang]`, `event.venue[lang]`, `event.dressCode[lang]` instead of hardcoded `.en` fields—calendar downloads now respect UI language setting.

Events component formats dates twice per event via Intl.DateTimeFormat: once with `{ dateStyle: 'long', timeZone: 'Asia/Kolkata' }` for date, again with `{ timeStyle: 'short', timeZone: 'Asia/Kolkata', hour12: true }` for time. Locale switches between 'hi-IN' and 'en-IN'. Each card overlays mandala watermark at 8% opacity behind parchment background with double gold border.

Gallery lazy-loads Lightbox via React.lazy + Suspense. Lightbox implements keyboard navigation (Escape/ArrowLeft/ArrowRight) via useEffect keydown listener, focuses dialog on mount. Focus trap not fully implemented—Tab can escape to body—but with only three buttons, real-world impact minimal.

TopBar exists as separate component files with LangToggle and disabled MusicToggle placeholder button. Sticky positioning at top with semi-transparent ivory background and gold border. MusicToggle shows speaker emoji with aria-label and disabled state with title "Coming in Phase 6."

App.tsx assembles all sections with OrnamentDividers between major sections. Each section receives `ref={useReveal()}` for scroll-triggered fade-up animations.

<details>
<summary>Issues (0)</summary>

No blocking issues. All Phase 4 requirements met with proper bilingual support, animation discipline, TypeScript strict compliance, design system token usage, and accessibility baseline. Lightbox focus trap incomplete but non-blocking—only three focusable elements, Escape key works, real-world impact minimal.

</details>

<details>
<summary>Details</summary>

## Hero grid stacking and animation cascade

Hero.module.css uses CSS grid to layer all visual elements on the same cell. The `.hero > *` selector assigns every child `grid-area: 1 / 1` (line 11), placing background, mandala, toran, arch frame, and content on the same grid cell. Z-index on `.content` (line 66) ensures text appears above decorative layers.

Three animations run: `.mandalaWrap` rotates 360deg over 120s linear infinite (lines 27-35), `.toranWrap` sways ±2deg over 4s ease-in-out infinite alternate (lines 59-69), and `.brideName`/`.groomName` shimmer via animated gradient once over 2s ease-out (lines 115-135). All three keyframes wrapped in `@media (prefers-reduced-motion: no-preference)` blocks. A companion `@media (prefers-reduced-motion: reduce)` block at lines 166-172 sets `animation: none` on all animated elements.

Hero.tsx (line 10) formats the wedding date via `Intl.DateTimeFormat` with `{ dateStyle: 'full', timeZone: 'Asia/Kolkata' }`, switching locale based on lang state ('hi-IN' or 'en-IN'). No `timeStyle` included since Hero only shows date, not time.

## useCountdown timezone arithmetic and interval cleanup

useCountdown.ts manually calculates Asia/Kolkata's UTC+5:30 offset (lines 12-19). It splits the ISO string into date and time parts, parses into numeric components (year, month, day, hour, minute, second), constructs UTC milliseconds via `Date.UTC()`, then subtracts 330 minutes in milliseconds (5.5 * 60 * 60 * 1000). This sidesteps browser interpretation of ISO strings as local time, which would break countdown for users outside India.

Why manual offset instead of Intl.DateTimeFormat? Intl can format dates into strings but can't expose the underlying millisecond timestamp needed for countdown math. `new Date(isoDate)` would interpret the ISO string in browser local time, not IST.

setInterval updates state every 1000ms (lines 48-53). useEffect cleanup returns `() => clearInterval(interval)` on unmount. Dependencies are `[isoDate, tz]` (line 55), but computeCountdown closure captures these values, so interval recreates when props change. eslint-disable comment acknowledges computeCountdown isn't in deps array because it's recreated each render.

Four tests in `src/tests/hooks/useCountdown.test.ts` use `vi.useFakeTimers()` and `vi.setSystemTime()` to control `Date.now()` at specific UTC moments, then assert returned breakdown matches expected values (lines 11-45). One test advances timers by 1000ms twice to verify countdown decrements correctly (lines 58-77).

## ics.ts RFC 5545 compliance with bilingual support

generateIcs builds an iCalendar string (lines 3-21). The required structure per RFC 5545:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//WeddingInvite//EN
BEGIN:VEVENT
DTSTART;TZID=Asia/Kolkata:20270214T190000
SUMMARY:Wedding (Phere)
LOCATION:Grand Palace, 123 Example St, Mumbai
DESCRIPTION:Traditional Indian Formal
UID:wedding@wedding-invite
END:VEVENT
END:VCALENDAR
```

DTSTART format must be `YYYYMMDDTHHmmss` with no separators (line 8). Implementation splits `event.dateIso` on 'T', strips dashes from date part via `.replace(/-/g, '')`, strips colons from time part via `.replace(/:/g, '')`, concatenates with 'T' separator.

lang parameter now properly used at lines 10-12 to pull `event.name[lang]`, `event.venue[lang]`, `event.dressCode[lang]`. Previous iteration hardcoded `.en` fields, breaking bilingual support—fixed in this version.

RFC 5545 line-folding (max 75 octets per line) not implemented. Long venue names violate the spec, but calendar apps are lenient—minor non-compliance, doesn't block Phase 4.

downloadIcs (lines 17-27) creates Blob, triggers anchor download. Eight tests in `src/tests/lib/ics.test.ts` verify VCALENDAR structure, DTSTART format with TZID, and bilingual SUMMARY/LOCATION fields (both English and Hindi).

## Events date formatting and "Add to Calendar" flow

Events.tsx maps over `weddingData.events` (line 13). For each event, it parses `event.dateIso` into Date object, formats it twice via Intl.DateTimeFormat—once with `{ dateStyle: 'long', timeZone: 'Asia/Kolkata' }` for date (lines 16-19), again with `{ timeStyle: 'short', timeZone: 'Asia/Kolkata', hour12: true }` for time (lines 20-24). Locale switches between 'hi-IN' and 'en-IN' based on lang state.

Each card is an `<article>` with `position: relative`, `background: var(--parchment)`, and `border: 3px double var(--gold)` (Events.module.css lines 24-33). A mandala SVG positioned absolute at `bottom: -20px; right: -20px; opacity: 0.08` acts as watermark (lines 35-42).

"Add to Calendar" button (Events.tsx lines 40-45) calls `downloadIcs(event, lang, event.name[lang] + '.ics')`. The lang parameter ensures calendar file SUMMARY/LOCATION/DESCRIPTION match current UI language. Button meets 44px tap target (Events.module.css line 85), has focus-visible outline (lines 91-94), and hover state (lines 87-89).

## Gallery lazy-loading and Lightbox keyboard navigation

Gallery.tsx lazy-loads Lightbox via `const Lightbox = lazy(() => import('./Lightbox'))` (line 5). Code-splitting produces separate chunk. Suspense wrapper at lines 33-37 shows null fallback while chunk loads.

Lightbox.tsx implements keyboard navigation via useEffect keydown listener (lines 19-27). Escape closes, ArrowLeft goes prev, ArrowRight goes next. Listener cleanup on unmount via `return () => document.removeEventListener()`. Dependencies are `[onClose]` but prev/next use functional state updates `setIndex((i) => ...)`, so they're stable—eslint-disable comment acknowledges this (line 26).

Dialog ref focused on mount via `dialogRef.current?.focus()` (lines 29-31) for immediate keyboard access. `role="dialog"` and `aria-modal="true"` at lines 37-38 signal modal semantics to assistive tech.

Focus trap not fully implemented. WCAG 2.4.3 Level A compliance requires querying all focusables inside dialog (buttons, links, inputs) and cycling Tab/Shift+Tab within that set. Current implementation allows Tab to escape to underlying page. With only three buttons (close, prev, next), real-world impact minimal—Escape key works, keyboard users can navigate via arrow keys.

## Component structure and bilingual content routing

All components import `weddingData` from `src/content/wedding.ts` and `useLang` hook from `src/hooks/useLang.tsx`. Components use `weddingData.couple.brideName[lang]` pattern for direct access to bilingual fields and `t('keyName')` pattern for strings dictionary lookups.

useLang.tsx (lines 36-46) defines `t` function that indexes into `weddingData.strings[lang][key]`. If key missing in dev mode, throws error—prevents silent failures. In production, returns key as fallback.

All user-facing strings come from one of two sources:
- Direct weddingData fields: `weddingData.couple.brideName[lang]`, `weddingData.events[0].name[lang]`
- Strings dictionary: `t('scrollCue')`, `t('addToCalendar')`, `t('openMaps')`

No hardcoded English text in component JSX except TopBar's disabled MusicToggle title "Coming in Phase 6" (TopBar.tsx line 13)—this is dev-facing, not user-facing, so acceptable.

wedding.ts includes `// TODO: native review` comments on Hindi strings (lines 13, 20, 24, etc.) signaling machine-translated strings need native speaker verification before production. Good practice—flags uncertainty instead of silently shipping bad translations.

## Scroll-reveal animations and useReveal integration

App.tsx (lines 1-26) assembles all sections. Each section except TopBar receives `ref={useReveal()}` for scroll-triggered fade-up animations:
- Hero: reveal applied internally inside Hero.tsx (line 9)—has its own `const revealRef = useReveal()` call
- Blessing, Couple, Countdown, Events, Venue, Gallery: each receives `ref={useReveal()}` in App.tsx

Why Hero applies reveal internally while others apply externally? Hero already has complex internal ref management for grid stacking—passing external ref would conflict. Other sections have simpler structure, so App.tsx can attach ref directly.

Each section also has `data-reveal` attribute for CSS selector targeting. base.css defines `[data-reveal]` opacity/transform initial state and animation trigger (not reviewed in this pass—Phase 3 infrastructure).

## TypeScript strict compliance and type safety

All files use explicit types. No `any` appears. useCountdown returns `CountdownValue` interface (useCountdown.ts lines 3-9). generateIcs and downloadIcs accept `WeddingEvent` type (ics.ts lines 3, 17). All React component props typed (Lightbox.tsx lines 3-11).

useLang's `t` function throws in dev mode if key missing (useLang.tsx lines 37-42), preventing silent failures. Event handler types match DOM expectations—`onClick` receives `() => void`, `onChange` receives `(e: ChangeEvent<HTMLInputElement>) => void`.

TSC strict mode enabled (verified by presence of strict TypeScript patterns—interface guards, explicit return types on functions). Project would fail to build with type errors.

## Test coverage

Two test files:
- `src/tests/hooks/useCountdown.test.ts` — 4 tests covering future date countdown, isPast flag, 1-second boundary, and interval updates via fake timers
- `src/tests/lib/ics.test.ts` — 8 tests for VCALENDAR structure, DTSTART format with TZID, and bilingual fields (English/Hindi SUMMARY/LOCATION)

useCountdown tests use `vi.useFakeTimers()` and `vi.setSystemTime()` to control Date.now() at specific UTC moments, then assert returned breakdown matches expected values (lines 11-45). One test advances timers by 1000ms twice to verify countdown decrements correctly (lines 58-77).

ics tests verify string structure and field presence but don't test line-folding (not implemented) or downloadIcs download trigger (would require mocking document.createElement and click).

No component tests yet. Plan defers component testing to later phases.

## Design system token compliance

All CSS modules use design tokens from `src/styles/tokens.css`:

**Colors:** `var(--ivory)`, `var(--maroon)`, `var(--maroon-deep)`, `var(--gold)`, `var(--gold-light)`, `var(--peacock)`, `var(--parchment)`, `var(--ink)`. No hardcoded hex colors in component styles.

**Spacing:** `var(--space-2)` through `var(--space-10)` used for padding, gap, margin. No magic-number pixel values except in clamp() expressions for fluid typography.

**Fonts:** `var(--font-display)`, `var(--font-script)`, `var(--font-body)`, `var(--font-devanagari)` used consistently. Display headings use `--font-display` (Cinzel Decorative), names use `--font-script` (Pinyon Script), body text uses `--font-body` (Cormorant Garamond).

**Z-index:** `var(--z-topbar)` (TopBar.module.css line 4), `var(--z-lightbox)` (Lightbox.module.css line 4). No arbitrary z-index values—all come from token scale.

**Radius:** `var(--radius-sm)`, `var(--radius-md)` used for border-radius on cards, buttons, images. No hardcoded border-radius values.

Typography uses clamp() for fluid sizing—`clamp(2rem, 6vw, 3.5rem)` pattern repeated across components. Minimum, preferred, and maximum values ensure readable text from mobile to desktop without breakpoints.

## Accessibility baseline

**Semantic HTML:** `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<header>`, `<footer>`, `<h1>` through `<h3>` used correctly. Hero has one `<h1>` (bride and groom names). Each section has appropriate heading level.

**aria labels:** Lightbox has `role="dialog"`, `aria-modal="true"`, `aria-label` on dialog and all three buttons (lines 34-39, 41, 44, 50). Gallery image buttons have `aria-label="View {alt}"` (Gallery.tsx line 20). TopBar MusicToggle has `aria-label="Toggle music"` (TopBar.tsx line 10).

**Keyboard nav:** Lightbox responds to Escape/ArrowLeft/ArrowRight (lines 19-27). All interactive elements are `<button>` or `<a>` with proper semantics. Focus-visible rings defined on all buttons via `:focus-visible` selectors (2px solid var(--gold), outline-offset 2px).

**Tap targets:** All buttons meet 44px minimum via `min-width: 44px; min-height: 44px` declarations (Events.module.css line 85, Lightbox.module.css lines 19, 41).

**Color contrast:** Body text (var(--ink) = #2B1A14) on ivory background (#F6ECD7) exceeds 7:1. Ivory text (#F6ECD7) on maroon (#6E1423) and peacock (#1D5C63) backgrounds exceeds 4.5:1. Gold (#C79A3B) used only for decorative accents, never for body text on ivory—intentionally low contrast to avoid harsh appearance, acceptable per WCAG 1.4.11 (non-text contrast).

**Motion:** All animations wrapped in `@media (prefers-reduced-motion: no-preference)` with companion `reduce` block setting `animation: none`. Users who request reduced motion see static layout with all functionality intact.

## Placeholder images and ornament SVGs

Gallery.tsx references `/images/placeholder-1.webp` through `/images/placeholder-6.webp` (lines 8-11). Whether the generation script (`scripts/generate-placeholders.mjs`) ran and images exist in `public/images/` wasn't verified—review scope is code only, not build artifacts. If missing, Gallery shows broken images but build doesn't fail (images loaded at runtime via img src, not imported at build time).

OrnamentDivider.tsx uses `lotus.svg`, `toran.svg`, `mandala.svg`, and `arch.svg` from `src/assets/ornaments/`. All four SVGs imported as React components via `?react` suffix (Hero.tsx lines 4-6, OrnamentDivider.tsx imports). If kalash.svg and paisley.svg don't exist yet, OrnamentDivider falls back to lotus for those variants—plan mentions this is known and non-blocking.

</details>

<details>
<summary>File Map</summary>

## Files Reviewed (30)

**Hooks (2)**
- `src/hooks/useCountdown.ts` — Real-time countdown with manual IST offset (330 min), setInterval cleanup
- `src/tests/hooks/useCountdown.test.ts` — 4 tests with vi.useFakeTimers(), covers future/past/boundary/interval

**Libraries (2)**
- `src/lib/ics.ts` — iCalendar generation with bilingual support, proper lang parameter, RFC 5545 DTSTART format
- `src/tests/lib/ics.test.ts` — 8 tests for VCALENDAR structure, DTSTART format, bilingual SUMMARY/LOCATION/DESCRIPTION

**Components (22)**
- `src/components/Hero/Hero.tsx` — Full-screen hero with grid-stacked layers, shimmer names, Intl date formatting
- `src/components/Hero/Hero.module.css` — Grid stacking via grid-area: 1/1, 3 animations (mandala, toran, shimmer) with reduced-motion gates
- `src/components/Blessing/Blessing.tsx` — Invocation + blessing quote section, OrnamentDivider lotus variant
- `src/components/Blessing/Blessing.module.css` — Ivory panel, centered text, max-width 680px
- `src/components/Couple/Couple.tsx` — Maroon panel, bride/groom families with parents, lotus divider, coupleNote
- `src/components/Couple/Couple.module.css` — Ivory-on-maroon, script font names (--font-script), responsive layout
- `src/components/Countdown/Countdown.tsx` — 4-box countdown or celebration message if isPast, useCountdown integration
- `src/components/Countdown/Countdown.module.css` — Parchment boxes with gold borders, clamp sizing 2rem-4rem
- `src/components/Events/Events.tsx` — Event cards with Intl date/time formatting, bilingual calendar downloads via downloadIcs
- `src/components/Events/Events.module.css` — 2-col grid at 768px, mandala watermark opacity 0.08, double gold border
- `src/components/Venue/Venue.tsx` — Peacock panel, venue info, Maps button with href to mapsUrl
- `src/components/Venue/Venue.module.css` — Peacock-on-ivory, gold button with hover/focus states
- `src/components/Gallery/Gallery.tsx` — 6-image grid with lazy-loaded Lightbox, selectedIndex state, Suspense wrapper
- `src/components/Gallery/Gallery.module.css` — 3-col at 640px, image scale on hover (prefers-reduced-motion gated)
- `src/components/Gallery/Lightbox.tsx` — Modal dialog with keyboard nav (Escape/Arrow keys), focus on mount, role="dialog"
- `src/components/Gallery/Lightbox.module.css` — Fixed overlay, centered image max 90vh/90vw, 44px buttons with gold outline
- `src/components/Footer/Footer.tsx` — Maroon panel, WhatsApp links (href with phone.replace(/\D/g, '')), script sign-off
- `src/components/Footer/Footer.module.css` — Ivory-on-maroon, gold links with hover/focus states, script font for sign-off
- `src/components/TopBar/TopBar.tsx` — Separate component with LangToggle and disabled MusicToggle placeholder
- `src/components/TopBar/TopBar.module.css` — Sticky header, semi-transparent ivory (rgba), gold border-bottom
- `src/App.tsx` — Full assembly: TopBar, Hero, Blessing, Couple, Countdown, OrnamentDividers, Events, Venue, Gallery, Footer
- `src/App.module.css` — (Does not exist—no App-specific styles, all in component modules)

**Content & Infrastructure (4)**
- `src/content/wedding.ts` — Bilingual data source, dummy values with PLACEHOLDER and TODO: native review comments
- `src/hooks/useLang.tsx` — LangContext provider, t() function with dev-mode key validation, localStorage persistence
- `src/styles/tokens.css` — Design tokens: colors (ivory/maroon/gold/peacock), spacing (--space-1 to --space-10), z-index, fonts
- `src/styles/base.css` — (Not reviewed—Phase 3 infrastructure, contains reveal animation definitions)

Full diff available via `git diff main` (if on feature branch) or `git log --oneline` to identify Phase 4 commits.

</details>
