/**
 * Illustrative Scope2Plan package composition — not a product screenshot.
 */
export function Scope2PlanProofVisual() {
  const docs = [
    'Project plan',
    'WBS / packages',
    'RACI',
    'Risk register',
    'Runbook',
    'Transition pack',
  ]
  return (
    <figure className="product-proof product-proof--scope2plan" aria-labelledby="s2p-proof-caption">
      <figcaption id="s2p-proof-caption" className="sr-only">
        Illustrative flow from customer scope into a structured project package.
      </figcaption>
      <div className="product-proof__rail" aria-hidden="true">
        <div className="product-proof__source">
          <span className="product-proof__kicker">Input</span>
          <strong>Customer scope / SOW</strong>
        </div>
        <div className="product-proof__arrow" />
        <div className="product-proof__engine">
          <span className="product-proof__kicker">Generate</span>
          <strong>Structured project model</strong>
        </div>
        <div className="product-proof__arrow" />
        <ul className="product-proof__stack">
          {docs.map((doc, index) => (
            <li key={doc} style={{ ['--i' as string]: index }}>
              {doc}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

/**
 * Illustrative PartnerForge ranking / evidence sketch — not a live UI.
 */
export function PartnerForgeProofVisual() {
  const rows = [
    { name: 'Regional field partner', score: '92', evidence: 'Geo · Capability · Reviews' },
    { name: 'Specialist contractor', score: '87', evidence: 'Evidence pack · Rate band' },
    { name: 'Multi-country network', score: '81', evidence: 'Coverage · References' },
  ]
  return (
    <figure className="product-proof product-proof--partnerforge" aria-labelledby="pf-proof-caption">
      <figcaption id="pf-proof-caption" className="sr-only">
        Illustrative ranked partner shortlist with evidence signals.
      </figcaption>
      <div className="product-proof__board" aria-hidden="true">
        <div className="product-proof__board-head">
          <span>Requirement → ranked shortlist</span>
          <span>Explainable score</span>
        </div>
        <ul className="product-proof__rows">
          {rows.map((row, index) => (
            <li key={row.name} style={{ ['--i' as string]: index }}>
              <span className="product-proof__rank">{index + 1}</span>
              <div>
                <strong>{row.name}</strong>
                <small>{row.evidence}</small>
              </div>
              <span className="product-proof__score">{row.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
