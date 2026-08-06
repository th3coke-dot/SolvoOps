# PR 3 implementation notes — design system

## Objective

Create the visual foundations and reusable components for the SolvoOps redesign **without** redesigning the homepage (PR 5) or finalising the global shell behaviour (PR 4 continues nav/footer integration polish).

## Branch

`cursor/solvoops-design-system-2034`  
Stacked on `cursor/solvoops-information-architecture-2034` (PR 2).

## Dependencies

- PR 1 audit docs
- PR 2 content model + routes
- Existing brand assets: favicon SVG, pine/amber palette, Bricolage + Source Sans fonts

## Risks

1. Homepage still uses legacy CSS classes — intentional until PR 5.
2. SiteNav/SiteFooter ship here but full shell acceptance continues in PR 4.
3. `/design-system` is an internal noindex preview route — keep out of primary nav.
4. Product accents are directional CSS tokens, not a logo replacement.
5. Status colours are supplemented with visible text labels (not colour-only).

## What was implemented

### Tokens
- `src/styles/tokens.css` — colour, type, space, radius, shadow, motion, layout
- `src/styles/base.css` — global base + containers + skip-link + focus-visible
- `src/styles/tokens.ts` — TS mirror + contrast notes + accent helpers

### Components (`src/components/ui/`)
- Button / LinkButton
- Badge / ProductStatusBadge
- SectionHeader
- ProductCard
- FeatureCard
- WorkflowSteps
- CtaPanel
- SiteNav (desktop + accessible mobile menu)
- SiteFooter

### Integration
- `AppShell` wraps IA pages with skip-link, SiteNav, SectionHeader, SiteFooter
- Homepage remains the legacy marketing composition
- `/design-system` preview page for component review
- Favicon / logo mark unchanged

## Files created / modified

### Created
- `src/styles/tokens.css`, `base.css`, `tokens.ts`, `design-system.test.ts`
- `src/components/ui/*`
- `src/components/AppShell.tsx`
- `src/pages/DesignSystemPage.tsx`
- `docs/redesign/pr3-implementation-notes.md`

### Modified
- `src/main.tsx` — import base + ui styles
- `src/index.css` — homepage-only styles (globals moved)
- `src/App.tsx` — `/design-system` route
- `src/pages/CompanyPages.tsx` — use AppShell + DS components
- `src/pages/ProductsPage.tsx`, `ProductDetailPages.tsx` — re-exports

### Removed
- `PlaceholderLayout.tsx` / `.css` (replaced by AppShell)

## Architectural decisions

- Preserve existing brand colours and fonts as the system source of truth.
- Use restrained radius/shadow; no neon / multi-layer glow.
- Product accents: Scope2Plan blue-violet, PartnerForge teal, Labs neutral.
- No Storybook — repo has none; `/design-system` preview is sufficient.
- Reduced motion respected via token duration collapse + component CSS.

## Environment changes

None. No DNS. No production promotion.

## Rollback

Revert this PR. Homepage legacy CSS remains independently recoverable from `docs/redesign/content-backup/`.

## Checks

- `npm run lint`
- `npm run test`
- `npm run build`
- Visual: `/` legacy homepage; `/design-system` and `/products` use DS components

## Recommend next PR

**PR 4 — Global shell, navigation and footer**  
Branch: `cursor/solvoops-global-shell-2034`  
Polish active states, Products dropdown/disclosure, and shell behaviour across pages — still without homepage redesign.
