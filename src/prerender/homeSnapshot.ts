import { company, homepageContent, primaryProducts } from '../content'
import { escapeHtml } from './escapeHtml'

/**
 * Crawler-visible homepage markup injected into index.html at build time.
 * React replaces this content on hydration; copy is sourced from content modules.
 */
export function getHomePrerenderHtml(): string {
  const scope2plan = primaryProducts.find((product) => product.id === 'scope2plan')!
  const partnerforge = primaryProducts.find((product) => product.id === 'partnerforge')!

  return `
<main id="main-content" class="home-redesign">
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__content container">
      <p class="home-hero__eyebrow">${escapeHtml(homepageContent.eyebrow)}</p>
      <p class="home-hero__brand">${escapeHtml(company.name)}</p>
      <h1 class="home-hero__title" id="home-hero-title">${escapeHtml(homepageContent.headline)}</h1>
      <p class="home-hero__lede">${escapeHtml(homepageContent.lede)}</p>
    </div>
  </section>
  <section id="products" aria-labelledby="products-title">
    <h2 id="products-title">${escapeHtml(homepageContent.products.title)}</h2>
    <p>${escapeHtml(homepageContent.products.copy)}</p>
    <article>
      <h3>${escapeHtml(scope2plan.name)}</h3>
      <p>${escapeHtml(scope2plan.description)}</p>
    </article>
    <article>
      <h3>${escapeHtml(partnerforge.name)}</h3>
      <p>${escapeHtml(partnerforge.description)}</p>
    </article>
  </section>
</main>`.trim()
}
