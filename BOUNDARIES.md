# Homepage component boundaries

Two agents work the cinematic homepage in parallel on branch
`cursor/cinematic-homepage-20260910-5ee1`. This file records who writes which
file so the two streams do not overwrite each other.

## Scene owner

Owns the landscape, the aurora, and the playback affordances.

| File | Scope |
| --- | --- |
| `src/components/CinematicScene.tsx` | Plate stacking, aurora geometry, `LockedTerrain`, `SceneControl` markup |
| `src/lib/scene-playback.ts` | Playback reducer, timing curves, activation keys |
| `src/lib/scene-policy.ts` | Auto vs static policy |
| `src/lib/scene-playback.test.ts`, `src/lib/scene-policy.test.ts` | Playback and policy tests |
| `public/scene/*.jpg` | Plate artwork |

## Layout owner

Owns everything the visitor reads on the homepage.

| File | Scope |
| --- | --- |
| `src/pages/HomePage.tsx` | Section order, hero markup, product deck, walkthrough |
| `src/pages/HomePage.css` | All homepage styling, including scene positioning |
| `src/content/cinematic.ts` | Hero copy, product deck data, walkthrough data |
| `src/components/ProductExample.tsx` | Card preview illustrations |
| `src/components/CinematicNav.tsx` | Homepage nav |
| `src/prerender/homeSnapshot.ts` | Crawler markup, derived from `cinematic.ts` |

## Shared surface

`src/pages/HomePage.css` styles classes that `CinematicScene.tsx` renders
(`.cinematic-scene__*`). The layout owner writes those rules. The scene owner
changes class names only by editing this table in the same commit.

Scene control placement reads one layout token:

```css
.solvo-cinematic { --deck-lift: 6.5rem; }
```

`--deck-lift` is how far the product deck overlaps the hero. The deck sets
`margin-top: calc(-1 * var(--deck-lift))` and the scene controls sit above it at
`bottom: calc(var(--deck-lift) + 1rem)`. Change the token, not the two rules.

## Invariants

Neither owner breaks these.

- Routes and redirects stay as they are. `/products/scope2plan`,
  `/products/partnerforge`, `/pilot`, `/privacy`, `/terms`, the `?product=`
  query values, and every `public/sitemap.xml` entry are load bearing.
- The logo asset is `public/brand/solvoops-horizontal-dark.png`. Do not
  substitute the thin gold lockup from the concept renders.
- Product previews carry an `Example` caption and no invented numbers.
- `npm run lint`, `npm test`, and `npm run build` pass before every push.
