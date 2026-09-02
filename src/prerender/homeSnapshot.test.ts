import { describe, expect, it } from 'vitest'
import { homepageContent } from '../content'
import { getHomePrerenderHtml } from './homeSnapshot'

describe('home prerender snapshot', () => {
  it('includes one H1 and crawlable product copy from content modules', () => {
    const html = getHomePrerenderHtml()

    expect(html.match(/<h1\b/g)?.length).toBe(1)
    expect(html).toContain(homepageContent.headline)
    expect(html).toContain(homepageContent.lede)
    expect(html).toContain(homepageContent.products.title)
    expect(html).toContain('Scope2Plan')
    expect(html).toContain('PartnerForge')
  })
})
