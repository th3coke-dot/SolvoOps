# SolvoOps.com — Current Site Audit (PR 1)

**Branch:** `cursor/solvoops-site-audit-2034` (maps to redesign package PR 1 / `chore/solvoops-site-audit`)  
**Audit date:** 2026-08-06  
**Production URL:** https://solvoops.com  
**Production status during audit:** Live SPA marketing homepage (unchanged by this PR)  
**Scope of this PR:** Documentation and baseline capture only — **no visible site changes**.

---

## 1. Repository snapshot

| Item | Current state |
|------|----------------|
| Repository | `th3coke-dot/SolvoOps` |
| Package manager | npm (`package-lock.json`) |
| Framework | React 19.2.8 + Vite 8.2.0 |
| Language | TypeScript (~6.0.2) |
| Routing | None — single-page app (`src/App.tsx` only) |
| CSS approach | Global CSS file (`src/index.css`), CSS custom properties |
| Lint | oxlint |
| Tests | None configured |
| CMS / database | None |
| Storybook | Not present |

### Source tree (application)

```
.
├── index.html
├── package.json
├── package-lock.json
├── public/
│   ├── favicon.svg
│   └── hero-ops.jpg          (~1.9 MB photographic hero)
├── src/
│   ├── App.tsx               # Entire page + product list data
│   ├── index.css             # Design tokens + all layout styles
│   └── main.tsx              # React mount
├── vite.config.ts
└── README.md
```

### Dead / unused assets

- No unused React/Vite starter SVGs remain (removed in earlier commits).
- No `src/assets/` directory.
- No `robots.txt`, `sitemap.xml`, `404.html`, privacy/terms pages.
- No `vercel.json` in repository (hosting configured in Vercel project UI).

---

## 2. Framework and build

**Scripts**

| Script | Command |
|--------|---------|
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `lint` | `oxlint` |
| `preview` | `vite preview` |

**Build output (2026-08-06):**

- `dist/index.html` ~1.03 kB
- CSS ~8.45 kB (gzip ~2.5 kB)
- JS ~196.6 kB (gzip ~61.9 kB) — includes React runtime for a mostly static page

**Dependencies:** `react`, `react-dom` only.  
**DevDependencies:** Vite React plugin, TypeScript, oxlint, Node types.

---

## 3. Hosting and deployment

| Item | Value |
|------|--------|
| Host | Vercel |
| Team / scope | `biz-days` |
| Project | `solvoops` (`prj_IPAVcNXs1Ijsh2pkeU0gUucQAwLV`) |
| Production aliases | `solvoops.com`, `www.solvoops.com` → apex, `solvoops.vercel.app` |
| Git connection | GitHub `th3coke-dot/SolvoOps`, production branch `main` |
| DNS | Apex A → Vercel (`76.76.21.21`); www CNAME → `cname.vercel-dns.com` (registrar nameservers still `dnsdomene.net`) |
| Preview mechanism | Standard Vercel preview deployments on non-production branches / PRs |

### Deployment rules for redesign (confirmed)

- Keep existing project, domain, and team.
- Do **not** change DNS.
- Do **not** promote redesign PRs to production without a separate explicit instruction.
- Use preview deployments for review.
- Preview HTML should eventually send `noindex, nofollow` (not yet implemented — risk for PR 10).

### Related open PR (external)

- GitHub PR #2 (draft): Install Vercel Web Analytics (`@vercel/analytics`) — **not merged**. Production currently has **no** analytics SDK in `main`.

---

## 4. Routes and navigation

### Current routes

| URL | Behaviour |
|-----|-----------|
| `/` | Single homepage |
| Any other path | SPA fallback to `index.html` (Vite/Vercel default) — **no dedicated 404** |

### In-page anchors

| Anchor | Purpose |
|--------|---------|
| `#top` | Hero / brand |
| `#work` | Demonstrated products |
| `#approach` | How we work |
| `#contact` | Email CTA |

### Primary nav

