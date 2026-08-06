import { Link } from 'react-router-dom'
import { DocumentMeta } from '../components/DocumentMeta'
import { PlaceholderLayout } from '../components/PlaceholderLayout'
import {
  company,
  pagesMetadata,
  primaryProducts,
} from '../content'

export function ProductsPage() {
  return (
    <>
      <DocumentMeta metadata={pagesMetadata.products} />
      <PlaceholderLayout
        eyebrow="Products"
        title="Focused products for critical delivery workflows"
      >
        <p>
          Each SolvoOps product solves a specific operational bottleneck while
          remaining compatible with the systems organisations already use.
        </p>
        <p>
          <strong>Primary commercial products</strong> — Labs tools are listed
          separately on <Link to="/labs">SolvoOps Labs</Link>.
        </p>
        <ul>
          {primaryProducts.map((product) => (
            <li key={product.id}>
              <Link to={product.route}>{product.name}</Link>
              {' — '}
              {product.headline}
              <div>
                <span className="ia-status">{product.statusLabel}</span>
                <span className="ia-status">{product.category}</span>
              </div>
            </li>
          ))}
        </ul>
        <p>{company.connectedWorkflowNote}</p>
      </PlaceholderLayout>
    </>
  )
}
