import { Link } from 'react-router-dom'
import { DocumentMeta } from '../components/DocumentMeta'
import { pagesMetadata } from '../content'
import './HomePage.css'

const Arrow = () => <span aria-hidden="true">↗</span>

export function HomePage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.home} />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main className="concept-home" id="main-content">
        <section className="concept-hero" id="top">
          <nav className="concept-nav concept-wrap" aria-label="Primary navigation">
            <Link className="concept-brand" to="/" aria-label="SolvoOps home">
              <b aria-hidden="true"><i /><i /><i /></b>
              SolvoOps
            </Link>
            <div className="concept-navlinks">
              <a href="#products">Products</a>
              <a href="#method">How it works</a>
              <a href="#principles">Principles</a>
            </div>
            <Link className="concept-navcta" to="/pilot">
              Discuss a pilot <Arrow />
            </Link>
          </nav>

          <div className="concept-hero-grid concept-wrap">
            <div className="concept-hero-copy">
              <small><i /> OPERATIONAL SYSTEMS FOR REAL DELIVERY WORK</small>
              <h1>
                Turn operational<br />friction into<br />
                <em>forward motion.</em>
              </h1>
              <p>
                SolvoOps builds focused software for the moments where complex
                service delivery slows down — planning work, finding partners and
                controlling change.
              </p>
              <div className="concept-actions">
                <a className="concept-primary" href="#products">
                  Explore the products <Arrow />
                </a>
                <a href="#method">See the workflow ↓</a>
              </div>
              <div className="concept-proof" aria-label="Product principles">
                <span>Built from real delivery experience</span>
                <span>Human-controlled AI</span>
                <span>Designed in Norway</span>
              </div>
            </div>

            <div className="concept-ops" aria-label="SolvoOps live delivery model">
              <header>
                <span>DELIVERY OS / LIVE MODEL</span>
                <span className="concept-live">● SYNCHRONISED</span>
              </header>
              <div className="concept-input">
                <b aria-hidden="true">▤</b>
                <div>
                  <small>INPUT</small>
                  <strong>Customer SOW</strong>
                  <span>124 requirements detected</span>
                </div>
                <i aria-hidden="true">✓</i>
              </div>
              <div className="concept-connector">STRUCTURE</div>
              <div className="concept-modules">
                <article className="concept-module-gold">
                  <small>SCOPE2PLAN</small>
                  <strong>Generate</strong>
                  <div className="concept-meter"><i /></div>
                  <span>Delivery package ready</span>
                </article>
                <article>
                  <small>PARTNERFORGE</small>
                  <strong>Source</strong>
                  <div className="concept-avatars" aria-label="Coverage in the Netherlands, Germany, France and eight more markets">
                    <i>NL</i><i>DE</i><i>FR</i><i>+8</i>
                  </div>
                  <span>11 qualified partners</span>
                </article>
                <article className="concept-module-wide">
                  <small>SCOPE2PLAN</small>
                  <strong>Control</strong>
                  <div className="concept-change">
                    <b>v3.2</b><span>4 impacts mapped</span><i>Aligned</i>
                  </div>
                </article>
              </div>
              <footer>
                <span>ONE STRUCTURED MODEL</span>
                <span>EXPLAINABLE OUTPUTS</span>
                <span>HUMAN APPROVED</span>
              </footer>
            </div>
          </div>
          <div className="concept-ticker" aria-hidden="true">
            PLAN WITH CLARITY　•　SOURCE WITH EVIDENCE　•　CONTROL WITH CONFIDENCE　•　PLAN WITH CLARITY　•　SOURCE WITH EVIDENCE
          </div>
        </section>

        <section className="concept-problem concept-wrap">
          <div className="concept-label"><b>01</b> THE PROBLEM</div>
          <div className="concept-problem-grid">
            <h2>Complex work does not fail because people lack effort.</h2>
            <div>
              <h3>It slows down because the system around them is fragmented.</h3>
              <p>
                Critical knowledge sits in documents, spreadsheets, inboxes and
                individual heads. Every new project starts with interpretation.
                Every change creates another version of the truth.
              </p>
            </div>
          </div>
          <div className="concept-frictions">
            {[
              ['01', 'Manual interpretation', 'Teams repeatedly decode the same scopes and rebuild the same documents.'],
              ['02', 'Scattered intelligence', 'Partner knowledge and evidence disappear across searches, files and people.'],
              ['03', 'Uncontrolled change', 'Plans, obligations and ownership drift apart as delivery evolves.'],
            ].map(([number, title, copy]) => (
              <article key={number}>
                <b>{number}</b><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="concept-products" id="products">
          <div className="concept-wrap">
            <div className="concept-label concept-label-light"><b>02</b> THE PRODUCTS</div>
            <div className="concept-section-head">
              <h2>Focused tools.<br />One operating logic.</h2>
              <p>
                Each product solves a specific bottleneck. Together, they create a
                connected flow from project intake to controlled execution.
              </p>
            </div>
            <div className="concept-product-stack">
              <Link className="concept-product concept-product-gold" to="/products/scope2plan">
                <b className="concept-num">01</b>
                <div>
                  <small>● PILOT</small>
                  <h3>Scope2Plan</h3>
                  <h4>From scope to execution — in minutes.</h4>
                  <p>
                    Generate delivery-ready plans, runbooks and transition packs.
                    Then keep obligations, risks and responsibilities aligned as
                    the project changes.
                  </p>
                  <div className="concept-chips"><span>Generate</span><span>Control</span><span>Structured model</span></div>
                </div>
                <Arrow />
              </Link>
              <Link className="concept-product concept-product-teal" to="/products/partnerforge">
                <b className="concept-num">02</b>
                <div>
                  <small>● PRIVATE PREVIEW</small>
                  <h3>PartnerForge</h3>
                  <h4>Find who can deliver. Know why they fit.</h4>
                  <p>
                    Turn project requirements into ranked partner shortlists with
                    geographic coverage, evidence-backed profiles and explainable scoring.
                  </p>
                  <div className="concept-chips"><span>Discover</span><span>Validate</span><span>Rank</span></div>
                </div>
                <Arrow />
              </Link>
            </div>
            <Link className="concept-labs" to="/labs">
              <small>LABS / 03</small>
              <div>
                <strong>Small experiments. Useful outcomes.</strong>
                <p>BizDayz and AutoNameSearch explore adjacent everyday workflows.</p>
              </div>
              <Arrow />
            </Link>
          </div>
        </section>

        <section className="concept-principles" id="principles">
          <div className="concept-wrap concept-principles-grid">
            <div>
              <div className="concept-label concept-label-light"><b>04</b> HOW WE THINK</div>
              <h2>Built around the workflow.<br /><em>Not the hype.</em></h2>
              <p>
                Software should remove friction without hiding the reasoning or
                taking control away from the people responsible for delivery.
              </p>
            </div>
            <div className="concept-principle-list">
              {[
                ['01', 'Domain first', 'Start with the operational problem, not the technology.'],
                ['02', 'Explainable by design', 'Evidence and reasoning stay visible when decisions matter.'],
                ['03', 'Human controlled', 'AI accelerates the work. People own the outcome.'],
                ['04', 'Useful over universal', 'Focused modules complement the stack you already trust.'],
              ].map(([number, title, copy]) => (
                <article key={number}><small>{number}</small><b>{title}</b><p>{copy}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="concept-founder concept-wrap">
          <article className="concept-note">
            <span aria-hidden="true">“</span>
            <blockquote>
              I started building SolvoOps because I kept seeing capable people
              lose time to systems that made simple work unnecessarily hard.
            </blockquote>
            <p>
              SolvoOps is the practical answer: understand the workflow, find the
              friction, and build the smallest useful system that removes it.
            </p>
            <div><i>MH</i><b>Morten <small>Founder, SolvoOps</small></b></div>
          </article>
          <article className="concept-manifesto">
            <small>THE FOUNDER&apos;S OPERATING PRINCIPLE</small>
            <strong>Work smarter is not a slogan.<br />It is a design requirement.</strong>
          </article>
        </section>

        <section className="concept-cta">
          <div className="concept-wrap">
            <div>
              <small>HAVE A REAL WORKFLOW PROBLEM?</small>
              <h2>Bring us the bottleneck.<br /><em>We&apos;ll bring the system.</em></h2>
            </div>
            <Link to="/pilot">Discuss<br />a pilot <Arrow /></Link>
          </div>
        </section>

        <footer className="concept-footer">
          <div className="concept-wrap concept-footer-top">
            <Link className="concept-brand" to="/" aria-label="SolvoOps home">
              <b aria-hidden="true"><i /><i /><i /></b>SolvoOps
            </Link>
            <p>Operational systems for complex service delivery.</p>
            <nav aria-label="Footer navigation">
              <a href="#products">Products</a><a href="#method">Method</a><Link to="/about">About</Link>
            </nav>
          </div>
          <div className="concept-wrap concept-footer-bottom">
            <span>© 2026 SOLVOOPS</span><span>BUILT TO MAKE WORK MOVE.</span><a href="#top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </main>
    </>
  )
}
