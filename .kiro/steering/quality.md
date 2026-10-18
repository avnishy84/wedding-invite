---
inclusion: fileMatch: ["src/**/*.test.ts", "src/**/*.test.tsx", "vitest.config.ts", ".eslintrc.cjs"]
---

# Quality

## Linting
ESLint v8 with `@typescript-eslint`, `react`, `react-hooks`, `jsx-a11y`, `prettier`.
Zero warnings policy: `eslint src --ext .ts,.tsx --max-warnings 0`.

## Formatting
Prettier v3. Config: singleQuote, semi, tabWidth 2, trailingComma es5, printWidth 100.

## Testing
- Framework: Vitest v1 + React Testing Library v15 + jsdom v24.
- Setup file: `src/tests/setup.ts` (imports `@testing-library/jest-dom`).
- Tests live in `src/tests/` mirroring `src/` structure.
- Run: `npm run test` (single run), `npm run test:watch` (watch), `npm run coverage`.

## Build verification
`npm run build` must exit 0. TypeScript strict mode — no `any`, no unused vars.

## Full check
`npm run checkall` = lint + test + build. Must pass before any commit.

## Coverage
Not enforced by threshold in Phase 1, but track via `npm run coverage`.
