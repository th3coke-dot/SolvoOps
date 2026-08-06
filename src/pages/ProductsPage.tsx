import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { ProductCard } from '../components/ui'
import { company, pagesMetadata, primaryProducts } from '../content'

export function ProductsPage() {
  return (
    <AppShell
      metadata={pagesMetadata.products}
      eyebrow="Products"
      title="Focused products for critical delivery workflows"
      copy="Each SolvoOps product solves a specific operational bottleneck while remaining compatible with the systems organisations already use."
    >
      <p>
        <strong>Primary commercial products</strong> — Labs tools are listed on{' '}
        <Link to="/labs">SolvoOps Labs</Link>.
      </p>
      <div>
        {primaryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            ctaLabel="Explore"
            preferInternalRoute
          />
        ))}
      </div>
      <p style={{ marginTop: 'var(--space-6)' }}>{company.connectedWorkflowNote}</p>
    </AppShell>
  )
}
