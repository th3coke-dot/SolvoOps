import { AppShell } from '../components/AppShell'
import { LinkButton, ProductCard, SectionHeader } from '../components/ui'
import { CinematicNav } from '../components/CinematicNav'
import { BrandScene } from '../components/BrandScene'
import { ProductExample } from '../components/ProductExample'
import { AppLink } from '../components/ui'
import { cinematicProducts } from '../content/cinematic'
import {
  labsProducts,
  marketplaceProducts,
  pagesMetadata,
} from '../content'
import './ProductPage.css'
import './HomePage.css'
import './CinematicProductPage.css'

export function ProductsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.products}
      showPageHeader={false}
      showShellNav={false}
      shellTone="cinematic"
      mainClassName="solvo-cinematic product-page product-page--cinematic product-page--index"
    >
      <CinematicNav />
      <section className="product-scene-hero product-index-hero" aria-labelledby="products-title">
        <BrandScene />
        <div className="container product-scene-hero__grid">
          <p className="cinematic-hero__eyebrow">Our products</p>
          <h1 id="products-title">Clarity at every stage.<span>From bid to delivery.</span></h1>
          <p className="product-scene-hero__lede">Understand the tender, plan the delivery and find the right partners.</p>
        </div>
      </section>

      <section className="container product-section" aria-labelledby="operational-products">
        <SectionHeader
          label="Operational products"
          title="SolvoPlan, SolvoFind and SolvoBid"
          editorialAccent="SolvoFind"
          id="operational-products"
        />
        <div className="product-index-grid">
          {cinematicProducts.map((product) => <AppLink key={product.id} to={product.href}
            className={`cinematic-product cinematic-product--${product.exampleKind}`}>
            <h3>{product.name}</h3>
            <p className="cinematic-product__description">{product.description}</p>
            <ProductExample kind={product.exampleKind} label="Example" />
            <span className="cinematic-product__action">Explore {product.name}</span>
          </AppLink>)}
        </div>
      </section>

      <section className="container product-section" aria-labelledby="marketplace-products">
        <SectionHeader
          label="Marketplace"
          title="Who Gets the Call?"
          editorialAccent="Who Gets the Call?"
          id="marketplace-products"
          accent="marketplace"
        />
        <div>
          {marketplaceProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              ctaText="Explore Who Gets the Call?"
              preferInternalRoute
              emphasizeCta
            />
          ))}
        </div>
      </section>

      <section className="container product-section" aria-labelledby="labs-products">
        <SectionHeader
          label="SolvoOps Labs"
          title="Small tools for everyday work"
          editorialAccent="everyday work"
          id="labs-products"
          accent="labs"
        />
        <div>
          {labsProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              ctaLabel="Open"
              preferInternalRoute={false}
            />
          ))}
        </div>
        <p style={{ marginTop: 'var(--space-6)' }}>
          <LinkButton to="/labs" variant="secondary" size="sm">
            View SolvoOps Labs
          </LinkButton>
        </p>
      </section>
    </AppShell>
  )
}
