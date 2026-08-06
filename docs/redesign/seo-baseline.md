# SEO baseline — SolvoOps.com (PR 1)

**Audited:** 2026-08-06  
**URL:** local production build preview `http://127.0.0.1:4173/` (same build artifact as Vercel)  
**Live production:** https://solvoops.com

---

## Lighthouse SEO category

| Form factor | SEO score |
|-------------|-----------|
| Desktop | 91 |
| Mobile | 91 |

Primary SEO deduction: **invalid / missing `robots.txt`**. Requests to `/robots.txt` return the SPA HTML document, which Lighthouse flags as malformed robots rules.

---

## Present metadata

| Item | Status | Value / notes |
|------|--------|----------------|
| Document title | Present | `SolvoOps — Tools that solve operational bottlenecks` |
| Meta description | Present | Mentions Scope2Plan, BizDayz, PartnerForge, AutoName equally |
| Viewport | Present | Yes |
| `html[lang]` | Present | `en` |
| Favicon | Present | `/favicon.svg` |
| Crawlable (no meta robots noindex) | Yes on production | Production is indexable |
| Canonical link | **Absent** | |
| Open Graph | **Absent** | |
| Twitter card | **Absent** | |
| Structured data (JSON-LD) | **Absent** | |
| `sitemap.xml` | **Absent** | |
| `robots.txt` | **Absent** | SPA fallback HTML served |
| Hreflang | N/A | Single language |
| Social image | **Absent** | |
| Per-page titles | N/A | Single page only |
| Custom 404 | **Absent** | |
| Preview noindex | **Absent** | Risk for future preview URLs |

---

## Internal linking

- Hash links only (`#work`, `#approach`, `#contact`).
- External product links open in new tabs (`rel="noreferrer"`; `noopener` not explicitly set — minor hardening opportunity).

---

## Indexing posture vs redesign goals

| Environment | Desired | Current |
|-------------|---------|---------|
| Production | Indexable after release approval | Indexable now with current single-page content |
| Preview | `noindex, nofollow` | Not configured |

**Do not change production indexing behaviour in redesign PRs until PR 12 / explicit release instruction.**

---

## Recommended SEO work (later PRs — not PR 1)

1. Add real `public/robots.txt` and `sitemap.xml` (PR 10).
2. Unique titles/descriptions per route (PR 10).
3. Canonical + Open Graph + social images (PR 10).
4. Organization / WebSite / SoftwareApplication JSON-LD without fake reviews (PR 10).
5. Custom 404 (PR 10).
6. Preview `noindex` via Vercel env or meta injection (PR 2 / PR 10).
7. Rewrite meta description to primary products positioning (PR 5 / PR 10).
