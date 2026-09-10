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

Two layout tokens govern the vertical composition:

```css
.solvo-cinematic {
  --deck-reserve: 14.5rem;
  --deck-lift: 7rem;
}
```

`--deck-reserve` is the band the hero gives back at the bottom of the viewport.
`--deck-lift` is how far the product deck climbs into it. Tune the fold with
these two, not with hard-coded heights.

Scene controls are anchored to the top of the hero and own their own
`z-index`. They no longer read either token. The layout owner does not move
them. If a future deck change puts content under them, raise `--deck-reserve`
rather than repositioning the controls.

The controls share the top band with the open mobile menu, so the layout owner
hides them for that one state and nothing else:

```css
.cinematic-nav:has(.cinematic-nav__mobile[data-open='true'])
  ~ .cinematic-hero
  .cinematic-scene__controls {
  visibility: hidden;
}
```

Keep the mobile menu panel and the controls out of each other's way. If the
scene owner moves the controls out of the top band, delete this rule.

## Invariants

Neither owner breaks these.

- Routes and redirects stay as they are. `/products/scope2plan`,
  `/products/partnerforge`, `/pilot`, `/privacy`, `/terms`, the `?product=`
  query values, and every `public/sitemap.xml` entry are load bearing.
- The logo asset is `public/brand/solvoops-horizontal-dark.png`. Do not
  substitute the thin gold lockup from the concept renders.
- Product previews carry an `Example` caption and no invented numbers.
- `npm run lint`, `npm test`, and `npm run build` pass before every push.
