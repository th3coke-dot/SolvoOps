# Route map — current vs target

## Current routes (production)

| Path | Type | Content |
|------|------|---------|
| `/` | Page | Full marketing homepage (SPA) |
| `/#top` | Hash | Hero |
| `/#work` | Hash | Products |
| `/#approach` | Hash | Method |
| `/#contact` | Hash | Contact |
| `/*` (other) | Fallback | Same SPA shell (no custom 404) |

**Router:** none.  
**Canonical host:** `https://solvoops.com` (www → apex 308).

### External product exits (current)

| Label | Destination |
|-------|-------------|
| Scope2Plan | https://scope2plan.com → https://www.scope2plan.com |
| BizDayz | https://www.bizdayz.com |
| PartnerForge | https://partnerforge.vercel.app |
| AutoName | https://www.autoname.pro |

---

## Target routes (redesign package — implement from PR 2 onward)

| Path | Purpose | Notes |
|------|---------|-------|
| `/` | Homepage | New positioning |
| `/products` | Product index | Scope2Plan + PartnerForge |
| `/products/scope2plan` | Scope2Plan product | Optional short alias `/scope2plan` |
| `/products/partnerforge` | PartnerForge product | Optional short alias `/partnerforge` |
| `/how-it-works` | Method narrative | |
| `/about` | Company / founder | Founder copy TBD |
| `/labs` | BizDayz, AutoNameSearch, experiments | Visually secondary |
| `/pilot` | Pilot conversion | Form + mailto fallback |
| `/privacy` | Privacy | |
| `/terms` | Terms | |
| Custom 404 | Not found | |

### Suggested legacy / hash redirects (PR 2 / PR 10)

| From | To |
|------|----|
| `/#work` | `/products` or `/#products` |
| `/#approach` | `/how-it-works` |
| `/#contact` | `/pilot` |
| `/#top` | `/` |

Hash redirects are imperfect in pure SPAs; prefer preserving hash handlers during transition or documenting that old shared links to hashes still scroll on the interim homepage until multi-page cutover.

### SEO history note

- Site is new (first production deploy ~2026-08-03). Limited indexed history expected.
- No prior multi-page URL inventory beyond `/`.
- Choose `/products/scope2plan` and `/products/partnerforge` as canonical product paths unless later SEO data prefers short paths.

---

## Primary navigation (target)

Home · Products (Scope2Plan, PartnerForge) · How It Works · About · Pilot

Optional secondary: Labs · Privacy · Terms
