import { AppShell } from '../components/AppShell'
import {
  FeatureCard,
  LinkButton,
  ProductStatusBadge,
  SectionHeader,
  WorkflowSteps,
} from '../components/ui'
import {
  pagesMetadata,
  whoGetsTheCallPage,
} from '../content'
import { trackEvent } from '../lib/analytics'
import './ProductPage.css'

export function WhoGetsTheCallPage() {
  const page = whoGetsTheCallPage

  return (
    <AppShell
      metadata={pagesMetadata.whoGetsTheCall}
      showPageHeader={false}
      mainClassName="product-page product-page--marketplace"
    >
      <section className="container product-hero" aria-labelledby="wgtc-title">
        <div className="product-hero__meta">
          <p className="product-hero__label">{page.eyebrow}</p>
          <ProductStatusBadge status="live" label={page.status} />
        </div>
        <h1 className="product-hero__title" id="wgtc-title">
          {page.headline}
        </h1>
        <p className="product-hero__lede">{page.intro}</p>
        <div className="product-hero__actions">
          <LinkButton
            to={page.primaryCta.href}
            variant="primary"
            onClick={() =>
              trackEvent('who-gets-the-call', {
                placement: 'marketplace-detail',
                action: 'claim-a-lane',
              })
            }
          >
            {page.primaryCta.label}
          </LinkButton>
          <LinkButton
            to={page.secondaryCta.href}
            variant="secondary"
            onClick={() =>
              trackEvent('who-gets-the-call', {
                placement: 'marketplace-detail',
                action: 'explore-map',
              })
            }
          >
            {page.secondaryCta.label}
          </LinkButton>
        </div>
      </section>

      <section className="container product-section" aria-labelledby="wgtc-about">
        <SectionHeader
          label="Marketplace"
          title={page.name}
          copy={page.body[0]}
          id="wgtc-about"
          accent="marketplace"
        />
        <p className="product-value">{page.body[1]}</p>
      </section>

      <section className="container product-section" aria-labelledby="wgtc-lanes">
        <SectionHeader
          label="Commercial lanes"
          title="Four lanes"
          copy={page.laneLine}
          id="wgtc-lanes"
          accent="marketplace"
        />
        <div className="product-capability-grid">
          {page.lanes.map((lane) => (
            <FeatureCard key={lane.name} title={`${lane.name} — ${lane.category}`}>
              One visible sponsorship position per country.
            </FeatureCard>
          ))}
        </div>
      </section>

      <section className="container product-section" aria-labelledby="wgtc-how">
        <SectionHeader
          label="How it works"
          title={page.howItWorks.title}
          id="wgtc-how"
          accent="marketplace"
        />
        <WorkflowSteps steps={[...page.howItWorks.steps]} labelledBy="wgtc-how" />
      </section>

      <section className="container product-section" aria-labelledby="wgtc-providers">
        <SectionHeader
          label="Providers"
          title={page.providers.title}
          copy={page.providers.body}
          id="wgtc-providers"
          accent="marketplace"
        />
      </section>

      <section className="container product-section" aria-labelledby="wgtc-facts">
        <SectionHeader
          label="Product facts"
          title="What this marketplace is"
          id="wgtc-facts"
          accent="marketplace"
        />
        <ul className="product-list">
          {page.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <p className="product-value">{page.ownership}</p>
      </section>
    </AppShell>
  )
}
