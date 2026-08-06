# Production release checklist — SolvoOps redesign

**Production release instruction received:** 2026-08-06 — promote redesign tip (including design polish) to production. Legal drafts and product statuses accepted as-is.

## Pre-merge
- [x] Tip of redesign stack reviewed (design polish on `cursor/solvoops-design-polish-2034`)
- [x] Preview QA completed; owner approved design (“looks great”)
- [x] Product status enum confirmed by owner (pilot / private-preview / planned labels)
- [x] External product URLs still correct
- [x] Founder / about facts approved and published on `/about`
- [x] Privacy and Terms accepted as temporary drafts pending counsel
- [x] Close draft PR #2 (Vercel Analytics on old branch) — analytics already on redesign tip
- [x] Rollback plan acknowledged (`rollback.md`)
- [x] Merge path: Option A — merge tip (`cursor/solvoops-design-polish-2034`) to `main`

## Merge
- [x] Merge tip branch to `main`
- [x] Confirm CI / Vercel production build from `main` succeeds
- [x] Confirm Production deployment serves `solvoops.com`

## Post-promote verification
- [x] `https://solvoops.com` shows redesign homepage title/positioning
- [x] `/robots.txt` and `/sitemap.xml` serve correctly
- [x] Production pages are `index, follow` (not preview noindex) — no `x-robots-tag` on apex
- [x] Pilot form mailto reaches `hello@solvoops.com` (form still mailto-based)
- [x] Spot-check key routes return 200 (`/`, `/products/scope2plan`, `/pilot`, `/about`)
- [x] Keep previous production deployment available for instant Vercel rollback (prior Vercel deploy retained)

## Abort
If anything material fails post-promote: use Vercel instant rollback to the previous production deployment, then follow `rollback.md`.
