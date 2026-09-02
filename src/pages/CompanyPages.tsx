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
import { EditorialHeading } from '../components/ui/EditorialHeading'
import {
  company,
  companyPageContent,
  labsProducts,
  pagesMetadata,
} from '../content'
import {
  legalDraftNotice,
  privacyPageContent,
  termsPageContent,
} from '../content/legal'
import { pilotPageContent } from '../content/pilot'
import './ProductPage.css'

export function HowItWorksPage() {
  return (
    <AppShell
      metadata={pagesMetadata.howItWorks}
      showPageHeader={false}
      mainClassName="product-page product-page--method"
    >
      <section className="container product-hero" aria-labelledby="hiw-title">
        <p className="product-hero__label">How it works</p>
        <h1 className="product-hero__title" id="hiw-title">
          <EditorialHeading
            text="Turn operational knowledge into repeatable systems"
            accent="repeatable systems"
          />
        </h1>
        <p className="product-hero__lede">
          SolvoOps products are built around workflows that are important,
          repetitive and too dependent on fragmented information or individual
          experience.
        </p>
      </section>
      <section className="container product-section" aria-labelledby="hiw-process">
        <SectionHeader
          label="Process"
          title="A practical operating rhythm"
          editorialAccent="operating rhythm"
          id="hiw-process"
        />
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
      mainClassName="product-page product-page--about"
    >
      <section className="container product-hero" aria-labelledby="about-title">
        <p className="product-hero__label">About</p>
        <h1 className="product-hero__title" id="about-title">
          <EditorialHeading
            text="Built from real operational problems"
            accent="operational problems"
          />
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
      <section
        className="container product-section"
        aria-labelledby="founder-title"
      >
        <SectionHeader
          label="Founder"
          title={company.founder.role}
          copy={company.founder.summary}
          id="founder-title"
        />
        <div className="about-founder">
          {company.founder.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="about-founder__p">
              {paragraph}
            </p>
          ))}
          <blockquote className="about-founder__mission">
            <strong>The mission is simple</strong>
            {company.founderMission}
          </blockquote>
        </div>
      </section>
      <section className="container product-section" aria-labelledby="mission-title">
        <SectionHeader
          label="Company mission"
          title={company.mission}
          editorialAccent="easier to control"
          id="mission-title"
        />
        <SectionHeader
          label="Product philosophy"
          title="Automation with accountability"
          editorialAccent="with accountability"
          copy="We do not add AI to a workflow simply because it is available. We use automation, structured data and AI where they can improve speed, consistency and decision quality without removing human accountability."
        />
        <div className="product-capability-grid" style={{ marginTop: 'var(--space-7)' }}>
          {company.pillars.map((pillar) => (
            <FeatureCard key={pillar.id} title={pillar.title}>
              {pillar.body}
            </FeatureCard>
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton to="/company" variant="secondary">
            Company and legal identity
          </LinkButton>
        </p>
      </section>
    </AppShell>
  )
}

export function CompanyPage() {
  return (
    <AppShell
      metadata={pagesMetadata.company}
      showPageHeader={false}
      mainClassName="product-page product-page--about"
    >
      <section className="container product-hero" aria-labelledby="company-title">
        <p className="product-hero__label">{companyPageContent.label}</p>
        <h1 className="product-hero__title" id="company-title">
          <EditorialHeading
            text={companyPageContent.title}
            accent={companyPageContent.titleAccent}
          />
        </h1>
        <p className="product-hero__lede">{companyPageContent.lede}</p>
        <p className="product-hero__lede">{companyPageContent.secondaryLede}</p>
        <div className="product-hero__actions">
          <LinkButton to="/pilot" variant="ink">
            Discuss a pilot
          </LinkButton>
          <LinkButton to="/about" variant="secondary">
            About the founder
          </LinkButton>
        </div>
      </section>
      <section
        className="container product-section"
        aria-labelledby="company-identity"
      >
        <SectionHeader
          label={companyPageContent.identity.label}
          title={companyPageContent.identity.title}
          editorialAccent={companyPageContent.identity.titleAccent}
          id="company-identity"
        />
        <div className="product-capability-grid">
          {companyPageContent.identity.facts.map((fact) => (
            <FeatureCard key={fact.id} title={fact.title}>
              {fact.body}
            </FeatureCard>
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton
            to={company.operator.registryLookupUrl}
            variant="secondary"
          >
            Look up org.nr. {company.operator.organizationNumberLabel}
          </LinkButton>
        </p>
      </section>
      <section
        className="container product-section"
        aria-labelledby="company-engage"
      >
        <SectionHeader
          label={companyPageContent.engage.label}
          title={companyPageContent.engage.title}
          editorialAccent={companyPageContent.engage.titleAccent}
          copy={companyPageContent.engage.copy}
          id="company-engage"
        />
        <div className="product-capability-grid">
          {companyPageContent.engage.options.map((option) => (
            <FeatureCard key={option.id} title={option.title}>
              {option.body}
            </FeatureCard>
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton to="/pilot" variant="ink">
            Request a pilot conversation
          </LinkButton>
        </p>
      </section>
      <section
        className="container product-section"
        aria-labelledby="company-documents"
      >
        <SectionHeader
          label={companyPageContent.documents.label}
          title={companyPageContent.documents.title}
          editorialAccent={companyPageContent.documents.titleAccent}
          copy={companyPageContent.documents.copy}
          id="company-documents"
        />
        <div className="product-hero__actions">
          <LinkButton to="/privacy" variant="secondary">
            Privacy
          </LinkButton>
          <LinkButton to="/terms" variant="secondary">
            Terms
          </LinkButton>
          <LinkButton to="/about" variant="secondary">
            About
          </LinkButton>
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
      mainClassName="product-page product-page--labs"
    >
      <section className="container product-hero" aria-labelledby="labs-title">
        <p className="product-hero__label">SolvoOps Labs</p>
        <h1 className="product-hero__title" id="labs-title">
          <EditorialHeading text="SolvoOps Labs" accent="Labs" />
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
      mainClassName="product-page product-page--pilot"
    >
      <section className="container product-hero" aria-labelledby="pilot-title">
        <p className="product-hero__label">{pilotPageContent.label}</p>
        <h1 className="product-hero__title" id="pilot-title">
          <EditorialHeading text={pilotPageContent.title} accent="real workflow" />
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
          editorialAccent="starting point"
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
          editorialAccent="pilot conversation"
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
      showPageHeader={false}
      mainClassName="product-page product-page--legal"
    >
      <section className="container product-hero" aria-labelledby="privacy-title">
        <p className="product-hero__label">{privacyPageContent.label}</p>
        <h1 className="product-hero__title" id="privacy-title">
          {privacyPageContent.title}
        </h1>
        <p className="product-hero__lede">{privacyPageContent.lede}</p>
        <p className="product-hero__lede" role="note">
          {legalDraftNotice}
        </p>
      </section>
      <section className="container product-section" aria-label="Privacy details">
        <div className="product-capability-grid">
          {privacyPageContent.sections.map((section) => (
            <FeatureCard key={section.title} title={section.title}>
              {section.body}
            </FeatureCard>
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton to={`mailto:${company.contactEmail}`} variant="secondary">
            Email {company.contactEmail}
          </LinkButton>
        </p>
      </section>
    </AppShell>
  )
}

export function TermsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.terms}
      showPageHeader={false}
      mainClassName="product-page product-page--legal"
    >
      <section className="container product-hero" aria-labelledby="terms-title">
        <p className="product-hero__label">{termsPageContent.label}</p>
        <h1 className="product-hero__title" id="terms-title">
          {termsPageContent.title}
        </h1>
        <p className="product-hero__lede">{termsPageContent.lede}</p>
        <p className="product-hero__lede" role="note">
          {legalDraftNotice}
        </p>
      </section>
      <section className="container product-section" aria-label="Terms details">
        <div className="product-capability-grid">
          {termsPageContent.sections.map((section) => (
            <FeatureCard key={section.title} title={section.title}>
              {section.body}
            </FeatureCard>
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton to={`mailto:${company.contactEmail}`} variant="secondary">
            Email {company.contactEmail}
          </LinkButton>
        </p>
      </section>
    </AppShell>
  )
}

export function NotFoundPage() {
  return (
    <AppShell
      metadata={pagesMetadata.notFound}
      showPageHeader={false}
      mainClassName="product-page product-page--not-found"
    >
      <section className="container product-hero" aria-labelledby="not-found-title">
        <p className="product-hero__label">404</p>
        <h1 className="product-hero__title" id="not-found-title">
          Page not found
        </h1>
        <p className="product-hero__lede">
          The page you requested is not available. It may have moved during the
          SolvoOps site redesign.
        </p>
        <div className="product-hero__actions">
          <LinkButton to="/" variant="ink">
            Back to home
          </LinkButton>
          <LinkButton to="/products" variant="secondary">
            Products
          </LinkButton>
          <LinkButton to="/pilot" variant="secondary">
            Discuss a pilot
          </LinkButton>
        </div>
      </section>
    </AppShell>
  )
}
