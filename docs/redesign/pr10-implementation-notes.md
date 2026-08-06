# PR 10 — SEO / metadata / discoverability

## Delivered
- `public/robots.txt` (allows indexing; blocks `/design-system`)
- `public/sitemap.xml` for primary public routes
- Canonical + Open Graph + Twitter Card tags via `DocumentMeta`
- Default social image `public/og-default.png` (1200×630)
- JSON-LD graph: Organization, WebSite, WebPage, SoftwareApplication (no fake reviews/ratings)
- Legacy hash redirects: `#work` → `/products`, `#approach` → `/how-it-works`, `#contact` → `/pilot`, `#top` → `/`
- Polished custom 404 with recovery links
- Preview / development builds continue to emit `noindex, nofollow`

## Notes
- SPA meta tags are client-injected; crawlers that execute JS will see them. For stronger first-byte SEO later, consider prerender or SSR.
- Production indexing behaviour only applies after an explicit production release — do not promote this branch yet.
