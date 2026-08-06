# Preview release package — SolvoOps redesign

**Status:** Ready for preview review · **Not** cleared for production promotion

---

## 1. What this package is

The complete 12-PR redesign stack for SolvoOps.com, delivered as stacked draft PRs. Review and QA against **Vercel preview deployments only**.

Production (`https://solvoops.com`) must stay on the current live experience until a separate, explicit production-release instruction.

---

## 2. Stack map

| PR | Branch | Focus |
|----|--------|--------|
| 1 | `cursor/solvoops-site-audit-2034` | Audit + inventory |
| 2 | `cursor/solvoops-information-architecture-2034` | Routes + content model |
| 3 | `cursor/solvoops-design-system-2034` | Tokens + UI primitives |
| 4 | `cursor/solvoops-global-shell-2034` | Nav / footer shell |
| 5 | `cursor/solvoops-homepage-redesign-2034` | Homepage |
| 6 | `cursor/solvoops-scope2plan-page-2034` | Scope2Plan page |
| 7 | `cursor/solvoops-partnerforge-page-2034` | PartnerForge page |
| 8 | `cursor/solvoops-company-pages-2034` | How It Works / About / Labs |
| 9 | `cursor/solvoops-pilot-form-2034` | Pilot form |
| 10 | `cursor/solvoops-seo-metadata-2034` | SEO / OG / sitemap |
| 11 | `cursor/solvoops-a11y-perf-2034` | A11y / performance |
| 12 | `cursor/solvoops-preview-release-2034` | This release package |

**Tip of stack for preview:** `cursor/solvoops-preview-release-2034`

---

## 3. Preview QA script

1. Open the tip-branch Vercel preview (not production).
2. Confirm `<meta name="robots" content="noindex, nofollow">` on preview.
3. Walk routes:
   - `/` homepage positioning (Scope2Plan + PartnerForge primary)
   - `/products`, `/products/scope2plan`, `/products/partnerforge`
   - `/how-it-works`, `/about`, `/labs`
   - `/pilot` form validation + mailto + honeypot sanity
   - `/privacy`, `/terms` placeholders
   - Unknown path → custom 404
4. Legacy hashes on `/`: `#work`, `#approach`, `#contact`, `#top`
5. Mobile nav + Products disclosure (keyboard + Escape)
6. Lighthouse mobile + desktop against preview (see PR 11 gates)
7. Confirm `robots.txt` and `sitemap.xml` are real files (not SPA HTML)
8. Confirm no confidential-upload control exists on `/pilot`

---

## 4. Soft-launch readiness (still preview-only)

Ready for stakeholder preview review when:
- [x] Tip preview deployed successfully
- [ ] Product status labels confirmed by owner
- [x] Founder bio published on `/about` (approved copy)
- [x] Privacy / Terms draft pages published (still need counsel review before treating as final)
- [x] Analytics integrated on redesign tip (`@vercel/analytics`; close orphan PR #2 without merging into old branch)
- [x] Lighthouse gates met on local production preview (see `preview-qa-results.md`; preview URL SEO noindex is expected)

**Not ready for production until:**
- Explicit written instruction to promote / merge to `main` and assign Production in Vercel
- Release checklist completed (`release-checklist.md`)

---

## 5. Explicit non-actions

- Do **not** merge the redesign stack to `main` from this PR alone
- Do **not** promote a redesign preview to Vercel Production
- Do **not** change DNS
- Do **not** index preview URLs intentionally (keep noindex)

See also: `rollback.md`, `preview-workflow.md`, `release-checklist.md`, `merge-path.md`, `preview-qa-results.md`
