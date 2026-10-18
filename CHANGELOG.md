# Changelog

All notable changes to the Wedding Invitation Site project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **HeroRunners component** — Decorative animation featuring an Indian groom and bride running across the bottom of the hero section (2024-10-17)
  - Groom character with cream sherwani, peacock safa, and gold juttis
  - Bride character with maroon lehenga, flowing dupatta, and jewelry details
  - CSS-only run cycle animation (leg/arm swing, body bob, dupatta wave)
  - Groom runs for ~6 seconds, bride follows 1.5 seconds behind
  - Characters exit off-screen after animation completes (plays once)
  - Positioned at hero bottom with subtle gold ground line
  - Fully responsive sizing using clamp() for 360px to 1280px+ viewports
  - Automatically hidden when `prefers-reduced-motion: reduce` is set
  - Marked `aria-hidden="true"` for decorative-only accessibility
  - `HeroRunners.tsx` — Component implementation with inline SVG characters
  - `HeroRunners.module.css` — CSS animations and responsive styling
  - `HeroRunners.test.tsx` — Unit tests for rendering and accessibility

### Changed
- **Hero component** — Integrated HeroRunners as a child component below the arch layer

### Tests
- Added 3 test cases for HeroRunners component
- Verified decorative wrapper renders with `aria-hidden="true"`
- Verified two SVG characters (groom and bride) are present
- Verified no text content in decorative component
- All tests passing: 40 tests across 6 test files

---

## [0.1.0] - 2024-10-17

### Added
- Initial project setup with Vite + React 18 + TypeScript
- ESLint and Prettier configuration
- Vitest + React Testing Library setup
- Project folder structure (components, hooks, lib, styles, content, tests)
- GitHub Actions workflow for Firebase Hosting deployment
- Firebase configuration files (firebase.json, firestore.rules)
- Design tokens and global styles (tokens.css, base.css, typography.css, textures.css)
- Hero component with jharokha arch, mandala background, and toran decoration
- Name shimmer animation and scroll cue
- LangToggle and MusicToggle components
- useLang, useCountdown, and useReveal custom hooks
- Wedding content data structure (wedding.ts)
- Couple, Events, Venue, Gallery, Rsvp, Blessing, and Footer components
- Lightbox component for gallery images
- ICS calendar export functionality
- RSVP form with Firestore integration (feature-flagged)
- Ornament dividers and decorative SVG assets
- PWA manifest and icons
- Responsive layout for mobile and desktop viewports

### Documentation
- README.md with project overview and setup instructions
- PLAN.md with development roadmap
- Spec documents (requirements.md, design.md, tasks.md)

---

## Notes

### How to Update This Changelog

When making changes:

1. Add new entries under `[Unreleased]` section
2. Use these categories:
   - **Added** — New features
   - **Changed** — Changes to existing functionality
   - **Deprecated** — Soon-to-be removed features
   - **Removed** — Removed features
   - **Fixed** — Bug fixes
   - **Security** — Security vulnerability fixes
   - **Tests** — Test additions or changes

3. When releasing a version:
   - Move `[Unreleased]` items to a new version section
   - Use format: `## [version] - YYYY-MM-DD`
   - Create a new empty `[Unreleased]` section at the top

### Example Entry Format

```markdown
## [Unreleased]

### Added
- **ComponentName** — Brief description (YYYY-MM-DD)
  - Implementation details
  - File changes: `path/to/file.tsx`

### Fixed
- **Bug description** — How it was fixed (YYYY-MM-DD)
```
