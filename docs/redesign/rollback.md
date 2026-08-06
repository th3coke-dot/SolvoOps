# Rollback plan — SolvoOps redesign

## Principle
Production (`solvoops.com` / Vercel production deployment for project `solvoops`) must remain on the pre-redesign `main` experience until an **explicit production-release instruction**.

This document covers rollback for preview and for a future production cutover.

---

## A. Preview / stacked PR rollback

| Situation | Action |
|-----------|--------|
| Bad preview on tip of stack | Redeploy previous redesign branch tip; do not promote |
| PR N introduces a regression | Fix forward on that branch, or close PR N+ and retarget dependents |
| Need old marketing copy | Recover from `docs/redesign/content-backup/` |
| Need old hero photography | `docs/redesign/content-backup/assets/hero-ops.jpg` |

Stacked merge order (only when releasing): PR1 → PR12 into `main`, or squash-merge the tip branch after review.

---

## B. Production cutover rollback (post-release only)

**Only relevant after an explicit production promote.**

1. In Vercel → Project `solvoops` → Deployments: promote the previous production deployment (instant rollback).
2. Optionally `git revert` the redesign merge commit(s) on `main` and redeploy.
3. Confirm DNS still points at the Vercel project (no DNS changes were part of redesign PRs).
4. Confirm `solvoops.com` HTML title/description match the restored experience.
5. If indexing changed, re-submit sitemap in Search Console after stabilising.

### What redesign does **not** change
- Domain / DNS records
- External product sites (scope2plan.com, partnerforge, bizdayz, autoname)
- Email address `hello@solvoops.com`

---

## C. Content recovery map

| Area | Backup |
|------|--------|
| Pre-redesign App shell | `docs/redesign/content-backup/App.tsx.pre-redesign` |
| Pre-redesign CSS | `docs/redesign/content-backup/index.css.pre-redesign` |
| Pre-redesign HTML | `docs/redesign/content-backup/index.html.pre-redesign` |
| Audit baselines | `docs/redesign/visual-baseline/`, `seo-baseline.md`, `performance-baseline.md` |
