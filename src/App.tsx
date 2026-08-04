import { Analytics } from '@vercel/analytics/react'

const products = [
  {
    name: 'Scope2Plan',
    href: 'https://scope2plan.com',
    bottleneck: 'Delivery planning from SOWs',
    summary:
      'Turn a Statement of Work into a project plan, runbook, and transition pack in minutes — structured for real delivery, not workshop theatre.',
  },
  {
    name: 'BizDayz',
    href: 'https://www.bizdayz.com',
    bottleneck: 'Working-day and payroll math',
    summary:
      'Norwegian working days, public holidays, holiday pay, and employer cost — clear answers for planning and payroll without spreadsheet archaeology.',
  },
  {
    name: 'PartnerForge',
    href: 'https://partnerforge.vercel.app',
    bottleneck: 'Finding the right delivery partners',
    summary:
      'Natural-language partner discovery for European field service — AI ranking and validated rate benchmarks so the right crew surfaces first.',
  },
  {
    name: 'AutoName',
    href: 'https://www.autoname.pro',
    bottleneck: 'Naming without the guesswork',
    summary:
      'A systematic naming pipeline: phonetic generation, domain checks, brand collision search, and ranked shortlists built for enterprise feel.',
  },
] as const

function App() {
  return (
    <div className="site">
      <header className="hero">
        <div className="hero__media" aria-hidden="true">
          <img
            src="/hero-ops.jpg"
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div className="hero__shade" />
        </div>

        <nav className="nav" aria-label="Primary">
          <a className="nav__mark" href="#top">
            SolvoOps
          </a>
          <a className="nav__link" href="#work">
            Work
          </a>
        </nav>

        <div className="hero__content" id="top">
          <p className="brand">SolvoOps</p>
          <h1 className="hero__headline">
            Tools that break operational bottlenecks.
          </h1>
          <p className="hero__lede">
            SolvoOps builds focused software that helps companies find where
            work stalls — and clear the path so delivery can move again.
          </p>
          <div className="cta-row">
            <a className="btn btn--primary" href="#work">
              See the tools
            </a>
            <a className="btn btn--ghost" href="#contact">
              Talk about a bottleneck
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section promise" aria-labelledby="promise-title">
          <div>
            <p className="section__label">The company</p>
            <h2 className="section__title" id="promise-title">
              One job: solve the friction that slows operations.
            </h2>
            <p className="section__copy">
              We do not ship another sprawling platform. We build sharp tools
              aimed at a specific bottleneck — planning, partnering, payroll
              timing, naming — so teams spend less time fighting process and
              more time delivering.
            </p>
          </div>
          <div className="promise__visual" aria-hidden="true">
            <div className="promise__track" />
            <div className="promise__nodes">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="promise__pulse" />
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section">
            <p className="section__label">Demonstrated work</p>
            <h2 className="section__title" id="work-title">
              Four tools. Four bottlenecks. Same craft.
            </h2>
            <p className="section__copy">
              Live products that show how SolvoOps approaches operational
              friction — find the stall, build the lever, put it in people&apos;s
              hands.
            </p>

            <ul className="product-list">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    className="product-link"
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="product-link__meta">
                      <span className="product-link__name">{product.name}</span>
                      <span className="product-link__bottleneck">
                        {product.bottleneck}
                      </span>
                    </div>
                    <p className="product-link__summary">{product.summary}</p>
                    <span className="product-link__cta" aria-hidden="true">
                      Open
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="method"
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className="section">
            <p className="section__label">How we work</p>
            <h2 className="section__title" id="approach-title">
              Find the bottleneck. Build the lever. Ship the habit.
            </h2>
            <p className="section__copy">
              Every engagement starts with the stall — not a feature wishlist.
            </p>
            <div className="method__grid">
              <article className="method__item">
                <h3>Map the stall</h3>
                <p>
                  We look at how work actually moves: handoffs, rework, waiting
                  time, and the quiet workarounds teams invent to stay on
                  schedule.
                </p>
              </article>
              <article className="method__item">
                <h3>Ship a sharp tool</h3>
                <p>
                  We build the smallest useful system that removes that
                  bottleneck — scoped tightly enough to trust on a busy day.
                </p>
              </article>
              <article className="method__item">
                <h3>Prove it in use</h3>
                <p>
                  We put the tool in the real flow, tune what sticks, and leave
                  teams with a clearer rhythm than they started with.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section closing"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="closing__panel">
            <div>
              <p className="section__label">Next step</p>
              <h2 className="section__title" id="contact-title">
                Tell us where work gets stuck.
              </h2>
              <p className="section__copy">
                Share the bottleneck you are living with. We will come back with
                a clear read on whether a SolvoOps tool is the right next move —
                and how we would start.
              </p>
            </div>
            <a className="btn btn--ink" href="mailto:hello@solvoops.com">
              Email hello@solvoops.com
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <strong>SolvoOps</strong>
        <span>Tools that solve operational bottlenecks.</span>
      </footer>
      <Analytics />
    </div>
  )
}

export default App
