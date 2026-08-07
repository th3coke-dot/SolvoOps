import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { company, pagesMetadata, primaryProducts } from '../content'
import heroImage from '../../docs/redesign/content-backup/assets/hero-ops.jpg'
import './HomePage.css'

const workflowSteps = [
  ['Scope', 'Bring in the brief, SOW or change.'],
  ['Generate', 'Create the structured delivery package.'],
  ['Source', 'Match requirements to qualified coverage.'],
  ['Deliver', 'Execute from one operating model.'],
  ['Control', 'Map impact and keep outputs aligned.'],
] as const

const frictions = [
  ['Manual interpretation', 'Teams repeatedly decode the same scopes and rebuild the same documents.'],
  ['Scattered intelligence', 'Partner knowledge and evidence disappear across searches, files and people.'],
  ['Uncontrolled change', 'Plans, obligations and ownership drift apart as delivery evolves.'],
] as const

const principles = [
  ['Domain first', 'Start with the operational problem, not the technology.'],
  ['Explainable by design', 'Evidence and reasoning stay visible when decisions matter.'],
  ['Human controlled', 'AI accelerates the work. People own the outcome.'],
  ['Useful over universal', 'Focused modules complement the stack you already trust.'],
] as const

function Arrow() {
  return <svg className="home-arrow" aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M5 15 15 5M8 5h7v7" /></svg>
}

export function HomePage() {
  const scope2plan = primaryProducts.find((product) => product.id === 'scope2plan')!
  const partnerforge = primaryProducts.find((product) => product.id === 'partnerforge')!

  return (
    <AppShell
      metadata={pagesMetadata.home}
      showPageHeader={false}
      showShellNav={false}
      mainClassName="home-redesign"
    >
      <section className="home-hero" id="top" aria-labelledby="home-hero-title">
        <div className="home-hero__media" aria-hidden="true">
          <img src={heroImage} alt="" width={1536} height={1024} fetchPriority="high" />
          <div className="home-hero__shade" />
        </div>
        <nav className="home-hero__nav" aria-label="Primary navigation">
          <Link className="home-hero__mark" to="/">SolvoOps</Link>
          <a className="home-hero__work-link" href="#products">Work</a>
        </nav>
        <div className="home-hero__content">
          <p className="home-hero__brand">SolvoOps</p>
          <h1 className="home-hero__title" id="home-hero-title">Tools that break operational bottlenecks.</h1>
          <p className="home-hero__lede">SolvoOps builds focused software that helps companies find where work stalls — and clear the path so delivery can move again.</p>
          <div className="home-hero__actions">
            <a className="home-hero__button home-hero__button--primary" href="#products">See the tools</a>
            <Link className="home-hero__button home-hero__button--ghost" to="/pilot">Talk about a bottleneck</Link>
          </div>
        </div>
      </section>

      <section className="home-problem home-wrap" aria-labelledby="problem-title">
        <p className="home-label">01 / THE PROBLEM</p>
        <div className="home-problem__intro"><h2 id="problem-title">Complex work does not fail because people lack effort.</h2><div><h3>It slows down because the system around them is fragmented.</h3><p>Critical knowledge sits in documents, spreadsheets, inboxes and individual heads. Every new project starts with interpretation. Every change creates another version of the truth.</p></div></div>
        <div className="home-frictions">{frictions.map(([title, body], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="home-products" id="products" aria-labelledby="products-title"><div className="home-wrap">
        <p className="home-label">02 / THE PRODUCTS</p>
        <div className="home-section-head"><h2 id="products-title">Focused tools.<br />One operating logic.</h2><p>Each product solves a specific bottleneck. Together, they create a connected flow from project intake to controlled execution.</p></div>
        <div className="home-product-stack">
          <Link className="home-product home-product--scope" to={scope2plan.route}><b>01</b><div><small>{scope2plan.statusLabel}</small><h3>{scope2plan.name}</h3><h4>From scope to execution — in minutes.</h4><p>{scope2plan.description}</p><span>Generate · Control · Structured model</span></div><Arrow /></Link>
          <Link className="home-product home-product--partner" to={partnerforge.route}><b>02</b><div><small>{partnerforge.statusLabel}</small><h3>{partnerforge.name}</h3><h4>Find who can deliver. Know why they fit.</h4><p>{partnerforge.description}</p><span>Discover · Validate · Rank</span></div><Arrow /></Link>
        </div>
        <Link className="home-labs" to="/labs"><small>LABS</small><div><strong>Small experiments. Useful outcomes.</strong><p>BizDayz and AutoNameSearch explore adjacent everyday workflows.</p></div><Arrow /></Link>
      </div></section>

      <section className="home-workflow home-wrap" id="method" aria-labelledby="workflow-title">
        <p className="home-label">03 / THE METHOD</p><div className="home-section-head"><h2 id="workflow-title">One delivery workflow.<br />Specialised modules.</h2><p>The system follows the actual shape of delivery instead of forcing teams into another generic platform.</p></div>
        <ol className="home-track">{workflowSteps.map(([title, body], index) => <li className={index === 1 || index === 2 || index === 4 ? 'is-active' : ''} key={title}><i /><b>{title}</b><p>{body}</p></li>)}</ol>
      </section>

      <section className="home-principles" id="principles" aria-labelledby="principles-title"><div className="home-wrap home-principles__grid"><div><p className="home-label">04 / HOW WE THINK</p><h2 id="principles-title">Built around the workflow.<br />Not the hype.</h2><p>Software should remove friction without hiding the reasoning or taking control away from the people responsible for delivery.</p></div><div className="home-principle-list">{principles.map(([title, body], index) => <article key={title}><small>0{index + 1}</small><b>{title}</b><p>{body}</p></article>)}</div></div></section>

      <section className="home-founder home-wrap" aria-labelledby="founder-title"><article><p className="home-label">THE FOUNDER</p><h2 id="founder-title">Work smarter is not a slogan. It is a design requirement.</h2><p>SolvoOps starts with the real workflow, then builds the smallest useful system that removes the friction.</p><strong>{company.founder.name}, {company.founder.role}</strong></article><Link className="home-founder__cta" to="/about">More about SolvoOps <Arrow /></Link></section>
      <section className="home-cta"><div className="home-wrap"><div><p>HAVE A REAL WORKFLOW PROBLEM?</p><h2>Bring us the bottleneck.</h2></div><Link to="/pilot">Discuss a pilot <Arrow /></Link></div></section>
    </AppShell>
  )
}
