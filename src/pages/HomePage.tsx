import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { company, pagesMetadata, primaryProducts } from '../content'
import './HomePage.css'

const workflowSteps = [
  ['01', 'Scope', 'Bring in the brief, SOW or change.'],
  ['02', 'Generate', 'Create the structured delivery package.'],
  ['03', 'Source', 'Match requirements to qualified coverage.'],
  ['04', 'Deliver', 'Execute from one operating model.'],
  ['05', 'Control', 'Map impact and keep outputs aligned.'],
] as const

const frictions = [
  ['01', 'Manual interpretation', 'Teams repeatedly decode the same scopes and rebuild the same documents.'],
  ['02', 'Scattered intelligence', 'Partner knowledge and evidence disappear across searches, files and people.'],
  ['03', 'Uncontrolled change', 'Plans, obligations and ownership drift apart as delivery evolves.'],
] as const

const principles = [
  ['01', 'Domain first', 'Start with the operational problem, not the technology.'],
  ['02', 'Explainable by design', 'Evidence and reasoning stay visible when decisions matter.'],
  ['03', 'Human controlled', 'AI accelerates the work. People own the outcome.'],
  ['04', 'Useful over universal', 'Focused modules complement the stack you already trust.'],
] as const

function Arrow() {
  return (
    <svg
      className="home-arrow"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      focusable="false"
    >
      <path d="M5 15 15 5M8 5h7v7" />
    </svg>
  )
}

function Brand() {
  return (
    <span className="home-brand">
      <span className="home-brand__mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      SolvoOps
    </span>
  )
}

function HomeNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="home-nav-shell">
      <nav className="home-nav home-wrap" aria-label="Primary">
        <Link to="/" aria-label="SolvoOps home" onClick={() => setOpen(false)}>
          <Brand />
        </Link>
        <div
          id="home-mobile-menu"
          className="home-nav__links"
          data-open={open ? 'true' : 'false'}
        >
          <a href="#products" onClick={() => setOpen(false)}>Products</a>
          <a href="#method" onClick={() => setOpen(false)}>How it works</a>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/labs" onClick={() => setOpen(false)}>Labs</Link>
        </div>
        <Link className="home-nav__cta" to="/pilot">
          <span className="home-nav__cta-label home-nav__cta-label--desktop">Discuss a pilot</span>
          <span className="home-nav__cta-label home-nav__cta-label--mobile">Pilot</span>
          <Arrow />
        </Link>
        <button
          className="home-nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="home-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
    </header>
  )
}

function OperationsModel() {
  return (
    <figure className="home-ops" aria-labelledby="delivery-model-caption">
      <figcaption id="delivery-model-caption" className="sr-only">
        Illustrative SolvoOps workflow from customer scope to generated delivery package,
        partner shortlist and controlled change.
      </figcaption>
      <header>
        <span>DELIVERY OS / ILLUSTRATIVE MODEL</span>
        <span className="home-ops__live">● SYNCHRONISED</span>
      </header>
      <div className="home-ops__input">
        <b aria-hidden="true">▤</b>
        <div>
          <small>INPUT</small>
          <strong>Customer SOW</strong>
          <span>Requirements structured</span>
        </div>
        <i aria-hidden="true">✓</i>
      </div>
      <div className="home-ops__connector">STRUCTURE</div>
      <div className="home-ops__modules">
        <article className="home-ops__module home-ops__module--gold">
          <small>SCOPE2PLAN</small>
          <strong>Generate</strong>
          <div className="home-ops__meter" aria-hidden="true"><i /></div>
          <span>Delivery package ready</span>
        </article>
        <article className="home-ops__module">
          <small>PARTNERFORGE</small>
          <strong>Source</strong>
          <div className="home-ops__avatars" aria-hidden="true">
            <i>NL</i><i>DE</i><i>FR</i><i>+8</i>
          </div>
          <span>Qualified coverage ranked</span>
        </article>
        <article className="home-ops__module home-ops__module--wide">
          <small>SCOPE2PLAN</small>
          <strong>Control</strong>
          <div className="home-ops__change">
            <b>v3.2</b><span>Impacts mapped</span><i>Aligned</i>
          </div>
        </article>
      </div>
      <footer>
        <span>ONE STRUCTURED MODEL</span>
        <span>EXPLAINABLE OUTPUTS</span>
        <span>HUMAN APPROVED</span>
      </footer>
    </figure>
  )
}

