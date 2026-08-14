import { AppShell } from '../components/AppShell'
import { PartnerForgeProofVisual } from '../components/ProductProofVisuals'
import {
  CtaPanel,
  FeatureCard,
  LinkButton,
  ProductStatusBadge,
  SectionHeader,
  WorkflowSteps,
} from '../components/ui'
import { EditorialHeading } from '../components/ui/EditorialHeading'
import {
  getProductById,
  pagesMetadata,
  partnerforgePage,
} from '../content'
import './ProductPage.css'

export function PartnerForgePage() {
  const product = getProductById('partnerforge')
  const page = partnerforgePage
  if (!product) return null

  return (
    <AppShell
      metadata={pagesMetadata.partnerforge}
      showPageHeader={false}
      mainClassName="product-page product-page--partnerforge"
    >
      <section className="container product-hero" aria-labelledby="pf-title">
        <div className="product-hero__meta">
          <p className="product-hero__label">{page.label}</p>
          <ProductStatusBadge status={product.status} />
        </div>
        <h1 className="product-hero__title" id="pf-title">
          <EditorialHeading text={page.headline} accent="ranked shortlists" />
        </h1>
        <p className="product-hero__lede">{page.lede}</p>
        <div className="product-hero__actions">
          <LinkButton to={page.primaryCta.href} variant="primary">
            {page.primaryCta.label}
          </LinkButton>
          <LinkButton to={page.secondaryCta.href} variant="secondary">
            {page.secondaryCta.label}
          </LinkButton>
        </div>
      </section>

      <section className="container product-section" aria-labelledby="pf-problem">
        <SectionHeader
          label="The sourcing problem"
          title={page.problem.title}
          editorialAccent="individual memory"
          copy={page.problem.body}
          id="pf-problem"
          accent="partnerforge"
        />
        <PartnerForgeProofVisual />
      </section>

      <section className="container product-section" aria-labelledby="pf-coverage">
        <SectionHeader
          label="Coverage"
          title={page.coverage.title}
          editorialAccent="delivery coverage"
          copy={page.coverage.body}
          id="pf-coverage"
          accent="partnerforge"
        />
        <ul className="product-list">
          {page.coverage.regions.map((region) => (
            <li key={region}>{region}</li>
          ))}
        </ul>
      </section>

      <section className="container product-section" aria-labelledby="pf-flow">
        <SectionHeader
          label="Workflow"
          title="From requirement to ranked shortlist"
          editorialAccent="ranked shortlist"
          id="pf-flow"
          accent="partnerforge"
        />
        <WorkflowSteps steps={[...page.workflow]} labelledBy="pf-flow" />
      </section>

      <section className="container product-section" aria-labelledby="pf-caps">
        <SectionHeader
          label="Capabilities"
          title="Structured partner intelligence"
          editorialAccent="partner intelligence"
          id="pf-caps"
          accent="partnerforge"
        />
        <div className="product-capability-grid">
          {page.capabilities.map((item) => (
            <FeatureCard key={item.title} title={item.title}>
              {item.body}
            </FeatureCard>
          ))}
        </div>
        <div className="product-capability-grid" style={{ marginTop: 'var(--space-7)' }}>
          <FeatureCard title="Available capabilities">
            <ul>
              {product.availableCapabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FeatureCard>
          <FeatureCard title="Pilot capabilities">
            <ul>
              {product.pilotCapabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FeatureCard>
          <FeatureCard title="Planned capabilities">
            <ul>
              {product.plannedCapabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FeatureCard>
        </div>
      </section>

      <section className="container product-section" aria-labelledby="pf-diff">
        <SectionHeader
          label="Differentiation"
          title={page.differentiation.title}
          editorialAccent="AI web search"
          copy={page.differentiation.body}
          id="pf-diff"
          accent="partnerforge"
        />
        <ul className="product-list">
          {page.differentiation.points.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="container product-section" aria-labelledby="pf-final-cta">
        <CtaPanel
          title={page.finalCta.title}
          titleId="pf-final-cta"
          actions={
            <LinkButton to={page.finalCta.href} variant="primary">
              {page.finalCta.label}
            </LinkButton>
          }
        />
      </section>
    </AppShell>
  )
}
