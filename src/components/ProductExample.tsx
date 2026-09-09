import type { CinematicExampleKind } from '../content/cinematic'

type ProductExampleProps = {
  kind: CinematicExampleKind
  label: string
}

export function ProductExample({ kind, label }: ProductExampleProps) {
  return (
    <figure className={`product-example product-example--${kind}`}>
      <figcaption>{label}</figcaption>
      {kind === 'plan' ? <PlanExample /> : null}
      {kind === 'find' ? <FindExample /> : null}
      {kind === 'bid' ? <BidExample /> : null}
    </figure>
  )
}

function PlanExample() {
  return (
    <svg viewBox="0 0 320 148" role="img" aria-label="Example plan with tasks and a milestone bar">
      <rect width="320" height="148" rx="8" fill="rgba(7,25,29,0.35)" />
      <text x="16" y="28" fill="#c5d4cf" fontSize="10" letterSpacing="1.4">
        TASKS
      </text>
      <rect x="16" y="40" width="88" height="10" rx="2" fill="rgba(246,250,247,0.82)" />
      <rect x="112" y="40" width="54" height="10" rx="2" fill="rgba(212,162,76,0.85)" />
      <rect x="16" y="62" width="72" height="10" rx="2" fill="rgba(246,250,247,0.55)" />
      <rect x="96" y="62" width="96" height="10" rx="2" fill="rgba(121,220,211,0.55)" />
      <rect x="16" y="84" width="64" height="10" rx="2" fill="rgba(246,250,247,0.4)" />
      <rect x="88" y="84" width="70" height="10" rx="2" fill="rgba(212,162,76,0.45)" />
      <rect x="16" y="118" width="288" height="6" rx="3" fill="rgba(246,250,247,0.12)" />
      <rect x="16" y="118" width="168" height="6" rx="3" fill="#d4a24c" />
    </svg>
  )
}

function FindExample() {
  return (
    <svg viewBox="0 0 320 148" role="img" aria-label="Example partner map with connected nodes">
      <rect width="320" height="148" rx="8" fill="rgba(7,25,29,0.35)" />
      <path
        d="M40 110 C90 70 140 120 180 64 S260 40 292 78"
        fill="none"
        stroke="rgba(121,220,211,0.45)"
        strokeWidth="1.4"
      />
      <circle cx="58" cy="98" r="5" fill="#d4a24c" />
      <circle cx="148" cy="86" r="4" fill="#79dcd3" />
      <circle cx="214" cy="58" r="5" fill="#f6faf7" />
      <circle cx="276" cy="74" r="4" fill="#79dcd3" />
      <text x="16" y="28" fill="#c5d4cf" fontSize="10" letterSpacing="1.4">
        PARTNERS
      </text>
    </svg>
  )
}

function BidExample() {
  return (
    <svg viewBox="0 0 320 148" role="img" aria-label="Example tender requirements list">
      <rect width="320" height="148" rx="8" fill="rgba(7,25,29,0.35)" />
      <text x="16" y="28" fill="#c5d4cf" fontSize="10" letterSpacing="1.4">
        REQUIREMENTS
      </text>
      <rect x="16" y="42" width="200" height="8" rx="2" fill="rgba(246,250,247,0.7)" />
      <rect x="16" y="62" width="168" height="8" rx="2" fill="rgba(246,250,247,0.45)" />
      <rect x="16" y="82" width="188" height="8" rx="2" fill="rgba(246,250,247,0.32)" />
      <circle cx="292" cy="46" r="6" fill="none" stroke="#79dcd3" strokeWidth="1.6" />
      <circle cx="292" cy="66" r="6" fill="none" stroke="#d4a24c" strokeWidth="1.6" />
      <circle cx="292" cy="86" r="6" fill="none" stroke="rgba(197,212,207,0.6)" strokeWidth="1.6" />
    </svg>
  )
}
