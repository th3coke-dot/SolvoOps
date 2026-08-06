import { homepageContent } from '../content/homepage'

/**
 * Connected-workflow diagram for below-the-fold use — continuous process,
 * not a hero card strip.
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
        viewBox="0 0 1000 120"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="flow-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#123c34" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#d4a24c" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          className="home-flow__path"
          d="M40 48 H960"
          stroke="url(#flow-line)"
          strokeWidth="2.5"
          fill="none"
        />
        {steps.map((step, index) => {
          const x = 40 + index * 230
          const isProduct = step.id === 'plan' || step.id === 'source' || step.id === 'control'
          return (
            <g key={step.id} className="home-flow__step" transform={`translate(${x} 0)`}>
              <circle
                cx="0"
                cy="48"
                r="7"
                fill={isProduct ? '#d4a24c' : '#123c34'}
                opacity={isProduct ? 1 : 0.55}
              />
              <text
                x="0"
                y="84"
                textAnchor="middle"
                fontFamily="Bricolage Grotesque, Georgia, serif"
                fontSize="20"
                fontWeight="700"
                fill="#123c34"
              >
                {step.label}
              </text>
              <text
                x="0"
                y="106"
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
