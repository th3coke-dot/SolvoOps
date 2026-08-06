# Preview deployment workflow — SolvoOps

## Existing setup

| Item | Value |
|------|--------|
| Host | Vercel |
| Team | `biz-days` |
| Project | `solvoops` |
| GitHub repo | `th3coke-dot/SolvoOps` |
| Production branch | `main` |
| Production domains | `solvoops.com`, `www.solvoops.com` (redirect), `solvoops.vercel.app` |

Vercel is connected to the GitHub repository. Pushing a branch / opening a PR creates a **preview deployment** for that commit. Merging to `main` triggers **production**.

`vercel.json` now configures SPA rewrites (excluding SEO static files), security headers, and asset caching.

- Framework: Vite
- Build command: `npm run build`
- Output: `dist`

---

## Rules for the redesign programme

1. All redesign work ships via feature branches + pull requests.
2. Review on the **preview URL** attached to the PR.
3. **Do not** promote redesign deployments to production until PR 12 review + a separate explicit production-release instruction.
4. **Do not** modify DNS.
5. **Do not** create a second Vercel project unless explicitly approved.
6. Preview / development builds emit `noindex, nofollow` via `DocumentMeta` + `shouldNoIndex()`.

---

## How to verify a preview (operators)

1. Push branch to GitHub.
2. Open / update the PR.
3. Wait for Vercel check / preview comment.
4. Open the preview URL (not `solvoops.com`).
5. Confirm production (`https://solvoops.com`) still serves the pre-redesign experience until release.
6. Follow the QA script in [`preview-release-package.md`](./preview-release-package.md).

### Local equivalent

```bash
npm ci
npm run build
npm run preview
```

---

## Rollback (hosting)

- Vercel → Project → Deployments → promote previous production deployment.
- Or revert the GitHub merge commit on `main` and redeploy.

Detailed redesign rollback notes: [`rollback.md`](./rollback.md).  
Production cutover checklist (gated): [`release-checklist.md`](./release-checklist.md).

---

## Related

- [`preview-release-package.md`](./preview-release-package.md) — soft-launch / preview package
- [`a11y-checklist.md`](./a11y-checklist.md)
- [`pr12-implementation-notes.md`](./pr12-implementation-notes.md)
