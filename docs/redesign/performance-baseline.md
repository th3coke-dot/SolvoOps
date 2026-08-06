# Performance baseline — SolvoOps.com (PR 1)

**Audited:** 2026-08-06  
**Method:** Lighthouse 12.6 against local `vite` production preview (`npm run build && npm run preview`)  
**Summaries:** [`visual-baseline/lighthouse-desktop-summary.json`](./visual-baseline/lighthouse-desktop-summary.json), [`visual-baseline/lighthouse-mobile-summary.json`](./visual-baseline/lighthouse-mobile-summary.json)

---

## Category scores

| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 100 | 71 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 91 | 91 |

---

## Core metrics

| Metric | Desktop | Mobile |
|--------|---------|--------|
| FCP | 0.2 s | 2.7 s |
| LCP | 0.2 s | 12.5 s |
| CLS | 0 | 0 |
| TBT | 0 ms | 0 ms |
| TTI | 0.2 s | 12.5 s |
| Speed Index | 0.6 s | 2.7 s |

> Note: Desktop run used lighter throttling (`--throttling-method=provided` / screen emulation disabled). Mobile used default Lighthouse mobile throttling — treat mobile LCP as the primary risk signal.

---

## Likely LCP culprit

- `public/hero-ops.jpg` ≈ **1.9 MB**, full-bleed background.
- Loaded eagerly with `fetchPriority="high"`.
- No responsive `srcset`, no modern format (WebP/AVIF), no blur placeholder.

**Redesign implication:** Replace or aggressively compress hero media; prefer illustrative workflow graphic if photography is dropped; ensure LCP element is optimised before PR 11 quality gate.

---

## JavaScript weight

- Main bundle ≈ **196 kB** JS (≈ 62 kB gzip) for a static marketing page.
- Acceptable today; multi-page React Router may grow — keep marketing pages lean (PR 11).

---

## Fonts

- Google Fonts: Bricolage Grotesque + Source Sans 3 via CSS stylesheet in `index.html`.
- `preconnect` present for fonts.googleapis.com / fonts.gstatic.com.
- Risk: render-blocking remote CSS; consider self-hosting or `font-display` strategy in design-system PR.

---

## Third parties (current production)

- Google Fonts only (in HTML).
- No analytics script on `main` yet (draft PR #2 adds `@vercel/analytics`).

---

## Targets from redesign package (for later validation)

| Target | Gate |
|--------|------|
| Performance ≥ 90 | PR 11 |
| Accessibility ≥ 95 | PR 11 |
| Best practices ≥ 95 | PR 11 |
| SEO ≥ 95 | PR 10–11 |
| LCP < 2.5 s | PR 11 |
| CLS < 0.1 | Already met in baseline |
| INP < 200 ms | PR 11 |

---

## Performance work deferred (not PR 1)

- Image optimisation / format conversion.
- Font loading strategy.
- Bundle splitting after router introduction.
- Analytics lazy loading.
- Animation cost audit.
