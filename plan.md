# Wedding Invitation Site — Plan

## Part 1 — Overview

A single-page Indian wedding invitation website. Vintage "Rajwada" ethnic aesthetic.
Mobile-first, bilingual (EN/HI), Firebase hosted.

## Part 2 — Goals

- Deliver a warm, beautiful, shareable wedding invitation via a WhatsApp link.
- Works on phones (ages 15–75), loads fast on 4G, accessible.
- Zero ongoing cost: Firebase free tier + static hosting.

## Part 3 — Steering Files

Located in `.kiro/steering/`:

| File | Inclusion |
|------|-----------|
| `product.md` | always |
| `tech.md` | always |
| `structure.md` | always |
| `design-system.md` | fileMatch: src/**/*.tsx, src/**/*.css, src/**/*.ts |
| `content.md` | fileMatch: src/content/**, src/components/** |
| `deployment.md` | fileMatch: firebase.json, .firebaserc, firestore.rules, *.md |
| `quality.md` | fileMatch: src/**/*.test.ts, src/**/*.test.tsx, vitest.config.ts, .eslintrc.cjs |

## Part 4 — Spec

Located in `.kiro/specs/wedding-invitation-site/`:
- `requirements.md` — EARS-style acceptance criteria
- `design.md` — architecture, data flow, component contracts
- `tasks.md` — phased task list

## Part 5 — Phase Order

1. Project Scaffold & Toolchain
2. Design Tokens & Global Styles
3. Content File & Hooks
4. TopBar Components
5. Hero & Blessing Sections
6. Couple, Countdown & Events Sections
7. Venue, RSVP & Gallery Sections
8. Footer & Assembly
9. Firebase Hosting & Deployment Config
10. Performance & Final Polish

## Part 6 — Key Decisions

- Vite + React 18 + TypeScript strict — fast dev, modern toolchain.
- CSS Modules + CSS custom properties — no Tailwind, no UI kit; full design control.
- Self-hosted fonts via @fontsource — no Google Fonts runtime calls.
- Firebase Hosting + optional Firestore RSVP — minimal backend, free tier.
- No routing, no SSR — pure SPA, all sections scroll-navigated.
- Bilingual via lightweight `useLang` hook — no heavy i18n library.
