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
          {page.headline}
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
          copy={page.problem.body}
          id="pf-problem"
          accent="partnerforge"
        />
        <PartnerForgeProofVisual />
      </section>

      <section className="container product-section" aria-labelledby="pf-flow">
        <SectionHeader
          label="Workflow"
          title="From requirement to shortlist"
          id="pf-flow"
          accent="partnerforge"
        />
        <WorkflowSteps steps={[...page.workflow]} labelledBy="pf-flow" />
      </section>

      <section className="container product-section" aria-labelledby="pf-caps">
        <SectionHeader
          label="Capabilities"
          title="Structured partner intelligence"
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
