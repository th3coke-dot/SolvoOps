import type { CinematicExampleKind } from '../content/cinematic'

export function ProductExample({ kind, label }: { kind: CinematicExampleKind; label: string }) {
  return (
    <figure className={`product-example product-example--${kind}`}>
      <figcaption>{label} workspace</figcaption>
      {kind === 'plan' ? <div className="example-plan">
        <div className="example-heading"><span>Transition plan</span><span>W1 · W2 · W3</span></div>
        {[
          ['Scope review', 'PM', '0%', '38%'],
          ['Team readiness', 'SDM', '25%', '46%'],
          ['Service handover', 'Ops', '62%', '38%'],
        ].map(([task, owner, left, width]) => <div className="example-plan__row" key={task}>
          <span>{task}</span><small>{owner}</small><span className="example-plan__track"><i style={{ marginLeft: left, width }} /></span>
        </div>)}
      </div> : kind === 'find' ? <div className="example-find">
        <div className="example-heading"><span>Onsite support</span><span>Nordics</span></div>
        <div className="example-find__row"><span className="example-avatar">A</span><span>Example partner A<small>Oslo · Field services</small></span><span className="example-tag">Shortlisted</span></div>
        <div className="example-find__row"><span className="example-avatar">B</span><span>Example partner B<small>Bergen · IT support</small></span><span className="example-tag example-tag--muted">Review</span></div>
      </div> : <div className="example-bid">
        <div className="example-heading"><span>Tender requirements</span><span>Evidence</span></div>
        <div className="example-bid__row"><span>Service coverage</span><span className="example-tag">Source linked</span></div>
        <div className="example-bid__row"><span>Response times</span><span className="example-tag">Source linked</span></div>
        <div className="example-bid__row"><span>Insurance certificate</span><span className="example-tag example-tag--gold">Needs review</span></div>
      </div>}
    </figure>
  )
}