- Wordmark → `#top`
- “Work” → `#work`

No Products mega-menu, About, Pilot, Labs, Privacy, or Terms routes yet.

**Implication for redesign:** Target multi-page architecture (`/products`, `/products/scope2plan`, etc.) requires introducing a router (likely React Router) or migrating to a multi-page Vite/SSG approach. Prefer the lightest option that preserves Vite + React (decision deferred to PR 2).

---

## 5. Components and architecture

There is **no component library**. UI is monolithic:

| Unit | Location | Notes |
|------|----------|-------|
| App shell + all sections | `src/App.tsx` | Products array hard-coded at top of file |
| Global styles / tokens | `src/index.css` | One file for tokens, layout, motion |
| Entry | `src/main.tsx` | StrictMode mount |

No shared Button, Nav, Footer, Badge, or content modules.

---

## 6. Design tokens (current)

Defined in `:root` (`src/index.css`):

| Token | Value | Role |
|-------|-------|------|
| `--ink` | `#123c34` | Primary text / dark UI |
| `--ink-deep` | `#0a241f` | Deepest ink |
| `--mist` | `#e8f2ed` | Soft green wash |
| `--paper` | `#f6faf7` | Page paper tone |
| `--signal` | `#d4a24c` | Accent / primary button |
| `--signal-deep` | `#b8842f` | Accent hover / labels |
| `--line` | `rgba(18,60,52,0.14)` | Dividers |
| `--muted` | `rgba(18,60,52,0.68)` | Secondary text |
| `--font-display` | Bricolage Grotesque | Brand / headings |
| `--font-body` | Source Sans 3 | Body |
| `--max` | `1120px` | Content width |

**Brand assets**

- Favicon: custom SVG mark (`public/favicon.svg`) — pine green + amber bar.
- Hero: full-bleed warehouse photo (`public/hero-ops.jpg`, ~1.9 MB). Decorative (`alt=""`).

**Motion**

- Hero drift, rise-in, pulse along workflow line, method fade-up.
- `prefers-reduced-motion: reduce` disables those animations.

---

## 7. Content model (current)

Products are an inline `products` array in `App.tsx` with equal visual weight:

1. Scope2Plan → https://scope2plan.com  
2. BizDayz → https://www.bizdayz.com  
3. PartnerForge → https://partnerforge.vercel.app  
4. AutoName → https://www.autoname.pro  

No product-status enum (`available` / `pilot` / etc.). No Labs vs commercial separation. No Generate/Control product split on the marketing site.

Contact: `mailto:hello@solvoops.com` only — **no form**, honeypot, or rate limiting.

Full recoverable copy backup: [`content-backup/`](./content-backup/).

---

## 8. SEO / metadata (current)

| Capability | Present? |
|------------|----------|
| `<title>` | Yes (single page) |
| Meta description | Yes (single page) |
| `lang="en"` | Yes |
| Favicon | Yes (SVG) |
| Canonical | **No** |
| Open Graph / Twitter cards | **No** |
| Social preview images | **No** |
| `sitemap.xml` | **No** |
| `robots.txt` | **No** (requests currently return SPA HTML → Lighthouse robots errors) |
| Structured data | **No** |
| Custom 404 | **No** |
| Per-route metadata | N/A (single route) |
| Preview `noindex` | **No** |

---

## 9. Analytics and contact

| Integration | Status |
|-------------|--------|
| Vercel Web Analytics | Draft PR #2 only — **not on `main` / production** |
| GA / GTM / Plausible | Not present |
| Contact form | Not present |
| Email CTA | `hello@solvoops.com` |
| Env vars | None used by the marketing app |

---

## 10. Accessibility observations (baseline)

Positives observed:

- Landmark-ish structure (`header`/`main`/`footer`, labelled sections).
- `aria-label` on primary nav.
- Decorative hero image uses empty `alt`.
- Reduced-motion support.
- Lighthouse accessibility **100** (local preview, desktop + mobile).

Gaps for redesign:

