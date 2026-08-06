# PR 2 implementation notes — information architecture

## Objective

Create the route structure and centralised product content model **without** completing the visual redesign. Preserve the current homepage look and production navigation until later PRs.

## Branch

`cursor/solvoops-information-architecture-2034`  
Stacked on `cursor/solvoops-site-audit-2034` (PR 1). Base this PR on the audit branch until PR 1 merges; then retarget to `main`.

## Current implementation (before)

- Single route `/` in monolithic `App.tsx`
- Product copy hard-coded in component
- No status model, metadata module, or placeholder pages

## Dependencies

- `react-router-dom` for client routes
- `vitest` for content-model tests
- Existing Vite + React stack
- Vercel SPA rewrite via `vercel.json`
- Relies on PR 1 docs for status hypotheses

## Risks

1. Product statuses remain **draft** until founder/product-owner approval.
2. Stacked PR requires PR 1 merge (or retarget) before merging to `main`.
3. Preview `noindex` depends on `VERCEL_ENV=preview` at build time.
4. Homepage still lists Labs products equally — intentional until PR 5.
5. Placeholder pages are intentionally plain (not design-system quality).
6. Open analytics PR #2 may conflict on `App.tsx` — coordinate merge order.

## Implementation summary

1. Added `/src/content/*` configuration modules.
2. Introduced React Router with all target routes + short-path redirects.
3. Extracted current homepage to `HomePage` fed by content config.
4. Added minimal placeholder pages for IA review.
5. Added `DocumentMeta` with preview `noindex, nofollow`.
6. Added content integrity tests.
7. Added `vercel.json` SPA rewrites.

## Files created / modified

### Created

- `src/content/company.ts`
- `src/content/navigation.ts`
- `src/content/products.ts`
- `src/content/product-status.ts`
- `src/content/use-cases.ts`
- `src/content/site-metadata.ts`
- `src/content/index.ts`
- `src/content/content.test.ts`
- `src/components/DocumentMeta.tsx`
- `src/components/PlaceholderLayout.tsx`
- `src/components/PlaceholderLayout.css`
- `src/pages/HomePage.tsx`
- `src/pages/ProductsPage.tsx`
- `src/pages/ProductDetailPages.tsx`
- `src/pages/CompanyPages.tsx`
- `vercel.json`
- `docs/redesign/pr2-implementation-notes.md`

### Modified

- `src/App.tsx` — route table
- `src/main.tsx` — `BrowserRouter`
- `vite.config.ts` — Vitest + Vercel env exposure
- `package.json` / `package-lock.json` — router, vitest, test script

## Architectural decisions

- **Router:** `react-router-dom` keeps Vite SPA hosting; lightest fit for marketing multi-page IA.
- **Canonical product paths:** `/products/scope2plan`, `/products/partnerforge` with short redirects.
- **Homepage preservation:** legacy copy/nav remain on `/` until PR 5.
- **Capability lists:** split into available / pilot / planned arrays in config.
- **Integration wording:** `company.connectedWorkflowNote` uses “Designed to support a connected delivery workflow.”

## Environment changes

| Variable | Purpose |
|----------|---------|
| `VERCEL_ENV` | Injected by Vercel; mapped to `import.meta.env.VITE_VERCEL_ENV` for preview noindex |
| `VITE_SHOW_IA_NAV` | Optional; when `true`, placeholder pages show full primary nav |

No secrets added. No DNS changes. No production promotion.

## Rollback

1. Revert this PR / branch.
2. Remove `vercel.json` if it causes hosting issues (Vite Vercel preset usually already SPA-fallbacks).
3. Homepage can be restored from `docs/redesign/content-backup/` if needed.

## Checks run

- `npm run lint`
- `npm run test`
- `npm run build`
- Local preview route smoke checks
- Confirm `/` still serves legacy homepage

## Preview verification

Open the Vercel preview URL and confirm:

1. `/` matches current production look
2. `/products`, product pages, `/how-it-works`, `/about`, `/labs`, `/pilot`, `/privacy`, `/terms` render
3. `/scope2plan` → `/products/scope2plan`
4. Unknown paths → custom 404 placeholder
5. Preview HTML includes `noindex, nofollow`

## Recommend next PR

**PR 3 — Design system and visual foundations**  
Branch: `cursor/solvoops-design-system-2034`  
Do not start homepage redesign (PR 5) before PR 3 and PR 4.
