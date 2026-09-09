import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { CinematicNav } from '../components/CinematicNav'
import { CinematicScene } from '../components/CinematicScene'
import { ProductExample } from '../components/ProductExample'
import { LinkButton } from '../components/ui'
import {
  cinematicAbout,
  cinematicBenefits,
  cinematicHero,
  cinematicProducts,
} from '../content/cinematic'
import { pagesMetadata } from '../content'
import './HomePage.css'

function Arrow() {
  return (
    <svg className="home-arrow" aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M8 5h7v7" />
    </svg>
  )
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
        <div className="cinematic-hero__content container">
          <p className="cinematic-hero__eyebrow">{cinematicHero.eyebrow}</p>
          <h1 className="cinematic-hero__title" id="home-hero-title">
            {cinematicHero.headline}
          </h1>
          <p className="cinematic-hero__lede">{cinematicHero.lede}</p>
          <div className="cinematic-hero__actions">
            <LinkButton to={cinematicHero.primaryCta.href} variant="primary">
              {cinematicHero.primaryCta.label}
              <Arrow />
            </LinkButton>
            <LinkButton to={cinematicHero.secondaryCta.href} variant="ghost">
              {cinematicHero.secondaryCta.label}
              <Arrow />
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
              <Link
                key={product.id}
                className="cinematic-product"
                to={product.href}
              >
                <ProductExample kind={product.exampleKind} label={product.exampleLabel} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="cinematic-product__rails">
                  {product.rails.join(' · ')}
                </p>
                <span className="cinematic-product__go" aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cinematic-approach"
        id="how-it-works"
        aria-labelledby="approach-title"
      >
        <div className="container">
          <h2 className="sr-only" id="approach-title">
            Our approach
          </h2>
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
              <Arrow />
            </LinkButton>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
