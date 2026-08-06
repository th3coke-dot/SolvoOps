# Production release checklist — SolvoOps redesign

**Do not execute this checklist until you receive an explicit production-release instruction.**

## Pre-merge
- [ ] Tip of redesign stack reviewed (`cursor/solvoops-preview-release-2034` or equivalent)
- [ ] Preview QA script completed (`preview-release-package.md`)
- [ ] Product status enum confirmed (pilot / private-preview / planned labels)
- [ ] External product URLs still correct
- [ ] Privacy and Terms copy approved (or accepted as temporary placeholders)
- [ ] Founder / about facts approved or still intentionally omitted
- [ ] Coordinate or close draft PR #2 (Vercel Analytics) so events do not double-fire
- [ ] Rollback plan acknowledged (`rollback.md`)

## Merge
- [ ] Merge stacked PRs in order **or** merge tip branch to `main` after rebase/squash agreement
- [ ] Confirm CI / Vercel production build from `main` succeeds
- [ ] **Only then** assign/promote the new deployment as Production in Vercel

## Post-promote verification
- [ ] `https://solvoops.com` shows redesign homepage title/positioning
- [ ] `/robots.txt` and `/sitemap.xml` serve correctly
- [ ] Production pages are `index, follow` (not preview noindex)
- [ ] Pilot form mailto reaches `hello@solvoops.com`
- [ ] Spot-check Scope2Plan + PartnerForge pages on mobile
- [ ] Submit sitemap if using Search Console
- [ ] Keep previous production deployment available for instant Vercel rollback

## Abort
If anything material fails post-promote: use Vercel instant rollback to the previous production deployment, then follow `rollback.md`.
