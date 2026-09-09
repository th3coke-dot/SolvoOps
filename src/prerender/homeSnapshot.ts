import {
  cinematicAbout,
  cinematicHero,
  cinematicHeroHeadline,
  cinematicProducts,
} from '../content/cinematic'
import { escapeHtml } from './escapeHtml'

/**
 * Crawler-visible homepage markup injected into index.html at build time.
 * React replaces this content on hydration; copy is sourced from content modules.
 */
export function getHomePrerenderHtml(): string {
  const productArticles = cinematicProducts
    .map(
      (product) => `
    <article>
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description)}</p>
    </article>`,
    )
    .join('')

  return `
<main id="main-content" class="solvo-cinematic">
  <section class="cinematic-hero" aria-labelledby="home-hero-title">
    <div class="cinematic-hero__content container">
      <p class="cinematic-hero__eyebrow">${escapeHtml(cinematicHero.eyebrow)}</p>
      <h1 class="cinematic-hero__title" id="home-hero-title">${escapeHtml(cinematicHeroHeadline)}</h1>
      <p class="cinematic-hero__lede">${escapeHtml(cinematicHero.lede)}</p>
    </div>
  </section>
  <section id="products" aria-labelledby="products-title">
    <h2 id="products-title">Products</h2>
    ${productArticles}
  </section>
  <section id="about" aria-labelledby="about-title">
    <h2 id="about-title">${escapeHtml(cinematicAbout.title)}</h2>
    <p>${escapeHtml(cinematicAbout.body)}</p>
  </section>
</main>`.trim()
}
