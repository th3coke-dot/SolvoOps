import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { cinematicProducts } from '../content/cinematic'
import { HomePage } from './HomePage'

function renderHome() {
  const ui: ReactElement = (
    <MemoryRouter initialEntries={['/']}>
      <HomePage />
    </MemoryRouter>
  )
  return renderToStaticMarkup(ui)
}

function sliceBetween(html: string, startMarker: string, endMarker: string) {
  const start = html.indexOf(startMarker)
  const end = html.indexOf(endMarker, start + startMarker.length)
  expect(start).toBeGreaterThan(-1)
  expect(end).toBeGreaterThan(start)
  return html.slice(start, end)
}

describe('cinematic homepage', () => {
  it('renders the locked marketing copy and product names', () => {
    const html = renderHome()
    expect(html).toContain('COMPLEXITY IN. CLARITY OUT.')
    expect(html).toContain(
      'Understand the bid. Plan the work. Find the right partners.',
    )
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

  it('renders the headline as two toned lines with the accent in gold', () => {
    const html = renderHome()
    expect(html.match(/<h1\b/g)?.length).toBe(1)
    const h1 = sliceBetween(html, '<h1', '</h1>')
    expect(h1).toContain(
      '<span class="cinematic-hero__title-line cinematic-hero__title-line--light">Clarity for</span>',
    )
    expect(h1).toContain(
      '<span class="cinematic-hero__title-line cinematic-hero__title-line--gold">complex delivery.</span>',
    )
    expect(h1.match(/class="cinematic-hero__title-line /g)?.length).toBe(2)
  })

  it('walks through SolvoBid, SolvoPlan and SolvoFind under the how-it-works anchor', () => {
    const html = renderHome()
    expect(html.match(/id="how-it-works"/g)?.length).toBe(1)
    const walkthrough = sliceBetween(html, 'id="how-it-works"', 'id="about"')
    expect(walkthrough).toContain('aria-labelledby="how-it-works-title"')
    expect(walkthrough).toContain(
      '<h2 id="how-it-works-title">One thread from tender to delivery.</h2>',
    )
    expect(walkthrough).toContain('<h3>SolvoBid</h3>')
    expect(walkthrough).toContain('<h3>SolvoPlan</h3>')
    expect(walkthrough).toContain('<h3>SolvoFind</h3>')
    expect(walkthrough).toContain('href="https://solvobid.com/login"')
    expect(walkthrough).toContain('href="https://solvoplan.com/login"')
    expect(walkthrough).toContain('href="https://solvofind.com/login"')
    expect(walkthrough).toContain('Extract requirements from the tender pack')
    expect(walkthrough).toContain('Export the package to PDF or DOCX')
    expect(walkthrough).toContain('Filter by country, category, reach and distance')
    expect(walkthrough).not.toContain('Scope2Plan')
    expect(walkthrough).not.toContain('PartnerForge')
    expect(walkthrough).not.toMatch(/\d+%/)
  })

  it('keeps the benefits strip between the deck and the walkthrough without the anchor', () => {
    const html = renderHome()
    const approachTag = sliceBetween(html, '<section class="cinematic-approach"', '>')
    expect(approachTag).not.toContain('id="how-it-works"')
    expect(approachTag).toContain('aria-label="Why SolvoOps"')
    expect(html).toContain('Clearer decisions')
    const products = html.indexOf('id="products"')
    const approach = html.indexOf('class="cinematic-approach"')
    const walkthrough = html.indexOf('id="how-it-works"')
    const about = html.indexOf('id="about"')
    expect(products).toBeGreaterThan(-1)
    expect(approach).toBeGreaterThan(products)
    expect(walkthrough).toBeGreaterThan(approach)
    expect(about).toBeGreaterThan(walkthrough)
  })

  it('names the mobile nav toggle for screen readers now that it renders an icon', () => {
    const html = renderHome()
    const toggle = sliceBetween(html, '<button type="button" class="cinematic-nav__toggle"', '</button>')
    expect(toggle).toContain('aria-label="Open menu"')
    expect(toggle).toContain('aria-expanded="false"')
    expect(toggle).toContain('cinematic-nav__toggle-icon')
    expect(toggle).toContain('aria-hidden="true"')
  })

  it('keeps original brand artwork and existing product routes', () => {
    const html = renderHome()
    expect(html).toContain('/brand/solvoops-horizontal-dark.png')
    expect(html).not.toContain('solvoops-horizontal-dark-alternate')
    expect(html).toContain('href="https://solvoplan.com/login"')
    expect(html).toContain('href="https://solvofind.com/login"')
    expect(html).toContain('href="https://solvobid.com/login"')
    expect(html).toContain('href="/privacy"')
    expect(html).toContain('href="/terms"')
    expect(html).toContain('Our approach')
    expect(html).toContain('href="#about"')
  })

  it('prerenders a polished static scene without active playback controls', () => {
    const html = renderHome()
    expect(html).toContain('/scene/aurora-sky.webp')
    expect(html).toContain('brand-scene__night')
    expect(html).toContain('data-running="false"')
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
