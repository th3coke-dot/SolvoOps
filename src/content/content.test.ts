import { describe, expect, it } from 'vitest'
import {
  getProductById,
  labsProducts,
  pagesMetadata,
  primaryProducts,
  productStatusById,
  productStatusLabels,
  products,
} from './index'

describe('content model', () => {
  it('keeps Scope2Plan and PartnerForge as the only primary products', () => {
    expect(primaryProducts.map((p) => p.id).sort()).toEqual([
      'partnerforge',
      'scope2plan',
    ])
    expect(labsProducts.every((p) => p.tier === 'labs')).toBe(true)
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
    expect(scope!.availableCapabilities.length).toBeGreaterThan(0)
    expect(scope!.plannedCapabilities.some((c) => /Control/i.test(c))).toBe(
      true,
    )
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
    ]
    for (const key of required) {
      expect(pagesMetadata[key]?.path).toBeTruthy()
      expect(pagesMetadata[key]?.title).toBeTruthy()
      expect(pagesMetadata[key]?.description).toBeTruthy()
    }
  })

  it('includes approved founder biography content', async () => {
    const { company } = await import('./company')
    expect(company.founder.name).toBe('Morten')
    expect(company.founder.paragraphs.length).toBeGreaterThan(3)
    expect(company.founderMission.toLowerCase()).toContain('smarter')
  })

  it('only links to approved external product URLs', () => {
    expect(getProductById('scope2plan')?.productUrl).toMatch(/scope2plan\.com/)
    expect(getProductById('partnerforge')?.productUrl).toMatch(
      /partnerforge\.vercel\.app/,
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
