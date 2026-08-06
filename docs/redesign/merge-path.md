# Merge path — SolvoOps redesign stack

**Do not merge or promote to production without an explicit production-release instruction.**

## Recommended approach (after release approval)

### Option A — Merge tip only (simplest)

1. Open tip PR [#14](https://github.com/th3coke-dot/SolvoOps/pull/14) (`cursor/solvoops-preview-release-2034`).
2. Change its base branch from the previous stack branch to **`main`**.
3. Resolve any conflicts (should be rare if `main` was not edited in parallel).
4. Convert from draft → ready, review, merge (squash or merge commit per repo preference).
5. Confirm Vercel production build from `main`.
6. Only then assign/promote that deployment as Production if Vercel did not auto-promote.

### Option B — Merge stacked PRs in order

Merge GitHub PRs **#3 → #14** in ascending order, each into its base, until `main` contains the tip. Slower; use only if you want per-PR history on `main`.

| Package | GitHub | Branch |
|---------|--------|--------|
| PR1 Audit | #3 | `cursor/solvoops-site-audit-2034` |
| PR2 IA | #4 | `cursor/solvoops-information-architecture-2034` |
| PR3 Design system | #5 | `cursor/solvoops-design-system-2034` |
| PR4 Shell | #6 | `cursor/solvoops-global-shell-2034` |
| PR5 Home | #7 | `cursor/solvoops-homepage-redesign-2034` |
| PR6 Scope2Plan | #8 | `cursor/solvoops-scope2plan-page-2034` |
| PR7 PartnerForge | #9 | `cursor/solvoops-partnerforge-page-2034` |
| PR8 Company | #10 | `cursor/solvoops-company-pages-2034` |
| PR9 Pilot | #11 | `cursor/solvoops-pilot-form-2034` |
| PR10 SEO | #12 | `cursor/solvoops-seo-metadata-2034` |
| PR11 A11y/perf | #13 | `cursor/solvoops-a11y-perf-2034` |
| PR12 Release package | #14 | `cursor/solvoops-preview-release-2034` |

## Related draft to close (do not merge)

- [PR #2](https://github.com/th3coke-dot/SolvoOps/pull/2) — Vercel Analytics on the **pre-redesign** branch. Analytics is already on the redesign tip. **Close PR #2** without merging to avoid duplicate/conflicted `App.tsx` history.

## After merge

Follow `release-checklist.md` post-promote verification and keep the previous Vercel production deployment available for instant rollback (`rollback.md`).
