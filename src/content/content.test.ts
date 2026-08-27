import { describe, expect, it } from 'vitest'
import {
  getProductById,
  labsProducts,
  marketplaceProducts,
  pagesMetadata,
  partnerforgePage,
  primaryProducts,
  productStatusById,
  productStatusLabels,
  products,
  productsNavGroups,
  whoGetsTheCallPage,
  whoGetsTheCallUrls,
} from './index'

describe('content model', () => {
  it('keeps Scope2Plan and PartnerForge as the only primary products', () => {
    expect(primaryProducts.map((p) => p.id).sort()).toEqual([
      'partnerforge',
      'scope2plan',
    ])
    expect(labsProducts.every((p) => p.tier === 'labs')).toBe(true)
    expect(marketplaceProducts.map((p) => p.id)).toEqual(['who-gets-the-call'])
    expect(labsProducts.some((p) => p.id === 'who-gets-the-call')).toBe(false)
    expect(primaryProducts.some((p) => p.id === 'who-gets-the-call')).toBe(false)
  })

  it('stores status centrally with human-readable labels', () => {
    for (const product of products) {
      expect(product.statusLabel).toBe(productStatusLabels[product.status])
      expect(Object.keys(productStatusLabels)).toContain(product.status)
    }
    expect(productStatusById['scope2plan-control']).toBe('in-development')
  })

  it('separates available, pilot, and planned capabilities', () => {
    const scope = getProductById('scope2plan')
    expect(scope).toBeTruthy()
    expect(scope!.availableCapabilities.some((c) => /Generate/i.test(c))).toBe(
      true,
    )
    expect(scope!.plannedCapabilities.some((c) => /Control/i.test(c))).toBe(
      true,
    )
    const partner = getProductById('partnerforge')
    expect(
      partner!.pilotCapabilities.some((c) => /document matching/i.test(c)),
    ).toBe(true)
  })

  it('defines metadata for every target IA route', () => {
    const required = [
      'home',
      'products',
      'scope2plan',
      'partnerforge',
      'howItWorks',
      'about',
      'labs',
      'pilot',
      'privacy',
      'terms',
      'notFound',
      'whoGetsTheCall',
    ]
    for (const key of required) {
      expect(pagesMetadata[key]?.path).toBeTruthy()
      expect(pagesMetadata[key]?.title).toBeTruthy()
      expect(pagesMetadata[key]?.description).toBeTruthy()
    }
  })

  it('includes approved founder biography content', async () => {
    const { company } = await import('./company')
    expect(company.founder.role).toBe('Founder')
    expect(company.founder.paragraphs.length).toBeGreaterThan(3)
    expect(company.founderMission.toLowerCase()).toContain('smarter')
  })

  it('records the current operating entity until SolvoOps AS exists', async () => {
    const { company } = await import('./company')
    expect(company.operator.legalName).toBe('Pedersen IT Consulting')
    expect(company.operator.organizationNumber).toBe('924547405')
  })

  it('only links to approved external product URLs', () => {
    expect(getProductById('scope2plan')?.productUrl).toMatch(/scope2plan\.com/)
    expect(getProductById('partnerforge')?.productUrl).toBe(
      'https://partnerforge.solvoops.com/',
    )
    expect(getProductById('who-gets-the-call')?.productUrl).toBe(
      'https://whogetsthecall.lol',
    )
    expect(getProductById('autoname')?.productUrl).toMatch(
      /autonamesearch\.vercel\.app/,
    )
  })
})

describe('legal drafts', () => {
  it('keeps privacy and terms draft notices explicit', async () => {
    const { legalDraftNotice, privacyPageContent, termsPageContent } =
      await import('./legal')
    expect(legalDraftNotice.toLowerCase()).toContain('pending counsel')
    expect(privacyPageContent.sections.length).toBeGreaterThan(3)
    expect(termsPageContent.sections.length).toBeGreaterThan(3)
  })
})

describe('Who Gets the Call marketplace', () => {
  it('labels the marketplace Live and keeps it out of Labs', () => {
    const product = getProductById('who-gets-the-call')
    expect(product?.tier).toBe('marketplace')
    expect(product?.status).toBe('live-marketplace')
    expect(product?.statusLabel.toLowerCase()).toContain('live')
    expect(product?.route).toBe('/marketplace/who-gets-the-call')
    expect(pagesMetadata.whoGetsTheCall.path).toBe(
      '/marketplace/who-gets-the-call',
    )
    expect(pagesMetadata.whoGetsTheCall.title).toBe(
      'Who Gets the Call? | SolvoOps Marketplace',
    )
    expect(Object.values(pagesMetadata).some((page) => page.path === '/products/who-gets-the-call')).toBe(false)
  })

  it('uses the exact marketplace and claim destinations', () => {
    expect(whoGetsTheCallUrls.production).toBe('https://whogetsthecall.lol')
    expect(whoGetsTheCallUrls.claim).toBe('https://whogetsthecall.lol/claim')
    expect(whoGetsTheCallPage.primaryCta.href).toBe(
      'https://whogetsthecall.lol/claim',
    )
    expect(whoGetsTheCallPage.secondaryCta.href).toBe(
      'https://whogetsthecall.lol',
    )
    expect(whoGetsTheCallPage.lanes.map((lane) => lane.name)).toEqual([
      'Run it',
      'Build it',
      'Power it',
      'Source it',
    ])
  })

  it('groups navigation as operational products, marketplace, and Labs', () => {
    expect(productsNavGroups.map((group) => group.id)).toEqual([
      'operational-products',
      'marketplace',
      'labs',
    ])
    expect(
      productsNavGroups
        .find((group) => group.id === 'operational-products')
        ?.items.map((item) => item.id),
    ).toEqual(['scope2plan', 'partnerforge'])
    expect(
      productsNavGroups
        .find((group) => group.id === 'marketplace')
        ?.items.map((item) => item.href),
    ).toEqual(['/marketplace/who-gets-the-call'])
    expect(
      productsNavGroups
        .find((group) => group.id === 'labs')
        ?.items.some((item) => item.id === 'who-gets-the-call'),
    ).toBe(false)
  })
})

describe('PartnerForge regression', () => {
  it('keeps Open PartnerForge on the production application URL', () => {
    expect(partnerforgePage.secondaryCta.label).toBe('Open PartnerForge')
    expect(partnerforgePage.secondaryCta.href).toBe(
      'https://partnerforge.solvoops.com/',
    )
    expect(partnerforgePage.primaryCta.href).toBe('/pilot?product=partnerforge')
    expect(partnerforgePage.finalCta.href).toBe('/pilot?product=partnerforge')
    expect(getProductById('partnerforge')?.route).toBe('/products/partnerforge')
  })
})
