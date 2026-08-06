/**
 * Illustrative Scope2Plan Generate package composition — not a product screenshot.
 */
export function Scope2PlanProofVisual() {
  const docs = [
    'Project plan',
    'Runbook / SOP',
    'Transition pack',
    'RACI & milestones',
    'RAID register',
    'Governance pack',
  ]
  return (
    <figure className="product-proof product-proof--scope2plan" aria-labelledby="s2p-proof-caption">
      <figcaption id="s2p-proof-caption" className="sr-only">
        Illustrative Scope2Plan Generate flow from SOW into a delivery package.
      </figcaption>
      <div className="product-proof__rail" aria-hidden="true">
        <div className="product-proof__source">
          <span className="product-proof__kicker">Input</span>
          <strong>SOW / project brief</strong>
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
    {
      name: 'Onboarded regional partner',
      score: '94',
      evidence: 'Network · Geo fit · Evidence pack',
    },
    {
      name: 'Specialist field contractor',
      score: '88',
      evidence: 'Capability · Distance · References',
    },
    {
      name: 'Multi-country delivery network',
      score: '83',
      evidence: 'Reach · Coverage · Provenance',
    },
  ]
  return (
    <figure className="product-proof product-proof--partnerforge" aria-labelledby="pf-proof-caption">
      <figcaption id="pf-proof-caption" className="sr-only">
        Illustrative PartnerForge flow from requirement or project document to ranked shortlist.
      </figcaption>
      <div className="product-proof__board" aria-hidden="true">
        <div className="product-proof__board-head">
          <span>Search · filters · or project document</span>
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
