import { AppShell } from '../components/AppShell'
import { LinkButton, ProductCard, SectionHeader } from '../components/ui'
import { EditorialHeading } from '../components/ui/EditorialHeading'
import {
  labsProducts,
  marketplaceProducts,
  pagesMetadata,
  primaryProducts,
} from '../content'
import './ProductPage.css'

export function ProductsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.products}
      showPageHeader={false}
      mainClassName="product-page product-page--index"
    >
      <section className="container product-hero" aria-labelledby="products-title">
        <p className="product-hero__label">Products</p>
        <h1 className="product-hero__title" id="products-title">
          <EditorialHeading
            text="Focused products for critical delivery workflows"
            accent="delivery workflows"
          />
        </h1>
        <p className="product-hero__lede">
          Each SolvoOps product solves a specific operational bottleneck while
          remaining compatible with the systems organisations already use.
        </p>
      </section>

      <section className="container product-section" aria-labelledby="operational-products">
        <SectionHeader
          label="Operational products"
          title="Scope2Plan and PartnerForge"
          editorialAccent="PartnerForge"
          id="operational-products"
          copy="Scope2Plan Generate and Control for planning and change. PartnerForge for partner intelligence across regions."
        />
        <div>
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

      <section className="container product-section" aria-labelledby="marketplace-products">
        <SectionHeader
          label="Marketplace"
          title="Who Gets the Call?"
          editorialAccent="Who Gets the Call?"
          id="marketplace-products"
          copy="A separate public marketplace and paid-advertising product, owned and built by SolvoOps."
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
          title="Explore adjacent tools"
          editorialAccent="adjacent tools"
          id="labs-products"
          copy="Labs tools remain secondary to the primary commercial products, but they are part of the SolvoOps portfolio."
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
