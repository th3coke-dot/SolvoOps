# Cinematic homepage — implementation notes

## Shipped

- Marketing homepage rebuilt around a locked Nordic fjord scene.
- Primary product names on this page are SolvoPlan, SolvoFind, and SolvoBid.
- Existing routes stay in place: SolvoPlan → `/products/scope2plan`, SolvoFind → `/products/partnerforge`, SolvoBid → `/pilot?product=solvobid`.
- Original `public/brand` logo PNGs and favicon are unchanged. Hashes are asserted in `src/lib/brand-assets.test.ts`.
- Scene tokens live under `.solvo-cinematic` in `src/styles/tokens.css`.
- Playback is a state machine (`src/lib/scene-playback.ts`) with Pause, Resume, Replay, reduced-motion / save-data static poster, hidden / off-screen suspend, and no auto-resume after a user pause.

## Motion assets

- Sunset, dusk, and blue-hour posters are generated stills of the same coastline (`public/scene/*.jpg`, each under 350KB).
- A generated aurora still drifted off that ridgeline, so it was not used as a crossfade plate.
- Night is a grade plus a CSS aurora overlay on the locked fjord. There is no WebM or MP4 in this tip.
- Geometry is locked by keeping the sunset plate as the structural photograph and fading later plates / overlays over it.

## Explicitly not shipped

- A finished 20–30s encoded video under 4MB.
- Pixel-identical aurora terrain from the concept frames (those frames were reference only and do not share one coastline).
- Renames of Scope2Plan / PartnerForge on product, nav, or footer pages outside the homepage primary section.
- Production deploy or merge.
