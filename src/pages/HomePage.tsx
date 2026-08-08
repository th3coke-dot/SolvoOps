import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { HeroAtmosphere } from '../components/HeroAtmosphere'
import { LinkButton } from '../components/ui'
import { company, homepageContent, pagesMetadata, primaryProducts } from '../content'
import './HomePage.css'

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
      mainClassName="home-redesign"
      shellTone="light-landing"
    >
      <section className="home-hero" id="top" aria-labelledby="home-hero-title">
        <HeroAtmosphere />
        <div className="home-hero__content container">
          <p className="home-hero__eyebrow reveal">{homepageContent.eyebrow}</p>
          <p className="home-hero__brand reveal reveal--delay-1">{company.name}</p>
          <h1 className="home-hero__title reveal reveal--delay-2" id="home-hero-title">
            {homepageContent.headline}
          </h1>
          <p className="home-hero__lede reveal reveal--delay-3">{homepageContent.lede}</p>
          <div className="home-hero__actions reveal reveal--delay-4">
            <LinkButton to={homepageContent.primaryCta.href} variant="primary">
              {homepageContent.primaryCta.label}
            </LinkButton>
            <LinkButton to={homepageContent.secondaryCta.href} variant="ink">
              {homepageContent.secondaryCta.label}
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="home-illustration" aria-label="Illustrative SolvoOps delivery model">
        <div className="home-wrap">
          <div className="delivery-os" aria-label="Delivery OS live model">
            <header><span>DELIVERY OS / LIVE MODEL</span><span className="delivery-os__live">● SYNCHRONISED</span></header>
            <div className="delivery-os__input"><b aria-hidden="true">▤</b><div><small>INPUT</small><strong>Customer SOW</strong><span>124 requirements detected</span></div><i aria-hidden="true">✓</i></div>
            <div className="delivery-os__connector">STRUCTURE</div>
            <div className="delivery-os__modules">
              <article className="delivery-os__module--generate"><small>SCOPE2PLAN</small><strong>Generate</strong><div className="delivery-os__meter"><i /></div><span>Delivery package ready</span></article>
              <article><small>PARTNERFORGE</small><strong>Source</strong><div className="delivery-os__markets" aria-label="Coverage in the Netherlands, Germany, France and eight more markets"><i>NL</i><i>DE</i><i>FR</i><b>+8</b></div><span>11 qualified partners</span></article>
              <article className="delivery-os__module--control"><small>SCOPE2PLAN</small><strong>Control</strong><div className="delivery-os__control"><b>v3.2</b><span>4 impacts mapped</span><em>Aligned</em></div></article>
            </div>
            <footer><span>ONE STRUCTURED MODEL</span><span>EXPLAINABLE OUTPUTS</span><span>HUMAN APPROVED</span></footer>
          </div>
        </div>
        <p>Source with evidence <span>•</span> Control with confidence <span>•</span> Plan with clarity</p>
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

      <section className="home-principles" id="principles" aria-labelledby="principles-title"><div className="home-wrap home-principles__grid"><div><p className="home-label">04 / HOW WE THINK</p><h2 id="principles-title">Built around the workflow.<br />Not the hype.</h2><p>Software should remove friction without hiding the reasoning or taking control away from the people responsible for delivery.</p></div><div className="home-principle-list">{principles.map(([title, body], index) => <article key={title}><small>0{index + 1}</small><b>{title}</b><p>{body}</p></article>)}</div></div></section>

      <section className="home-founder home-wrap" aria-labelledby="founder-title">
        <article className="home-founder__statement">
          <span>“</span>
          <h2 id="founder-title">I started building SolvoOps because I kept seeing capable people lose time to systems that made simple work unnecessarily hard.</h2>
          <p>SolvoOps is the practical answer: understand the workflow, find the friction, and build the smallest useful system that removes it.</p>
          <strong>{company.founder.name}<small>{company.founder.role}, SolvoOps</small></strong>
        </article>
      </section>
      <section className="home-operating"><div className="home-wrap"><p>THE FOUNDER’S OPERATING PRINCIPLE</p><h2>Work smarter is not a slogan.<br />It is a design requirement.</h2></div></section>
      <section className="home-cta"><div className="home-wrap"><div><p>HAVE A REAL WORKFLOW PROBLEM?</p><h2>Bring us the bottleneck.<em>We’ll bring the system.</em></h2></div><Link to="/pilot">Discuss<br />a pilot <Arrow /></Link></div></section>
    </AppShell>
  )
}
