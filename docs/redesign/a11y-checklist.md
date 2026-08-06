# Accessibility checklist — SolvoOps redesign

Use before production cutover.

## Landmarks and structure
- [x] Skip link to `#main-content`
- [x] Single `<main>` per page via `AppShell`
- [x] Page titles unique via `pagesMetadata`
- [x] Decorative vs informative media labelled

## Navigation
- [x] Desktop Products disclosure: `aria-expanded` / Escape / outside click
- [x] Mobile menu toggle label changes Open/Close
- [x] Closed mobile panel marked `inert` + `aria-hidden`
- [x] Focus-visible outline on interactive controls

## Forms (`/pilot`)
- [x] Visible labels associated with controls
- [x] Required fields indicated
- [x] Errors linked with `aria-describedby` / `aria-invalid`
- [x] Honeypot removed from accessibility tree
- [x] No file upload control

## Motion
- [x] `prefers-reduced-motion` collapses duration tokens and hero animations

## Colour
- [x] Brand pine / amber retained; danger state uses token
- [ ] Spot-check contrast on amber primary buttons (dark text on amber) in preview QA

## Keyboard
- [ ] Tab order through header → main → footer
- [ ] Pilot form validation returns focus to first invalid field
- [ ] Dropdown / mobile menu operable without pointer
