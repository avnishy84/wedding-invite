# Implementation Plan — Phase 6: Polish

## Exploration Findings

- **TopBar location**: Separate component at `src/components/TopBar/TopBar.tsx` with placeholder music button (disabled emoji).
- **Current TopBar imports**: Only `LangToggle`; music button is inline disabled placeholder.
- **TopBar styles**: `TopBar.module.css` has `.musicToggle` rules already present (disabled state with opacity 0.5).
- **Focus-visible**: LangToggle already has `:focus-visible` with gold outline. Base.css has NO global focus-visible rule for button/a/input/textarea/select.
- **Reduced-motion**: Hero.module.css has `@media (prefers-reduced-motion: reduce)` disabling mandala spin, toran sway, chevron bounce, and name shimmer. Base.css has reduced-motion rule for `[data-revealed]` transitions. No other components (Countdown, Gallery, etc.) currently check reduced-motion.
- **Gallery images**: All 6 have explicit `width={400} height={600}` attributes. Placeholder files are 56 bytes each (under 200 KB).
- **index.html meta**: Only has charset, favicon link (already present), viewport, and title "wedding-invite". Missing: OG tags, Twitter tags, canonical, theme-color, manifest link.
- **Public directory**: Contains `favicon.svg` (already present), `icons.svg`, `/images/` (6 placeholder WebP), `/audio/.gitkeep` (audio dir exists but empty). Missing: `manifest.webmanifest`, `robots.txt`, `icon-192.png`, `icon-512.png`, `og-image.jpg`.
- **wedding.ts strings**: Has `langToggleLabel`. Missing: `musicToggleLabel`.
- **Build commands**: `npm run lint`, `npm run test`, `npm run build`, `npm run checkall`.

---

## Implementation Plan

- [ ] 1. **Add `musicToggleLabel` string to `src/content/wedding.ts`**  
      Add `musicToggleLabel: 'Toggle background music'` under `strings.en`, and `musicToggleLabel: 'पृष्ठभूमि संगीत चालू/बंद करें' // TODO: native review` under `strings.hi`.  
      Files: `src/content/wedding.ts`  
      Verify: Grep for `musicToggleLabel` in wedding.ts confirms both EN and HI entries exist.

- [ ] 2. **Build `src/components/MusicToggle/MusicToggle.tsx` + `MusicToggle.module.css`**  
      Create component with state `isPlaying` (bool) and `isMuted` (bool, read from localStorage key `"wedding-music-muted"` on mount, default `true`). Button shows Unicode play `▶` when not playing, pause `⏸` when playing. On first click: create `<audio>` element (if not exists), set `src="/audio/wedding-music.mp3"`, `loop=true`, call `.play()` (wrapped in try/catch to handle missing file gracefully — no thrown error, log to console). Subsequent clicks toggle `.play()`/`.pause()`. On toggle, persist `isMuted` to localStorage. `aria-label={t('musicToggleLabel')}`. Styled with design tokens (gold/peacock border, min 44x44 tap target). Add comment `// Audio file at /public/audio/wedding-music.mp3 (add in production)` at top. Module.css follows LangToggle pattern: `.button` with min 44x44, peacock bg, gold border, focus-visible outline.  
      Files: `src/components/MusicToggle/MusicToggle.tsx`, `src/components/MusicToggle/MusicToggle.module.css`  
      Verify: Component renders without error (no audio file present). Button clickable, console logs error for missing file but does not throw.

- [ ] 3. **Wire MusicToggle into TopBar**  
      In `src/components/TopBar/TopBar.tsx`, replace the disabled placeholder music button with `<MusicToggle />`. Import MusicToggle. Remove the inline musicToggle button and its emoji. Keep LangToggle and MusicToggle side by side in the same gap layout.  
      Files: `src/components/TopBar/TopBar.tsx`  
      Verify: Run `npm run build` — exits 0. Dev server shows both toggles in TopBar.

