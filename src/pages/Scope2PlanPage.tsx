import { AppShell } from '../components/AppShell'
import { Scope2PlanProofVisual } from '../components/ProductProofVisuals'
import {
  CtaPanel,
  FeatureCard,
  LinkButton,
  ProductStatusBadge,
  SectionHeader,
  WorkflowSteps,
} from '../components/ui'
import {
  company,
  getProductById,
  pagesMetadata,
  scope2planPage,
} from '../content'
import './ProductPage.css'

export function Scope2PlanPage() {
  const product = getProductById('scope2plan')
  const page = scope2planPage
  if (!product) return null

  return (
    <AppShell
      metadata={pagesMetadata.scope2plan}
      showPageHeader={false}
      mainClassName="product-page product-page--scope2plan"
    >
      <section className="container product-hero" aria-labelledby="s2p-title">
        <div className="product-hero__meta">
          <p className="product-hero__label">{page.label}</p>
          <ProductStatusBadge status={product.status} />
        </div>
        <h1 className="product-hero__title" id="s2p-title">
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

      <section className="container product-section" aria-labelledby="generate-title">
        <SectionHeader
          label="Scope2Plan Generate"
          title={page.generate.title}
          copy={page.generate.body}
          accent="scope2plan"
          id="generate-title"
        />
        <p className="product-value">{page.generate.value}</p>
        <Scope2PlanProofVisual />
        <h3 className="product-subtitle">Potential outputs</h3>
        <ul className="product-list">
          {page.generate.outputs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="container product-section" aria-labelledby="control-title">
        <SectionHeader
          label="Scope2Plan Control"
          title={page.control.title}
          copy={
            <>
              <p>{page.control.body}</p>
              <p>
                <em>{page.control.note}</em>
              </p>
            </>
          }
          accent="scope2plan"
          id="control-title"
        />
        <div className="product-capability-grid">
          <FeatureCard title="Available capabilities">
            <ul>
              {product.availableCapabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FeatureCard>
          <FeatureCard title="Planned / Control capabilities">
            <ul>
              {product.plannedCapabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FeatureCard>
        </div>
      </section>

      <section className="container product-section" aria-labelledby="s2p-flow-title">
        <SectionHeader
          label="Workflow"
          title="From scope upload to controlled updates"
          id="s2p-flow-title"
          accent="scope2plan"
        />
        <WorkflowSteps steps={[...page.workflow]} labelledBy="s2p-flow-title" />
      </section>

      <section className="container product-section" aria-labelledby="method-title">
        <SectionHeader
          label="Methodology"
          title={page.methodology.title}
          copy={page.methodology.body}
          id="method-title"
          accent="scope2plan"
        />
        <ul className="product-list">
          {page.methodology.profiles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="container product-section" aria-labelledby="s2p-final-cta">
        <CtaPanel
          title={page.finalCta.title}
          titleId="s2p-final-cta"
          copy={company.connectedWorkflowNote}
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
