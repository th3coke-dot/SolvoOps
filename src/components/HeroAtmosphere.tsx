/**
 * Full-bleed atmospheric hero plane — not a product UI mock, not inset cards.
 * Suggests operational structure: routes, nodes, delivery coverage.
 */
export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <svg
        className="hero-atmosphere__svg"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="ha-wash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#123c34" stopOpacity="0.07" />
            <stop offset="45%" stopColor="#d4a24c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="ha-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#123c34" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#d4a24c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="ha-glow" cx="72%" cy="38%" r="45%">
            <stop offset="0%" stopColor="#d4a24c" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#d4a24c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="720" fill="url(#ha-wash)" />
        <rect width="1440" height="720" fill="url(#ha-glow)" />
        {/* Delivery mesh */}
        <g className="hero-atmosphere__mesh" fill="none" stroke="url(#ha-line)" strokeWidth="1.25">
          <path d="M-40 520 C240 420, 420 610, 720 480 S1180 320, 1500 410" />
          <path d="M-20 180 C300 260, 520 80, 780 200 S1200 340, 1480 220" />
          <path d="M120 700 C360 560, 640 640, 900 520 S1280 400, 1520 560" />
        </g>
        <g className="hero-atmosphere__nodes" fill="#123c34">
          <circle className="hero-atmosphere__node" cx="220" cy="470" r="5" opacity="0.45" />
          <circle className="hero-atmosphere__node" cx="520" cy="530" r="4" opacity="0.35" />
          <circle className="hero-atmosphere__node hero-atmosphere__node--signal" cx="780" cy="200" r="6" fill="#d4a24c" opacity="0.85" />
          <circle className="hero-atmosphere__node" cx="980" cy="470" r="5" opacity="0.4" />
          <circle className="hero-atmosphere__node" cx="1180" cy="360" r="4" opacity="0.35" />
          <circle className="hero-atmosphere__node" cx="1320" cy="520" r="5" opacity="0.3" />
        </g>
        {/* Soft horizon band */}
        <path
          d="M0 560 Q360 500 720 540 T1440 500 L1440 720 L0 720 Z"
          fill="#123c34"
          opacity="0.04"
        />
      </svg>
    </div>
  )
}
