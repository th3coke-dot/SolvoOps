# PR 11 — Accessibility and performance hardening

## Delivered
- Removed unused `public/hero-ops.jpg` (~1.9 MB LCP risk) to redesign content backup
- Homepage LCP now driven by text + lightweight SVG workflow (not photography)
- Lazy-loaded secondary routes; homepage remains eager
- Non-blocking Google Fonts load pattern (`preload` + `media=print` swap) with `display=swap`
- Sticky-header `scroll-padding-top` for in-page / skip targets
- Mobile nav uses `inert` + `aria-hidden` when closed (keeps `data-open` display model)
- Workflow visual exposes a screen-reader caption
- Security / cache headers on Vercel (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, hashed asset cache)
- Form error colours use design-token danger colour

## Quality gates (target)
| Gate | Target |
|------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best practices | ≥ 95 |
| SEO | ≥ 95 |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |

Validate on a Vercel **preview** deployment with Lighthouse mobile + desktop before production release (PR 12).

## Notes
- Prefer validating against preview URLs, not production.
- Do not promote production from this PR.
