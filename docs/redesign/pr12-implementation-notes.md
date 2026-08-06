# PR 12 — Preview release package / soft-launch prep

## Delivered
- `preview-release-package.md` — stack map, preview QA script, soft-launch readiness
- `release-checklist.md` — production cutover steps (**gated on explicit instruction**)
- `rollback.md` — preview and post-release rollback
- `merge-path.md` — how to land the stack on `main` after approval
- Updated `preview-workflow.md` / README pointers
- Soft-launch polish on tip: drop unused legacy CSS, integrate `@vercel/analytics`, slim fonts
- `preview-qa-results.md` — visual QA + Lighthouse gates
- Draft Privacy / Terms pages (explicitly marked as drafts pending counsel)

## Explicitly not delivered
- No production merge
- No Vercel Production promote
- No DNS changes

## Analytics note
Draft PR #2 targets the pre-redesign branch. Analytics is now on the redesign tip — close PR #2 without merging that old branch.

## Next human action
1. Review tip preview: https://solvoops-git-cursor-solvoops-preview-release-2034-biz-days.vercel.app
2. Confirm remaining owner-gated items (product status labels, counsel review of legal drafts)
3. When satisfied, issue an **explicit production-release instruction** before any promote
