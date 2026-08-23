import { Link } from 'react-router-dom'
import type { ProductConfig } from '../../content'
import { accentCssVars, type ProductAccent } from '../../styles/tokens'
import { ProductStatusBadge } from './Badge'
import './ui.css'

function productAccent(product: ProductConfig): ProductAccent {
  if (product.id === 'scope2plan') return 'scope2plan'
  if (product.id === 'partnerforge') return 'partnerforge'
  if (product.tier === 'marketplace') return 'marketplace'
  if (product.tier === 'labs') return 'labs'
  return 'brand'
}

type ProductCardProps = {
  product: ProductConfig
  ctaLabel?: string
  /** Full CTA label when the default "{cta} {shortName}" pattern is too long. */
  ctaText?: string
  /** Prefer internal product route over external URL for site IA cards. */
  preferInternalRoute?: boolean
  /** Render CTA with button mass instead of text link. */
  emphasizeCta?: boolean
}

export function ProductCard({
  product,
  ctaLabel = 'Explore',
  ctaText,
  preferInternalRoute = true,
  emphasizeCta = false,
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
        {product.supportingLine ? (
          <p className="ds-product-card__supporting">{product.supportingLine}</p>
        ) : null}
      </div>
      <span
        className={
          emphasizeCta ? 'ds-btn ds-btn--secondary ds-btn--sm' : 'ds-product-card__cta'
        }
      >
        {ctaText ?? `${ctaLabel} ${product.shortName}`}
      </span>
    </>
  )

  const className = [
    'ds-product-card',
    emphasizeCta ? 'ds-product-card--emphasized' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (external) {
    return (
      <a
        className={className}
        href={href}
        style={accentCssVars(accent)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link className={className} to={href} style={accentCssVars(accent)}>
      {content}
    </Link>
  )
}