- No skip-to-content link.
- Product “Open →” text is `aria-hidden`; accessible name comes from surrounding link text (acceptable but brittle).
- No dedicated focus-visible design system beyond browser defaults.
- Future forms must meet WCAG 2.2 AA (labels, errors, honeypot not in DOM as fake fields for AT).

---

## 11. Performance observations (baseline)

See [`performance-baseline.md`](./performance-baseline.md).

Key risk: **hero JPEG ~1.9 MB** drives poor mobile LCP under Lighthouse mobile throttling (LCP ~12.5 s in audit environment). Desktop local preview scored very high with light throttling.

---

## 12. Product-link verification (external)

| Product | Marketing claim on SolvoOps | Live destination | Notes for later PRs |
|---------|-----------------------------|------------------|---------------------|
| Scope2Plan | SOW → plan / runbook / transition | https://www.scope2plan.com (apex redirects) | Public Generate-oriented product page; Control not clearly marketed as separate product on live Scope2Plan site title/meta |
| PartnerForge | Partner discovery for field service | https://partnerforge.vercel.app | Live; title “Field Service Partner Discovery”; no `partnerforge.io` DNS from this environment |
| BizDayz | Working days / holidays / holiday pay | https://www.bizdayz.com | Live |
| AutoName | Naming pipeline | https://www.autoname.pro (+ `autonamesearch.vercel.app`) | Live consumer/tool site; GitHub `AutoNameSearch` is the pipeline project |

**Accuracy risk:** Current SolvoOps homepage gives **equal prominence** to Labs-class tools (BizDayz, AutoName) and commercial targets (Scope2Plan, PartnerForge). Redesign must demote Labs.

---

## 13. Risks and unresolved assumptions

1. **Router choice** for multi-page IA not decided (PR 2).
2. **Product status labels** need founder/product-owner confirmation after inspecting product repos (recommended statuses drafted in content inventory; not authoritative until approved).
3. **Scope2Plan Control** capabilities and public availability must be verified before marketing copy ships (PR 6).
4. **PartnerForge ↔ Scope2Plan integration** is not live — copy must use “Designed to support a connected delivery workflow.”
5. **Founder biography** not present in repo — About page blocked on approved factual copy (PR 8).
6. **Analytics** draft PR #2 may conflict with redesign analytics event plan — coordinate before merging both.
7. **Preview `noindex`** not yet configured — risk of indexing preview URLs if public.
8. **Production branch is `main`** — redesign feature branches must not merge/promote until release review (PR 12 + explicit instruction).
9. **Hero photography** may conflict with redesign visual direction (avoid stock-office; current hero is ops warehouse — may keep or replace with workflow diagram).
10. **Contact email** `hello@solvoops.com` assumed valid; mailbox not verified in this audit.

---

## 14. Files this PR creates

| Path | Purpose |
|------|---------|
| `docs/redesign/current-site-audit.md` | This audit |
| `docs/redesign/content-inventory.md` | Full copy inventory + backup pointers |
| `docs/redesign/route-map.md` | Current vs target routes |
| `docs/redesign/seo-baseline.md` | SEO baseline |
| `docs/redesign/performance-baseline.md` | Lighthouse baseline |
| `docs/redesign/visual-baseline/*` | Desktop/mobile screenshots + Lighthouse summaries |
| `docs/redesign/content-backup/*` | Recoverable pre-redesign source snapshots |
| `docs/redesign/preview-workflow.md` | How preview deploys work for this project |
| `docs/redesign/pr1-implementation-notes.md` | Plan, decisions, rollback, next PR |

**No application source files are modified for visible behaviour.**

---

## 15. Acceptance criteria checklist (PR 1)

- [x] No visible site changes
- [x] No production deployment from this PR
- [x] Existing site behaviour documented
- [x] Existing content recoverable (`content-backup/`)
- [x] Preview workflow documented
- [x] Risks documented
- [x] Screenshots captured (desktop + mobile)
- [x] Lighthouse baseline recorded
