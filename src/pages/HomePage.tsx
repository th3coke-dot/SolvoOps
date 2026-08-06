import { AppShell } from '../components/AppShell'
import { DeliveryWorkflowVisual } from '../components/DeliveryWorkflowVisual'
import { HeroAtmosphere } from '../components/HeroAtmosphere'
import {
  CtaPanel,
  LinkButton,
  ProductCard,
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
      <section className="home-hero" aria-labelledby="home-hero-title">
        <HeroAtmosphere />
        <div className="home-hero__content container">
          <p className="home-hero__eyebrow reveal">{content.eyebrow}</p>
          <p className="home-hero__brand reveal reveal--delay-1">{company.name}</p>
          <h1 className="home-hero__title reveal reveal--delay-2" id="home-hero-title">
            {content.headline}
          </h1>
          <p className="home-hero__lede reveal reveal--delay-3">{content.lede}</p>
          <div className="home-hero__actions reveal reveal--delay-4">
            <LinkButton to={content.primaryCta.href} variant="primary">
              {content.primaryCta.label}
            </LinkButton>
            <LinkButton to={content.secondaryCta.href} variant="ink">
              {content.secondaryCta.label}
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="home-section container" aria-labelledby="problem-title">
        <SectionHeader
          label={content.problem.label}
          title={content.problem.title}
          copy={content.problem.copy}
          id="problem-title"
        />
        <ul className="home-problem-list">
          {content.problem.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
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
            <ProductCard
              key={product.id}
              product={product}
              ctaLabel="Explore"
              preferInternalRoute
              emphasizeCta
            />
          ))}
        </div>
      </section>

      <section className="home-section home-section--workflow" aria-labelledby="workflow-title">
        <div className="container">
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
          <DeliveryWorkflowVisual />
          <WorkflowSteps steps={[...content.workflow.steps]} labelledBy="workflow-title" />
        </div>
      </section>

      <section className="home-section container" aria-labelledby="why-title">
        <SectionHeader
          label={content.why.label}
          title={content.why.title}
          id="why-title"
        />
        <ul className="home-principles">
          {content.why.principles.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section home-section--compact container" aria-labelledby="audience-title">
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
