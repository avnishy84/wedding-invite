---
inclusion: fileMatch: ["src/**/*.tsx", "src/**/*.css", "src/**/*.ts"]
---

# Design System: "Vintage Rajwada"

## Mood
Hand-printed invitation on aged cream paper, gold foil accents, rich maroon and peacock panels,
mehndi-style linework. Think Rajasthani haveli, jharokha windows, Mughal-inspired florals.

## Colour tokens (src/styles/tokens.css)
--ivory:       #F6ECD7;  /* paper background */
--parchment:   #EAD9B5;  /* aged panels */
--maroon:      #6E1423;  /* primary */
--maroon-deep: #4A0E19;
--gold:        #C79A3B;  /* foil accents, borders */
--gold-light:  #E3C376;
--peacock:     #1D5C63;  /* secondary */
--saffron:     #D9822B;  /* highlights, sparingly */
--ink:         #2B1A14;  /* body text, never pure black */
Contrast: body text on ivory must be at least 7:1; gold is decoration only, never for small text on ivory.

## Typography (self-hosted)
- Display / names: "Cinzel Decorative" or "Playfair Display SC"
- Script accent: "Pinyon Script" or "Great Vibes" (sparingly, names and short flourishes)
- Body serif: "Cormorant Garamond" (min 18px mobile, 1.6 line-height)
- Devanagari: "Tiro Devanagari Hindi" (headings and body), "Yatra One" for decorative headings
- Define a fluid scale with clamp(): h1 clamp(2.4rem, 8vw, 5rem), body clamp(1.1rem, 2.5vw, 1.3rem)

## Texture and ornament
- Paper grain: subtle SVG noise overlay (opacity 0.06) on body, plus vignette at the edges.
- Borders: double gold rule with corner paisley flourishes (SVG, `currentColor`-driven).
- Section dividers: lotus or kalash motif SVG, centred.
- Hero: tall jharokha / cusped arch frame containing names, with a rotating, very slow mandala behind (CSS, 120s loop).
- Event cards: parchment panel, gold inner border, mandala watermark at 8% opacity.
- Optional: hanging marigold toran across the top of the hero (SVG, gentle sway).

## Motion
- Scroll-reveal fade-up (400 to 600 ms, ease-out), staggered by 80 ms.
- Gold shimmer on the names (CSS gradient clip, once on load).
- All motion disabled under `prefers-reduced-motion: reduce`.

## Layout
- Single column, max-width 720px for text, 1080px for gallery and events grid.
- Sections are full-viewport-ish panels alternating ivory, maroon (with ivory text) and peacock.
- Sticky minimal top bar: language toggle + music toggle only.

## Accessibility
- Semantic landmarks, one h1, heading order intact, alt text for all images, focus-visible rings in gold.
- Language attribute switches (`lang="hi"`) when Hindi is active.
- Tap targets of at least 44px. Colour is never the only signal.
