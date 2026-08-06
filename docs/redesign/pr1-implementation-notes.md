# PR 1 implementation notes — site audit

## Objective

Complete redesign package **PR 1**: existing-site audit and content inventory with **zero visible changes** and **no production promotion**.

## Branch naming

Redesign package suggested: `chore/solvoops-site-audit`  
Cloud agent required pattern: `cursor/<name>-2034`  

**Used:** `cursor/solvoops-site-audit-2034`

## Current implementation (pre-PR summary)

- Single-page Vite + React marketing site on `main`.
- Monolithic `App.tsx` + `index.css`.
- Four equal product links; mailto contact; no router; no analytics on production; Vercel hosting on `solvoops.com`.

## Dependencies for this PR

- Access to repository and production URL for screenshots.
- Local Node/npm for build + Lighthouse.
- No secrets required.
- No env var changes.

## Risks addressed / recorded

Documented in `current-site-audit.md` §13 (router choice, product status approval, integration claims, founder bio, analytics PR conflict, preview noindex, hero weight, etc.).

## Implementation plan executed

1. Sync `main` and branch for audit.
2. Inventory framework, files, routes, styles, content, hosting.
3. Verify external product URLs.
4. Capture desktop/mobile screenshots of production.
5. Run Lighthouse on production build preview.
6. Write audit deliverables under `docs/redesign/`.
7. Backup recoverable pre-redesign sources under `docs/redesign/content-backup/`.
8. Open PR for review; preview deploy for docs-only branch; leave production untouched.

## Files created / modified

### Created

- `docs/redesign/current-site-audit.md`
- `docs/redesign/content-inventory.md`
- `docs/redesign/route-map.md`
- `docs/redesign/seo-baseline.md`
- `docs/redesign/performance-baseline.md`
- `docs/redesign/preview-workflow.md`
- `docs/redesign/pr1-implementation-notes.md`
- `docs/redesign/content-backup/*`
- `docs/redesign/visual-baseline/*`

### Modified

- None of the application runtime sources (`src/*`, `index.html`, `public/*` intentionally unchanged).

## Architectural decisions

- Documentation lives under `docs/redesign/` to keep the redesign programme self-contained.
- Full Lighthouse JSON omitted from git; compact summaries retained.
- Product-status values recorded as **draft hypotheses**, not as site UI.

## Environment changes

None.

## Rollback

Delete the `docs/redesign/` tree / revert this PR. No application rollback required because UI was not changed.

## Tests / checks run

- `npm run build` — pass
- `npm run lint` — pass (oxlint)
- Lighthouse desktop/mobile against local preview — recorded
- Production visual capture — recorded
- Confirmed no `src/` / `index.html` / `public/` diffs in this PR

## Preview verification intent

Preview deployment of this branch should match production visually. Reviewers should confirm docs render in GitHub and that Vercel preview still shows the current homepage.

## Recommend next PR

**PR 2 — Information architecture and central content model**  
Branch suggestion: `cursor/solvoops-information-architecture-2034`

Should add:

- Route structure (introduce lightweight router or multi-page setup)
- `/content` configuration modules (`company`, `navigation`, `products`, `product-status`, `site-metadata`)
- Placeholder pages for target routes
- Preview `noindex` approach
- Preserve current production navigation/content until later redesign PRs land (feature flag or keep existing homepage as default until PR 5)

**Do not** start homepage visual redesign before PRs 1–3 complete.
