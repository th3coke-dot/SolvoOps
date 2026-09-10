import { Link } from 'react-router-dom'
import { BrandScene } from './BrandScene'
import { ProductExample } from './ProductExample'
import { LinkButton } from './ui'
import type { CinematicExampleKind } from '../content/cinematic'

type ProductActionsProps = { name: string; toolHref: string; pilotHref: string }

export function ProductActions({ name, toolHref, pilotHref }: ProductActionsProps) {
  return <div className="product-entry-actions">
    <LinkButton to={toolHref} variant="primary">Open {name}</LinkButton>
    <LinkButton to={pilotHref} variant="ghost">Discuss a pilot</LinkButton>
  </div>
}

type ProductHeroProps = ProductActionsProps & {
  kind: CinematicExampleKind; title: string; accent: string; description: string
}

export function ProductHero({ name, kind, title, accent, description, toolHref, pilotHref }: ProductHeroProps) {
  return <section className="product-scene-hero" aria-labelledby="product-title">
    <BrandScene />
    <div className="container product-scene-hero__grid">
      <div className="product-scene-hero__copy">
        <Link className="product-breadcrumb" to="/products">All products</Link>
        <p className="cinematic-hero__eyebrow">{name}</p>
        <h1 id="product-title">{title}<span>{accent}</span></h1>
        <p className="product-scene-hero__lede">{description}</p>
        <ProductActions name={name} toolHref={toolHref} pilotHref={pilotHref} />
      </div>
      <div className={`product-scene-hero__example cinematic-product--${kind}`}>
        <p className="product-scene-hero__example-name">{name}</p>
        <ProductExample kind={kind} label="Example" />
        <p className="product-scene-hero__example-note">{kind === 'plan' ? 'A clear view of the work ahead.' : kind === 'find' ? 'The evidence behind your next partner.' : 'Requirements and evidence, together.'}</p>
      </div>
    </div>
  </section>
}