export function HomePage() {
  const scope2plan = primaryProducts.find((product) => product.id === 'scope2plan')!
  const partnerforge = primaryProducts.find((product) => product.id === 'partnerforge')!

  return (
    <AppShell
      metadata={pagesMetadata.home}
      showPageHeader={false}
      showShellNav={false}
      showShellFooter={false}
      mainClassName="home-redesign"
    >
      <section className="home-hero" id="top" aria-labelledby="home-hero-title">
        <HomeNav />
        <div className="home-hero__grid home-wrap">
          <div className="home-hero__copy">
            <p className="home-eyebrow"><i /> OPERATIONAL SYSTEMS FOR REAL DELIVERY WORK</p>
            <h1 id="home-hero-title">
              Turn operational<br />friction into<br /><em>forward motion.</em>
            </h1>
            <p className="home-hero__lede">
              SolvoOps builds focused software for the moments where complex service delivery
              slows down — planning work, finding partners and controlling change.
            </p>
            <div className="home-actions">
              <a className="home-button home-button--primary" href="#products">
                Explore the products <Arrow />
              </a>
              <a className="home-text-link" href="#method">See the workflow ↓</a>
            </div>
            <div className="home-proof" aria-label="SolvoOps principles">
              <span>Built from real delivery experience</span>
              <span>Human-controlled AI</span>
              <span>Designed in Norway</span>
            </div>
          </div>
          <OperationsModel />
        </div>
        <div className="home-ticker" aria-hidden="true">
          PLAN WITH CLARITY　•　SOURCE WITH EVIDENCE　•　CONTROL WITH CONFIDENCE　•　PLAN WITH CLARITY　•　SOURCE WITH EVIDENCE
        </div>
      </section>

      <section className="home-problem home-wrap" aria-labelledby="problem-title">
        <div className="home-label"><b>01</b> THE PROBLEM</div>
        <div className="home-problem__intro">
          <h2 id="problem-title">Complex work does not fail because people lack effort.</h2>
          <div>
            <h3>It slows down because the system around them is fragmented.</h3>
            <p>Critical knowledge sits in documents, spreadsheets, inboxes and individual heads. Every new project starts with interpretation. Every change creates another version of the truth.</p>
          </div>
        </div>
        <div className="home-frictions">
          {frictions.map(([number, title, body]) => (
            <article key={number}>
              <b>{number}</b><h3>{title}</h3><p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-products" id="products" aria-labelledby="products-title">
        <div className="home-wrap">
          <div className="home-label home-label--light"><b>02</b> THE PRODUCTS</div>
          <div className="home-section-head">
            <h2 id="products-title">Focused tools.<br />One operating logic.</h2>
            <p>Each product solves a specific bottleneck. Together, they create a connected flow from project intake to controlled execution.</p>
          </div>
          <div className="home-product-stack">
            <Link className="home-product home-product--scope" to={scope2plan.route}>
              <b className="home-product__number">01</b>
              <div>
                <small>● {scope2plan.statusLabel.toUpperCase()}</small>
                <h3>{scope2plan.name}</h3>
                <h4>From scope to execution — in minutes.</h4>
                <p>{scope2plan.description}</p>
                <div className="home-chips"><span>Generate</span><span>Control</span><span>Structured model</span></div>
              </div>
              <Arrow />
            </Link>
            <Link className="home-product home-product--partner" to={partnerforge.route}>
              <b className="home-product__number">02</b>
              <div>
                <small>● {partnerforge.statusLabel.toUpperCase()}</small>
                <h3>{partnerforge.name}</h3>
                <h4>Find who can deliver. Know why they fit.</h4>
                <p>{partnerforge.description}</p>
                <div className="home-chips"><span>Discover</span><span>Validate</span><span>Rank</span></div>
              </div>
              <Arrow />
            </Link>
          </div>
          <Link className="home-labs" to="/labs">
            <small>LABS / 03</small>
            <div><strong>Small experiments. Useful outcomes.</strong><p>BizDayz and AutoNameSearch explore adjacent everyday workflows.</p></div>
            <Arrow />
          </Link>
        </div>
      </section>

      <section className="home-workflow home-wrap" id="method" aria-labelledby="workflow-title">
        <div className="home-label"><b>03</b> THE METHOD</div>
        <div className="home-section-head">
          <h2 id="workflow-title">One workflow.<br /><em>Less operational drag.</em></h2>
          <p>The system follows the actual shape of delivery instead of forcing teams into another generic platform.</p>
        </div>
        <ol className="home-track">
          {workflowSteps.map(([number, title, body], index) => (
            <li className={index === 1 || index === 2 || index === 4 ? 'is-active' : ''} key={number}>
              <i aria-hidden="true" /><b>{title}</b><p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-principles" id="principles" aria-labelledby="principles-title">
        <div className="home-wrap home-principles__grid">
          <div>
            <div className="home-label home-label--light"><b>04</b> HOW WE THINK</div>
            <h2 id="principles-title">Built around the workflow.<br /><em>Not the hype.</em></h2>
            <p>Software should remove friction without hiding the reasoning or taking control away from the people responsible for delivery.</p>
          </div>
          <div className="home-principle-list">
            {principles.map(([number, title, body]) => (
              <article key={number}><small>{number}</small><b>{title}</b><p>{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-founder home-wrap" aria-labelledby="founder-title">
        <article className="home-founder__note">
          <span aria-hidden="true">“</span>
          <blockquote id="founder-title">I started building SolvoOps because I kept seeing capable people lose time to systems that made simple work unnecessarily hard.</blockquote>
          <p>SolvoOps is the practical answer: understand the workflow, find the friction, and build the smallest useful system that removes it.</p>
          <div><i aria-hidden="true">MH</i><b>{company.founder.name}<small>{company.founder.role}, SolvoOps</small></b></div>
        </article>
        <article className="home-founder__manifesto">
          <small>THE FOUNDER’S OPERATING PRINCIPLE</small>
          <strong>Work smarter is not a slogan.<br />It is a design requirement.</strong>
        </article>
      </section>

      <section className="home-cta" aria-labelledby="pilot-title">
        <div className="home-wrap">
          <div><small>HAVE A REAL WORKFLOW PROBLEM?</small><h2 id="pilot-title">Bring us the bottleneck.<br /><em>We’ll bring the system.</em></h2></div>
          <Link to="/pilot">Discuss<br />a pilot <Arrow /></Link>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-wrap home-footer__top">
          <Link to="/" aria-label="SolvoOps home"><Brand /></Link>
          <p>Operational systems for complex service delivery.</p>
          <nav aria-label="Footer primary"><Link to="/products">Products</Link><Link to="/how-it-works">Method</Link><Link to="/about">About</Link></nav>
        </div>
        <div className="home-wrap home-footer__bottom">
          <span>© 2026 SOLVOOPS</span><span>BUILT TO MAKE WORK MOVE.</span>
          <nav aria-label="Footer legal"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href="#top">Back to top ↑</a></nav>
        </div>
      </footer>
    </AppShell>
  )
}
