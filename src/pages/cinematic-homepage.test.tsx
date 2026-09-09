import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { cinematicHero, cinematicProducts } from '../content/cinematic'
import { HomePage } from './HomePage'

function renderHome() {
  const ui: ReactElement = (
    <MemoryRouter initialEntries={['/']}>
      <HomePage />
    </MemoryRouter>
  )
  return renderToStaticMarkup(ui)
}

describe('cinematic homepage', () => {
  it('renders the locked marketing copy and product names', () => {
    const html = renderHome()
    expect(html).toContain(cinematicHero.eyebrow)
    expect(html).toContain(cinematicHero.headline)
    expect(html).toContain(cinematicHero.lede)
    expect(html).toContain('Explore our products')
    expect(html).toContain('href="#products"')
    expect(html).toContain('See how it works')
    expect(html).toContain('href="#how-it-works"')
    expect(html).toContain('Discuss a pilot')
    expect(html).toContain('href="/pilot"')
    expect(html).toContain('A more capable delivery industry.')
    for (const product of cinematicProducts) {
      expect(html).toContain(product.name)
      expect(html).toContain(product.description)
      expect(html).toContain(product.rails.join(' · '))
    }
    expect(html.match(/Example/g)?.length).toBeGreaterThanOrEqual(3)
  })

  it('keeps original brand artwork and existing product routes', () => {
    const html = renderHome()
    expect(html).toContain('/brand/solvoops-horizontal-dark.png')
    expect(html).not.toContain('solvoops-horizontal-dark-alternate')
    expect(html).toContain('href="/products/scope2plan"')
    expect(html).toContain('href="/products/partnerforge"')
    expect(html).toContain('href="/pilot?product=solvobid"')
    expect(html).toContain('href="/privacy"')
    expect(html).toContain('href="/terms"')
    expect(html).toContain('Our approach')
    expect(html).toContain('href="#about"')
  })

  it('prerenders a polished static scene without active playback controls', () => {
    const html = renderHome()
    expect(html).toContain('/scene/sunset.jpg')
    expect(html).toContain('cinematic-aurora__curtains')
    expect(html).toContain('cinematic-aurora__reflection')
    expect(html).not.toContain('aria-label="Scene playback"')
  })

  it('omits fake claims, shared login, and a play-video CTA', () => {
    const html = renderHome()
    expect(html).not.toContain('guaranteed')
    expect(html).not.toContain('124 requirements')
    expect(html).not.toContain('Log in')
    expect(html).not.toContain('Login')
    expect(html).not.toContain('See how it works ▶')
    expect(html).not.toContain('Play video')
  })
})
