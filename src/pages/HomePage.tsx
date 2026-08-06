import { AppShell } from '../components/AppShell'
import { DeliveryWorkflowVisual } from '../components/DeliveryWorkflowVisual'
import {
  CtaPanel,
  FeatureCard,
  LinkButton,
  ProductCard,
  ProductStatusBadge,
  SectionHeader,
  WorkflowSteps,
} from '../components/ui'
import {
  company,
  homepageContent,
  pagesMetadata,
  primaryProducts,
  useCases,
} from '../content'
import './HomePage.css'

export function HomePage() {
  const content = homepageContent

  return (
    <AppShell
      metadata={pagesMetadata.home}
      showPageHeader={false}
      mainClassName="home"
    >
      <section className="home-hero container" aria-labelledby="home-hero-title">
        <p className="home-hero__eyebrow">{content.eyebrow}</p>
        <p className="home-hero__brand">{company.name}</p>
        <h1 className="home-hero__title" id="home-hero-title">
          {content.headline}
        </h1>
        <p className="home-hero__lede">{content.lede}</p>
        <div className="home-hero__actions">
          <LinkButton to={content.primaryCta.href} variant="primary">
            {content.primaryCta.label}
          </LinkButton>
          <LinkButton to={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </LinkButton>
        </div>
        <DeliveryWorkflowVisual />
      </section>

      <section className="home-section container" aria-labelledby="problem-title">
        <SectionHeader
          label={content.problem.label}
          title={content.problem.title}
          copy={content.problem.copy}
          id="problem-title"
        />
        <div className="home-grid home-grid--3">
          {content.problem.items.map((item) => (
            <FeatureCard key={item.title} title={item.title}>
              {item.body}
            </FeatureCard>
          ))}
        </div>
      </section>

      <section
        className="home-section container"
        id="products"
        aria-labelledby="products-title"
      >
        <SectionHeader
          label={content.products.label}
          title={content.products.title}
          copy={content.products.copy}
          id="products-title"
        />
        <div className="home-products">
          {primaryProducts.map((product) => (
            <div key={product.id} className="home-products__item">
              <ProductStatusBadge status={product.status} />
              <ProductCard
                product={product}
                ctaLabel="Explore"
                preferInternalRoute
              />
            </div>
          ))}
        </div>
      </section>

      <section className="home-section container" aria-labelledby="workflow-title">
        <SectionHeader
          label={content.workflow.label}
          title={content.workflow.title}
          copy={
            <>
              <p>{content.workflow.copy}</p>
              <p>
                <em>{content.workflow.note}</em>
              </p>
            </>
          }
          id="workflow-title"
        />
        <WorkflowSteps steps={[...content.workflow.steps]} labelledBy="workflow-title" />
      </section>

      <section className="home-section container" aria-labelledby="why-title">
        <SectionHeader
          label={content.why.label}
          title={content.why.title}
          id="why-title"
        />
        <div className="home-grid home-grid--3">
          {content.why.principles.map((item) => (
            <FeatureCard key={item.title} title={item.title}>
              {item.body}
            </FeatureCard>
          ))}
        </div>
      </section>

      <section className="home-section container" aria-labelledby="audience-title">
        <SectionHeader
          label={content.audience.label}
          title={content.audience.title}
          id="audience-title"
        />
        <ul className="home-audience">
          {useCases.groups.map((group) => (
            <li key={group}>{group}</li>
          ))}
        </ul>
      </section>

      <section className="home-section container" aria-labelledby="pilot-title">
        <CtaPanel
          label={content.pilot.label}
          title={content.pilot.title}
          copy={content.pilot.copy}
          titleId="pilot-title"
          actions={
            <>
              <LinkButton to={content.pilot.primaryCta.href} variant="primary">
                {content.pilot.primaryCta.label}
              </LinkButton>
              <LinkButton to={content.pilot.secondaryCta.href} variant="secondary">
                {content.pilot.secondaryCta.label}
              </LinkButton>
            </>
          }
        />
      </section>
    </AppShell>
  )
}
