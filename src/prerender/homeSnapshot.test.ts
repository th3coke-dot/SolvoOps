import { describe, expect, it } from 'vitest'
import { cinematicHero, cinematicProducts } from '../content/cinematic'
import { getHomePrerenderHtml } from './homeSnapshot'

describe('home prerender snapshot', () => {
  it('includes one H1 and crawlable cinematic product copy', () => {
    const html = getHomePrerenderHtml()

    expect(html.match(/<h1\b/g)?.length).toBe(1)
    expect(html).toContain(cinematicHero.headline)
    expect(html).toContain(cinematicHero.lede)
    expect(html).toContain('SolvoPlan')
    expect(html).toContain('SolvoFind')
    expect(html).toContain('SolvoBid')
    expect(cinematicProducts.map((product) => product.name)).toEqual([
      'SolvoPlan',
      'SolvoFind',
      'SolvoBid',
    ])
    expect(html).not.toContain('Scope2Plan')
    expect(html).not.toContain('PartnerForge')
  })
})
