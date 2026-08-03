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
          <a className="nav__link" href="#contact">
            Contact
          </a>
        </nav>

        <div className="hero__content" id="top">
          <p className="brand">SolvoOps</p>
          <h1 className="hero__headline">Tools that clear the path for work.</h1>
          <p className="hero__lede">
            We build software that removes friction from day-to-day operations
            so teams move faster with fewer handoffs.
          </p>
          <div className="cta-row">
            <a className="btn btn--primary" href="#contact">
              Start a conversation
            </a>
            <a className="btn btn--ghost" href="#approach">
              See how we work
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section promise" aria-labelledby="promise-title">
          <div>
            <p className="section__label">What we build</p>
            <h2 className="section__title" id="promise-title">
              Operations software with a single job: keep work flowing.
            </h2>
            <p className="section__copy">
              SolvoOps designs focused tools for the people who run the floor —
              scheduling, handoffs, status, and decisions — without burying
              teams in another sprawling platform.
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
              Every engagement starts on the ground, not in a feature backlog.
            </p>
            <div className="method__grid">
              <article className="method__item">
                <h3>Map the real flow</h3>
                <p>
                  We watch how work actually moves — delays, rework, and the
                  quiet workarounds people invent to stay on schedule.
                </p>
              </article>
              <article className="method__item">
                <h3>Ship a sharp tool</h3>
                <p>
                  We build the smallest useful system that removes the
                  bottleneck, with interfaces operators can trust under pressure.
                </p>
              </article>
              <article className="method__item">
                <h3>Lock in the rhythm</h3>
                <p>
                  We tune alerts, handoffs, and reporting so the new process
                  sticks after the rollout excitement fades.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section audience" aria-labelledby="audience-title">
          <div>
            <p className="section__label">Who it&apos;s for</p>
            <h2 className="section__title" id="audience-title">
              Built for teams that measure the day in throughput.
            </h2>
            <p className="section__copy">
              If your operation depends on timing, visibility, and clean
              handoffs, SolvoOps is built for your floor.
            </p>
          </div>
          <ul className="audience__list">
            <li>Operations and plant leadership</li>
            <li>Logistics and fulfillment teams</li>
            <li>Field service coordinators</li>
            <li>Founders scaling internal process</li>
          </ul>
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
                Share the operation you run and the friction you feel. We&apos;ll
                reply with a clear read on whether SolvoOps can help — and how
                we&apos;d start.
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
        <span>Tools that make operations efficient.</span>
      </footer>
    </div>
  )
}

export default App
