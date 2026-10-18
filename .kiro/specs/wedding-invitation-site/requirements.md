# Requirements — Wedding Invitation Site

## Functional Requirements

### FR-01 Hero Section
- WHEN the page loads, THEN a full-viewport hero section SHALL display the couple's names, wedding date, and an invocation ("|| Shree Ganeshay Namah ||").
- WHEN the hero loads, THEN names SHALL animate with a gold shimmer effect (CSS gradient clip, once on load).
- WHEN the user views the hero, THEN a jharokha/cusped arch frame SHALL contain the names, with a slowly rotating mandala behind (CSS, 120 s loop).
- WHEN the hero loads, THEN an illustrated groom (sherwani, safa, juttis) SHALL run left to right along a ground line at the bottom of the hero, followed ~1.5 s later by an illustrated bride (lehenga, flowing dupatta).
- WHEN the run completes (~6 s), THEN both characters SHALL exit off-screen and not play again.
- WHEN prefers-reduced-motion: reduce is set, THEN the runners SHALL NOT render (names, date and invocation stay visible).
- WHEN the runners render, THEN they SHALL NOT overlap the names, date, invocation or arch frame, and SHALL NOT cause horizontal scroll.

### FR-02 Blessing Section
- WHEN the user scrolls to the Blessing section, THEN a traditional invocation and blessing text SHALL be displayed in a full-width panel.

### FR-03 Couple Section
- WHEN the user scrolls to the Couple section, THEN details of both bride and groom (name, family, brief bio) SHALL be displayed.
- WHEN images are present, THEN they SHALL be WebP/AVIF, lazy-loaded, with explicit width/height.

### FR-04 Events Section
- WHEN the user views the Events section, THEN all wedding events (Mehendi, Sangeet, Wedding, Reception) SHALL be displayed as cards with name, date, time (12-hour IST), and dress code.
- WHEN the screen is ≥768 px wide, THEN events SHALL display in a grid (max 1080 px wide).

### FR-05 Venue Section
- WHEN the user taps a venue card, THEN a Google Maps link SHALL open for that venue.
- WHEN the user views the Venue section, THEN name, address, and map link SHALL be shown for each event venue.

### FR-06 Countdown
- WHEN the page is loaded before the wedding date, THEN a live countdown (days, hours, minutes, seconds) SHALL be displayed.
- WHEN the wedding date has passed, THEN the countdown SHALL display a celebratory message instead.

### FR-07 RSVP Section
- WHEN `VITE_ENABLE_RSVP_FIRESTORE=true`, THEN a RSVP form SHALL be shown with name, attendance (yes/no), meal preference, and message fields.
- WHEN `VITE_ENABLE_RSVP_FIRESTORE=false`, THEN the RSVP section SHALL be hidden or replaced with a contact method.
- WHEN the user submits the RSVP form, THEN the system SHALL validate all required fields before submitting.
- WHEN submission succeeds, THEN a confirmation message SHALL be displayed.
- WHEN submission fails, THEN an error message SHALL be displayed and the form SHALL remain editable.

### FR-08 Gallery Section
- WHEN the user scrolls to the Gallery section, THEN a grid of optimised images SHALL be displayed.
- WHEN an image is tapped, THEN a lightbox or full-screen view SHALL open.

### FR-09 Footer
- WHEN the user reaches the footer, THEN it SHALL display a closing message, family names, and a copyright notice.

### FR-10 Language Toggle
- WHEN the user taps the language toggle, THEN all user-facing text SHALL switch between English and Hindi.
- WHEN Hindi is active, THEN the `lang` attribute on `<html>` SHALL be set to `"hi"`.
- WHEN English is active, THEN the `lang` attribute SHALL be `"en"`.

### FR-11 Music Toggle
- WHEN the page loads, THEN background music SHALL be muted by default.
- WHEN the user taps the music toggle, THEN background audio SHALL play or pause accordingly.
- WHEN audio is unavailable (no file), THEN the music toggle SHALL be hidden.

### FR-12 Bilingual Content
- WHEN any user-facing string is rendered, THEN it SHALL come from `src/content/wedding.ts` (no hard-coded copy in components).
- WHEN the active language is Hindi, THEN Devanagari font SHALL be applied to Hindi text.

## Non-Functional Requirements

### NFR-01 Performance
- WHEN the page is loaded on a mobile 4G connection, THEN Largest Contentful Paint SHALL be under 3 s.
- WHEN images are loaded, THEN each SHALL be ≤200 KB, WebP or AVIF format.

### NFR-02 Accessibility
- WHEN the page is rendered, THEN there SHALL be exactly one `<h1>` and heading order SHALL be intact.
- WHEN interactive elements are focused, THEN focus rings SHALL be visible (gold colour).
- WHEN tap targets are rendered, THEN they SHALL be at least 44×44 px.
- WHEN the page is rendered, THEN colour SHALL never be the only visual signal.
- WHEN `prefers-reduced-motion: reduce` is set, THEN all animations SHALL be disabled.
- WHEN hero runners are rendered, THEN they SHALL be `aria-hidden="true"` and decorative only.

### NFR-03 Responsiveness
- WHEN the viewport is <768 px, THEN the layout SHALL be single-column.
- WHEN the viewport is ≥768 px, THEN event/gallery grids MAY use multiple columns up to max-width.

### NFR-04 Internationalisation
- WHEN the page loads, THEN English SHALL be the default language.
- WHEN Hindi is active, THEN machine-translated strings SHALL be flagged `// TODO: native review` in the content file.

### NFR-05 Privacy
- WHEN the page is served, THEN no third-party tracking cookies or ad scripts SHALL be loaded.

### NFR-06 Build Quality
- WHEN `npm run checkall` is run, THEN lint, test, and build SHALL all exit with code 0.
- WHEN TypeScript compiles, THEN strict mode SHALL be enabled with zero `any` types.
