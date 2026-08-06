# Content inventory — current SolvoOps.com

**Source of truth (live code):** `src/App.tsx`, `index.html`  
**Recoverable backup:** [`content-backup/`](./content-backup/)

---

## Page-level metadata

| Field | Current value |
|-------|----------------|
| Title | `SolvoOps — Tools that solve operational bottlenecks` |
| Meta description | `SolvoOps builds tools that solve operational bottlenecks — demonstrated with Scope2Plan, BizDayz, PartnerForge, and AutoName.` |
| Language | `en` |

---

## Navigation

| Label | Target |
|-------|--------|
| SolvoOps | `#top` |
| Work | `#work` |

---

## Hero

| Element | Copy |
|---------|------|
| Brand | SolvoOps |
| Headline (H1) | Tools that break operational bottlenecks. |
| Lede | SolvoOps builds focused software that helps companies find where work stalls — and clear the path so delivery can move again. |
| Primary CTA | See the tools → `#work` |
| Secondary CTA | Talk about a bottleneck → `#contact` |
| Visual | Full-bleed warehouse/ops photo (`/hero-ops.jpg`) |

---

## Section — The company

| Element | Copy |
|---------|------|
| Label | The company |
| Title | One job: solve the friction that slows operations. |
| Body | We do not ship another sprawling platform. We build sharp tools aimed at a specific bottleneck — planning, partnering, payroll timing, naming — so teams spend less time fighting process and more time delivering. |
| Visual | CSS pulse-along-track illustration |

---

## Section — Demonstrated work

| Element | Copy |
|---------|------|
| Label | Demonstrated work |
| Title | Four tools. Four bottlenecks. Same craft. |
| Body | Live products that show how SolvoOps approaches operational friction — find the stall, build the lever, put it in people’s hands. |

### Product entries (equal prominence today)

| Name | Bottleneck label | Summary | URL |
|------|------------------|---------|-----|
| Scope2Plan | Delivery planning from SOWs | Turn a Statement of Work into a project plan, runbook, and transition pack in minutes — structured for real delivery, not workshop theatre. | https://scope2plan.com |
| BizDayz | Working-day and payroll math | Norwegian working days, public holidays, holiday pay, and employer cost — clear answers for planning and payroll without spreadsheet archaeology. | https://www.bizdayz.com |
| PartnerForge | Finding the right delivery partners | Natural-language partner discovery for European field service — AI ranking and validated rate benchmarks so the right crew surfaces first. | https://partnerforge.vercel.app |
| AutoName | Naming without the guesswork | A systematic naming pipeline: phonetic generation, domain checks, brand collision search, and ranked shortlists built for enterprise feel. | https://www.autoname.pro |

CTA pattern per product: “Open →” (external).

---

## Section — How we work

| Element | Copy |
|---------|------|
| Label | How we work |
| Title | Find the bottleneck. Build the lever. Ship the habit. |
| Intro | Every engagement starts with the stall — not a feature wishlist. |

| Step | Title | Body |
|------|-------|------|
| 01 | Map the stall | We look at how work actually moves: handoffs, rework, waiting time, and the quiet workarounds teams invent to stay on schedule. |
| 02 | Ship a sharp tool | We build the smallest useful system that removes that bottleneck — scoped tightly enough to trust on a busy day. |
| 03 | Prove it in use | We put the tool in the real flow, tune what sticks, and leave teams with a clearer rhythm than they started with. |

---

## Section — Contact

| Element | Copy |
|---------|------|
| Label | Next step |
| Title | Tell us where work gets stuck. |
| Body | Share the bottleneck you are living with. We will come back with a clear read on whether a SolvoOps tool is the right next move — and how we would start. |
| CTA | Email hello@solvoops.com (`mailto:hello@solvoops.com`) |

---

## Footer

| Element | Copy |
|---------|------|
| Brand | SolvoOps |
| Tagline | Tools that solve operational bottlenecks. |

---

## README product list

Mirrors the four product links above; documents `npm` scripts and contact email.

---

## Draft product-status recommendations (NOT approved)

These are **audit hypotheses** for the content model in PR 2. They require product-owner confirmation before UI badges ship.

| Product | Surface area | Suggested status | Rationale |
|---------|--------------|------------------|-----------|
| Scope2Plan Generate | Public product at scope2plan.com | `available` or `pilot` | Live public Generate-oriented experience; confirm commercial posture |
| Scope2Plan Control | Not clearly separated on public Scope2Plan marketing | `in-development` or `planned` until verified | Do not market as available without confirmation |
| PartnerForge | Live at partnerforge.vercel.app | `private-preview` or `pilot` | Accessible demo URL; confirm customer-facing posture and canonical domain |
| BizDayz | Live at bizdayz.com | Labs / `available` | Secondary on enterprise site |
| AutoName / AutoNameSearch | autoname.pro + pipeline repo | Labs / `available` or experiment | Secondary on enterprise site |

**Must not claim without verification:** live Scope2Plan↔PartnerForge technical integration; CRM integrations; certifications; customer logos; time-saving metrics.

---

## Content that must be replaced in redesign (high level)

| Current theme | Target theme (from redesign package) |
|---------------|--------------------------------------|
| Equal four-tool portfolio | Scope2Plan + PartnerForge primary; Labs secondary |
| “Tools that break operational bottlenecks” | “From operational complexity to controlled execution” |
| Generic how-we-work steps | Connected delivery workflow + brand pillars |
| Mailto-only contact | Pilot page + form (reuse email/infra; no new DB) |
| Single homepage | Multi-page IA |
