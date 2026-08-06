import { homepageContent } from '../content/homepage'

/**
 * Illustrative workflow diagram — not a product screenshot.
 * Scope → Plan → Source → Deliver → Control
 */
export function DeliveryWorkflowVisual() {
  const steps = homepageContent.heroFlow
  return (
    <figure className="home-flow" aria-labelledby="home-flow-caption">
      <figcaption id="home-flow-caption" className="sr-only">
        Illustrative delivery workflow: Scope, Plan, Source, Deliver, Control.
      </figcaption>
      <svg
        className="home-flow__svg"
        viewBox="0 0 920 160"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="flow-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#123c34" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#d4a24c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          className="home-flow__path"
          d="M40 72 H880"
          stroke="url(#flow-line)"
          strokeWidth="2"
          fill="none"
        />
        {steps.map((step, index) => {
          const x = 40 + index * 210
          return (
            <g key={step.id} transform={`translate(${x} 36)`}>
              <rect
                width="140"
                height="88"
                rx="6"
                fill="#ffffff"
                stroke="rgba(18,60,52,0.16)"
              />
              <text
                x="70"
                y="40"
                textAnchor="middle"
                fontFamily="Bricolage Grotesque, Georgia, serif"
                fontSize="22"
                fontWeight="700"
                fill="#123c34"
              >
                {step.label}
              </text>
              <text
                x="70"
                y="64"
                textAnchor="middle"
                fontFamily="Source Sans 3, sans-serif"
                fontSize="12"
                fill="#8a6420"
              >
                {step.note}
              </text>
            </g>
          )
        })}
      </svg>
      <ol className="home-flow__mobile">
        {steps.map((step) => (
          <li key={step.id}>
            <strong>{step.label}</strong>
            <span>{step.note}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
