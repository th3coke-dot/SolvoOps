import { useSearchParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PilotForm } from '../components/PilotForm'
import {
  FeatureCard,
  LinkButton,
  ProductCard,
  SectionHeader,
  WorkflowSteps,
} from '../components/ui'
import {
  company,
  labsProducts,
  pagesMetadata,
} from '../content'
import { pilotPageContent } from '../content/pilot'
import './ProductPage.css'

export function HowItWorksPage() {
  return (
    <AppShell
      metadata={pagesMetadata.howItWorks}
      showPageHeader={false}
      mainClassName="product-page"
    >
      <section className="container product-hero" aria-labelledby="hiw-title">
        <p className="product-hero__label">How it works</p>
        <h1 className="product-hero__title" id="hiw-title">
          Turn operational knowledge into repeatable systems
        </h1>
        <p className="product-hero__lede">
          SolvoOps products are built around workflows that are important,
          repetitive and too dependent on fragmented information or individual
          experience.
        </p>
      </section>
      <section className="container product-section" aria-labelledby="hiw-process">
        <SectionHeader label="Process" title="A practical operating rhythm" id="hiw-process" />
        <WorkflowSteps
          labelledBy="hiw-process"
          steps={[
            {
              title: 'Understand the workflow',
              body: 'Identify where time, quality or control is lost.',
            },
            {
              title: 'Structure the information',
              body: 'Convert documents, searches and decisions into usable operational data.',
            },
            {
              title: 'Apply focused intelligence',
              body: 'Use deterministic logic, AI and evidence where each provides the most value.',
            },
            {
              title: 'Keep humans in control',
              body: 'Important recommendations and changes remain reviewable and traceable.',
            },
            {
              title: 'Connect with existing systems',
              body: 'Fit the product into the organisation’s delivery environment without forcing a complete platform replacement.',
            },
            {
              title: 'Measure the result',
              body: 'Evaluate time saved, quality improvements, reduced rework and better operational control.',
            },
          ]}
        />
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton to="/products" variant="secondary">
            Explore products
          </LinkButton>
        </p>
      </section>
    </AppShell>
  )
}

export function AboutPage() {
  return (
    <AppShell
      metadata={pagesMetadata.about}
      showPageHeader={false}
      mainClassName="product-page"
    >
      <section className="container product-hero" aria-labelledby="about-title">
        <p className="product-hero__label">About</p>
        <h1 className="product-hero__title" id="about-title">
          Built from real operational problems
        </h1>
        <p className="product-hero__lede">
          SolvoOps was created from firsthand experience with the operational
          challenges faced by service-delivery teams. Too much valuable time is
          still spent interpreting scopes, recreating project documentation,
          searching repeatedly for delivery capability and maintaining
          disconnected records as projects change.
        </p>
        <p className="product-hero__lede">
          SolvoOps develops focused software products that turn these
          knowledge-dependent workflows into structured, repeatable systems.
        </p>
      </section>
      <section className="container product-section" aria-labelledby="mission-title">
        <SectionHeader
          label="Mission"
          title={company.mission}
          id="mission-title"
        />
        <SectionHeader
          label="Product philosophy"
          title="Automation with accountability"
          copy="We do not add AI to a workflow simply because it is available. We use automation, structured data and AI where they can improve speed, consistency and decision quality without removing human accountability."
        />
        <p>
          Founder biography is intentionally omitted until approved factual copy
          is provided. Verified themes that may appear later include service
          delivery, operational workflows, project planning, partner sourcing and
          building focused software tools.
        </p>
        <div className="product-capability-grid" style={{ marginTop: 'var(--space-7)' }}>
          {company.pillars.map((pillar) => (
            <FeatureCard key={pillar.id} title={pillar.title}>
              {pillar.body}
            </FeatureCard>
          ))}
        </div>
      </section>
    </AppShell>
  )
}

export function LabsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.labs}
      showPageHeader={false}
      mainClassName="product-page"
    >
      <section className="container product-hero" aria-labelledby="labs-title">
        <p className="product-hero__label">SolvoOps Labs</p>
        <h1 className="product-hero__title" id="labs-title">
          SolvoOps Labs
        </h1>
        <p className="product-hero__lede">
          Smaller tools and experiments used to explore new workflows,
          technologies and product ideas. Labs remains visually and strategically
          secondary to Scope2Plan and PartnerForge.
        </p>
      </section>
      <section className="container product-section">
        {labsProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            ctaLabel="Open"
            preferInternalRoute={false}
          />
        ))}
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton to="/products" variant="secondary">
            Primary products
          </LinkButton>
        </p>
      </section>
    </AppShell>
  )
}

export function PilotPage() {
  const [params] = useSearchParams()
  const product = params.get('product')

  return (
    <AppShell
      metadata={pagesMetadata.pilot}
      showPageHeader={false}
      mainClassName="product-page"
    >
      <section className="container product-hero" aria-labelledby="pilot-title">
        <p className="product-hero__label">{pilotPageContent.label}</p>
        <h1 className="product-hero__title" id="pilot-title">
          {pilotPageContent.title}
        </h1>
        <p className="product-hero__lede">{pilotPageContent.lede}</p>
      </section>
      <section
        className="container product-section"
        aria-labelledby="pilot-options"
      >
        <SectionHeader
          label="Options"
          title="Choose a starting point"
          id="pilot-options"
        />
        <div className="product-capability-grid">
          {pilotPageContent.options.map((option) => (
            <FeatureCard key={option.id} title={option.title}>
              {option.body}
            </FeatureCard>
          ))}
        </div>
      </section>
      <section
        className="container product-section"
        aria-labelledby="pilot-form-heading"
      >
        <SectionHeader
          label="Request"
          title="Request a pilot conversation"
          id="pilot-form-heading"
          copy="No file uploads. No new database. Email remains the delivery channel."
        />
        <PilotForm initialProduct={product} />
      </section>
    </AppShell>
  )
}

export function PrivacyPage() {
  return (
    <AppShell
      metadata={pagesMetadata.privacy}
      eyebrow="Legal"
      title="Privacy"
      copy="Placeholder privacy page. Full policy copy will be added with legal review before production release."
    >
      <p>
        Contact:{' '}
        <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
      </p>
    </AppShell>
  )
}

export function TermsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.terms}
      eyebrow="Legal"
      title="Terms"
      copy="Placeholder terms page. Full terms will be added with legal review before production release."
    >
      <p>
        Contact:{' '}
        <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
      </p>
    </AppShell>
  )
}

export function NotFoundPage() {
  return (
    <AppShell
      metadata={pagesMetadata.notFound}
      eyebrow="404"
      title="Page not found"
      copy="The page you requested is not available."
    >
      <p style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <LinkButton to="/" variant="secondary">
          Back to home
        </LinkButton>
        <LinkButton to="/products" variant="primary">
          Products
        </LinkButton>
      </p>
    </AppShell>
  )
}