- [ ] 4. **Add global focus-visible rule to `src/styles/base.css`**  
      Append rule at end of file:  
      ```css
      button:focus-visible,
      a:focus-visible,
      input:focus-visible,
      textarea:focus-visible,
      select:focus-visible {
        outline: 2px solid var(--gold);
        outline-offset: 2px;
      }
      ```  
      Files: `src/styles/base.css`  
      Verify: Keyboard-tab through page in dev server. All interactive elements (buttons, links in Footer, RSVP form inputs) show gold focus ring. No focus-order issues (TopBar → Hero scroll cue → Events add-to-calendar → Venue maps link → RSVP form fields → Gallery images → Footer links).

- [ ] 5. **Audit and fix prefers-reduced-motion usage** (AUDIT TASK)  
      Check each component with animations:  
      - Hero: already has `@media (prefers-reduced-motion: reduce)` disabling mandala spin, toran sway, shimmer, bounce — **OK**.  
      - Base.css `[data-revealed]`: already has `transition: none` under reduced-motion — **OK**.  
      - Countdown: Countdown.module.css has no animations currently — **OK** (no action needed).  
      - Gallery/Lightbox: No keyframe animations — **OK**.  
      - TopBar MusicToggle hover: no keyframe animation, only transition — **OK** (transitions are acceptable under reduced-motion).  
      All animations respect reduced-motion. No changes needed.  
      Files: (read-only audit — no file changes)  
      Verify: Set browser to `prefers-reduced-motion: reduce` (DevTools > Rendering), reload page. Confirm no mandala spin, no toran sway, no name shimmer, no chevron bounce, no scroll-reveal fades. Report audit results in plan completion summary.

- [ ] 6. **Add OG and Twitter meta tags to `index.html`**  
      In `<head>`, after existing meta tags and before `<title>`, insert:  
      ```html
      <!-- Open Graph -->
      <meta property="og:title" content="Ankita & Avnish Wedding" />
      <meta property="og:description" content="Join us for the wedding celebration of Ankita and Avnish" />
      <meta property="og:image" content="/og-image.jpg" />
      <meta property="og:url" content="https://example.com/" /> <!-- Replace with production domain -->
      <meta property="og:type" content="website" />
      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Ankita & Avnish Wedding" />
      <meta name="twitter:description" content="Join us for the wedding celebration of Ankita and Avnish" />
      <meta name="twitter:image" content="/og-image.jpg" />
      <!-- Canonical & Theme -->
      <link rel="canonical" href="https://example.com/" /> <!-- Replace with production domain -->
      <meta name="theme-color" content="#6E1423" />
      ```  
      Files: `index.html`  
      Verify: Open page in dev server, inspect `<head>` in DevTools. All meta tags present with correct content attributes.

- [ ] 7. **Update `<title>` in `index.html` to match OG title**  
      Change `<title>wedding-invite</title>` to `<title>Ankita & Avnish Wedding</title>`.  
      Files: `index.html`  
      Verify: Browser tab shows "Ankita & Avnish Wedding".

- [ ] 8. **Create `public/manifest.webmanifest`**  
      JSON content:  
      ```json
      {
        "name": "Ankita & Avnish Wedding",
        "short_name": "Wedding",
        "description": "Join us for the wedding celebration",
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#6E1423",
        "background_color": "#F6ECD7",
        "icons": [
          {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      }
      ```  
      Add `<link rel="manifest" href="/manifest.webmanifest">` to `index.html` `<head>` after favicon link.  
      Files: `public/manifest.webmanifest`, `index.html`  
      Verify: Dev server serves `/manifest.webmanifest` (check Network tab). JSON is valid.

