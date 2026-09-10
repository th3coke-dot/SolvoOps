import { AppShell } from '../components/AppShell'
import { CinematicNav } from '../components/CinematicNav'
import { CinematicScene } from '../components/CinematicScene'
import { ProductExample } from '../components/ProductExample'
import { AppLink, LinkButton } from '../components/ui'
import {
  cinematicAbout,
  cinematicBenefits,
  cinematicHero,
  cinematicProducts,
  cinematicWalkthrough,
  type HeroHeadlineTone,
} from '../content/cinematic'
import { pagesMetadata } from '../content'
import './HomePage.css'

const HEADLINE_TONE_CLASS: Record<HeroHeadlineTone, string> = {
  light: 'cinematic-hero__title-line--light',
  gold: 'cinematic-hero__title-line--gold',
}


export function HomePage() {
  return (
    <AppShell
      metadata={pagesMetadata.home}
      showPageHeader={false}
      showShellNav={false}
      mainClassName="solvo-cinematic"
      shellTone="cinematic"
    >
      <CinematicNav />

      <section className="cinematic-hero" id="top" aria-labelledby="home-hero-title">
        <CinematicScene />
        <div className="cinematic-hero__content">
          <p className="cinematic-hero__eyebrow">{cinematicHero.eyebrow}</p>
          <h1 className="cinematic-hero__title" id="home-hero-title">
            {cinematicHero.headlineLines.map((line) => (
              <span
                key={line.id}
                className={`cinematic-hero__title-line ${HEADLINE_TONE_CLASS[line.tone]}`}
              >
                {line.text}
              </span>
            ))}
          </h1>
          <p className="cinematic-hero__lede">{cinematicHero.lede}</p>
          <div className="cinematic-hero__actions">
            <LinkButton to={cinematicHero.primaryCta.href} variant="primary">
              {cinematicHero.primaryCta.label}
            </LinkButton>
            <LinkButton to={cinematicHero.secondaryCta.href} variant="ghost">
              {cinematicHero.secondaryCta.label}
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="cinematic-products" id="products" aria-labelledby="products-title">
        <div className="container">
          <h2 className="sr-only" id="products-title">
            Products
          </h2>
          <div className="cinematic-product-grid">
            {cinematicProducts.map((product) => (
              <AppLink
                key={product.id}
                className={`cinematic-product cinematic-product--${product.exampleKind}`}
                to={product.href}
              >
                <h3>{product.name}</h3>
                <p className="cinematic-product__description">{product.description}</p>
                <ProductExample kind={product.exampleKind} label={product.exampleLabel} />
                <p className="cinematic-product__rails">
                  {product.rails.join(' · ')}
                </p>
                <span className="cinematic-product__action">Explore {product.name}</span>
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <section className="cinematic-approach" aria-label="Why SolvoOps">
        <div className="container">
          <ul className="cinematic-benefits">
            {cinematicBenefits.map((benefit) => (
              <li key={benefit.id}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="cinematic-walkthrough"
        id="how-it-works"
        aria-labelledby="how-it-works-title"
      >
        <div className="container">
          <div className="cinematic-walkthrough__header">
            <p className="cinematic-hero__eyebrow">{cinematicWalkthrough.eyebrow}</p>
            <h2 id="how-it-works-title">{cinematicWalkthrough.title}</h2>
            <p className="cinematic-walkthrough__lede">{cinematicWalkthrough.lede}</p>
          </div>
          <ol className="cinematic-walkthrough__steps">
            {cinematicWalkthrough.steps.map((step) => (
              <li key={step.id} className="cinematic-walkthrough__step">
                <span className="cinematic-walkthrough__index" aria-hidden="true">
                  {step.index}
                </span>
                <h3>{step.product}</h3>
                <p className="cinematic-walkthrough__question">{step.question}</p>
                <p className="cinematic-walkthrough__summary">{step.summary}</p>
                <ul className="cinematic-walkthrough__moves">
                  {step.moves.map((move) => (
                    <li key={move}>{move}</li>
                  ))}
                </ul>
                <AppLink className="cinematic-walkthrough__link" to={step.href}>
                  {step.linkLabel}
                </AppLink>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cinematic-about" id="about" aria-labelledby="about-title">
        <div className="container cinematic-about__grid">
          <div>
            <p className="cinematic-hero__eyebrow">{cinematicAbout.eyebrow}</p>
            <h2 id="about-title">{cinematicAbout.title}</h2>
          </div>
          <div>
            <p>{cinematicAbout.body}</p>
            <LinkButton to={cinematicAbout.cta.href} variant="ghost">
              {cinematicAbout.cta.label}
            </LinkButton>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

