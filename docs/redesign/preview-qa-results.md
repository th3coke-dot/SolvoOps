# Preview QA results — tip of redesign stack

**Branch:** `cursor/solvoops-preview-release-2034`  
**Preview:** https://solvoops-git-cursor-solvoops-preview-release-2034-biz-days.vercel.app  
**Production check:** https://solvoops.com still serves pre-redesign (“bottlenecks”) — unchanged.

## Visual / functional QA (2026-08-06)

| Check | Result |
|-------|--------|
| Homepage brand + positioning | Pass |
| Primary products Scope2Plan + PartnerForge | Pass (below hero; hero workflow diagram is illustrative, not a product grid) |
| Scope2Plan / PartnerForge / How It Works / About / Labs | Pass |
| `/pilot` form, validation, confidentiality, no upload, mailto | Pass |
| Custom 404 | Pass |
| Mobile nav present | Pass |
| Production unchanged | Pass |

## Lighthouse (local production preview `vite preview`)

| | Performance | Accessibility | Best practices | SEO | LCP |
|--|-------------|---------------|----------------|-----|-----|
| Mobile | **93** | **100** | **96** | **100** | 1.8 s |
| Desktop | **100** | **100** | **96** | **100** | 0.5 s |

Targets (≥90 / ≥95 / ≥95 / ≥95, LCP < 2.5 s) met on local production build.

### Preview-URL caveat
Vercel preview deployments send `noindex` (meta + `x-robots-tag`). Lighthouse SEO on the **preview URL** will fail `is-crawlable` by design. Production after promote should be indexable.

Artifacts: `/opt/cursor/artifacts/lighthouse/`.

## Soft-launch polish included on tip
- Removed unused legacy homepage CSS (~560 lines) from the runtime bundle
- Integrated `@vercel/analytics` (supersedes orphan draft PR #2 for the redesign tip)
- Slimmed Google Fonts weight set
- Analytics `track()` used for pilot submit (no message body)

## Still owner-gated before production
- Product status label confirmation
- Founder bio decision
- Privacy / Terms legal copy
- Explicit production-release instruction