- [ ] 9. **Create placeholder icon PNGs: `public/icon-192.png` and `public/icon-512.png`**  
      Solid maroon (#6E1423) squares with a simple gold (#C79A3B) "W" or mandala. For now, create minimal valid PNGs (can be simple solid color with text overlay or just solid maroon — production can replace later). If no image generation tool available, create 1x1 transparent PNGs as placeholders (valid but minimal).  
      Files: `public/icon-192.png`, `public/icon-512.png`  
      Verify: Files exist at paths. Manifest references them correctly.

- [ ] 10. **Verify `public/favicon.svg` exists and is valid**  
      File already exists (confirmed in exploration). Open and confirm it's a valid SVG with `xmlns` and `viewBox`. If it's a placeholder stub, ensure it's valid XML. No changes needed if valid.  
      Files: (read-only check — no changes unless invalid)  
      Verify: `/favicon.svg` loads in browser without error. SVG renders.

- [ ] 11. **Create `public/og-image.jpg` (1200x630 placeholder)**  
      Ivory background (#F6ECD7) with centred text "Ankita & Avnish" in display font (maroon #6E1423). Simple solid-color placeholder is acceptable for now. If no image generation tool available, create a minimal valid JPEG (can be solid color with text overlay or just solid ivory — production can replace later).  
      Files: `public/og-image.jpg`  
      Verify: File exists at path, is valid JPEG, dimensions approximately 1200x630 (exact precision not required for placeholder). OG meta tag references it.

- [ ] 12. **Create `public/robots.txt`**  
      Two lines:  
      ```
      User-agent: *
      Allow: /
      ```  
      Files: `public/robots.txt`  
      Verify: `/robots.txt` loads in browser, shows two lines.

- [ ] 13. **Image optimisation audit** (AUDIT TASK)  
      Confirm:  
      - All images in `public/images/` are WebP: YES (6 placeholder-*.webp files confirmed).  
      - All under 200 KB: YES (each is 56 bytes).  
      - All `<img>` tags in Gallery have explicit width/height: YES (`width={400} height={600}` confirmed in Gallery.tsx).  
      No changes needed. Document audit results.  
      Files: (read-only audit — no file changes)  
      Verify: Report "All 6 images are WebP, under 200 KB, with explicit dimensions."

- [ ] 14. **Phase 6 final verification** (VERIFICATION TASK)  
      Run full verification sequence:  
      1. `npm run build` — must exit 0, no errors.  
      2. Open dev server in browser (`npm run dev`), inspect `<head>` in DevTools: verify all OG tags, Twitter tags, canonical, theme-color, manifest link present.  
      3. Click MusicToggle — verify no thrown errors (console may log missing file warning, which is acceptable). Verify button never autoplays on page load.  
      4. `npm run lint` — must exit 0, zero warnings.  
      5. `npm run test` — all tests pass (currently 37/37).  
      6. Keyboard-walk page (Tab key) — verify all interactive elements show gold focus outline, focus order is logical.  
      7. Set browser to `prefers-reduced-motion: reduce` in DevTools, reload page — verify no spinning mandala, no swaying toran, no shimmer, no scroll-reveal transitions.  
      Files: (read-only verification — no file changes)  
      Verify: All checks pass. Report results: build clean, lint clean, tests pass, OG tags present, music does not autoplay, focus rings visible, reduced-motion respected.

---

## Notes

- **MusicToggle missing audio file**: Component handles gracefully with try/catch around `.play()`, logs error to console, does not throw or crash.
- **Placeholder assets**: `icon-192.png`, `icon-512.png`, `og-image.jpg` are minimal placeholders for now — production can replace with high-quality assets before deployment.
- **Reduced-motion audit**: Hero already implements all required checks. No other components have animations that need disabling.
- **Focus-visible audit**: Global rule covers all standard interactive elements. LangToggle already has component-specific rule (redundant but harmless).
- **Image audit**: Placeholder WebP files are tiny (56 bytes each), far under 200 KB limit. Gallery already has explicit dimensions.
- **No git commits**: Plan explicitly states do NOT commit anything, do NOT start Phase 7. Only create/update files locally.
