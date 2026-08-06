import { Link } from 'react-router-dom'
import type { ProductConfig } from '../../content'
import { accentCssVars, type ProductAccent } from '../../styles/tokens'
import { ProductStatusBadge } from './Badge'
import './ui.css'

function productAccent(product: ProductConfig): ProductAccent {
  if (product.id === 'scope2plan') return 'scope2plan'
  if (product.id === 'partnerforge') return 'partnerforge'
  if (product.tier === 'labs') return 'labs'
  return 'brand'
}

type ProductCardProps = {
  product: ProductConfig
  ctaLabel?: string
  /** Prefer internal product route over external URL for site IA cards. */
  preferInternalRoute?: boolean
}

export function ProductCard({
  product,
  ctaLabel = 'Explore',
  preferInternalRoute = true,
}: ProductCardProps) {
  const accent = productAccent(product)
  const href =
    preferInternalRoute || !product.productUrl
      ? product.route
      : product.productUrl
  const external = href.startsWith('http')
  const content = (
    <>
      <div className="ds-product-card__meta">
        <p className="ds-product-card__category">{product.category}</p>
        <h3 className="ds-product-card__name">{product.name}</h3>
        <ProductStatusBadge status={product.status} />
      </div>
      <div>
        <p className="ds-product-card__headline">{product.headline}</p>
        <p className="ds-product-card__description">{product.description}</p>
      </div>
      <span className="ds-product-card__cta">
        {ctaLabel} {product.shortName} →
      </span>
    </>
  )

  if (external) {
    return (
      <a
        className="ds-product-card"
        href={href}
        style={accentCssVars(accent)}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <Link className="ds-product-card" to={href} style={accentCssVars(accent)}>
      {content}
    </Link>
  )
}
