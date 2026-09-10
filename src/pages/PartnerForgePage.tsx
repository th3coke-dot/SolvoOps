import { AppShell } from '../components/AppShell'
import { PartnerForgeProofVisual } from '../components/ProductProofVisuals'
import {
  CtaPanel,
  FeatureCard,
  SectionHeader,
  WorkflowSteps,
} from '../components/ui'
import { CinematicNav } from '../components/CinematicNav'
import { ProductHero, ProductActions } from '../components/ProductHero'
import {
  getProductById,
  pagesMetadata,
  partnerforgePage,
} from '../content'
import './ProductPage.css'
import './HomePage.css'
import './CinematicProductPage.css'

export function PartnerForgePage() {
  const product = getProductById('partnerforge')
  const page = partnerforgePage
  if (!product) return null

  return (
    <AppShell
      metadata={pagesMetadata.partnerforge}
      showPageHeader={false}
      showShellNav={false}
      shellTone="cinematic"
      mainClassName="solvo-cinematic product-page product-page--cinematic product-page--partnerforge"
    >
      <CinematicNav />
      <ProductHero name={page.label} kind="find" title="Find the right" accent="delivery partners."
        description={page.lede} toolHref={page.secondaryCta.href} pilotHref={page.primaryCta.href} />

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

      <section className="container product-section" aria-labelledby="pf-final-cta">
        <CtaPanel
          title={page.finalCta.title}
          titleId="pf-final-cta"
          actions={<ProductActions name={page.label} toolHref={page.secondaryCta.href} pilotHref={page.finalCta.href} />}
        />
      </section>
    </AppShell>
  )
}
