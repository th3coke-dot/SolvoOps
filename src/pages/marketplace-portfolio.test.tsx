import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import sitemap from '../../public/sitemap.xml?raw'
import { SiteFooter } from '../components/ui/SiteFooter'
import { SiteNav } from '../components/ui/SiteNav'
import { homepageContent, partnerforgePage, whoGetsTheCallPage } from '../content'
import { HomePage } from './HomePage'
import { PartnerForgePage } from './PartnerForgePage'
import { ProductsPage } from './ProductsPage'
import { Scope2PlanPage } from './Scope2PlanPage'
import { WhoGetsTheCallPage } from './WhoGetsTheCallPage'

function renderAt(ui: ReactElement, path = '/') {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>,
  )
}

const forbiddenPublicHosts = [
  'vercel.app',
  '.vercel.com',
  'preview',
  'whogetsthecall.vercel',
]

function publicHrefs(html: string) {
  return [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1])
}

describe('marketplace portfolio pages', () => {
  it('keeps Who Gets the Call? out of the homepage operational product stack', () => {
    const html = renderAt(<HomePage />)
    const productsStart = html.indexOf('02 / THE PRODUCTS')
    const marketplaceStart = html.indexOf('03 / THE MARKETPLACE')
    const labsStart = html.indexOf('home-labs-wrap')
    expect(productsStart).toBeGreaterThan(-1)
    expect(marketplaceStart).toBeGreaterThan(productsStart)
    expect(labsStart).toBeGreaterThan(marketplaceStart)

    const productsBlock = html.slice(productsStart, marketplaceStart)
    expect(productsBlock).toContain('Scope2Plan')
    expect(productsBlock).toContain('PartnerForge')
    expect(productsBlock).not.toContain('Who Gets the Call?')
    expect(productsBlock).not.toContain('BizDayz')

    const marketplaceBlock = html.slice(marketplaceStart, labsStart)
    expect(marketplaceBlock).toContain('Who Gets the Call?')
    expect(marketplaceBlock).toContain('LIVE')
    expect(marketplaceBlock).toContain(homepageContent.marketplace.headline)
    expect(marketplaceBlock).toContain('Run it · Build it · Power it · Source it')
    expect(marketplaceBlock).toContain('href="https://whogetsthecall.lol"')
    expect(marketplaceBlock).toContain('href="/marketplace/who-gets-the-call"')
    expect(marketplaceBlock).toContain('Visit the marketplace')
    expect(marketplaceBlock).not.toContain('Scope2Plan')
    expect(marketplaceBlock).not.toContain('href="/labs"')
  })

  it('separates Marketplace from operational products on the products page', () => {
    const html = renderAt(<ProductsPage />, '/products')
    const operational = html.slice(
      html.indexOf('id="operational-products"'),
      html.indexOf('id="marketplace-products"'),
    )
    const marketplace = html.slice(
      html.indexOf('id="marketplace-products"'),
      html.indexOf('id="labs-products"'),
    )
    const labs = html.slice(
      html.indexOf('id="labs-products"'),
      html.indexOf('ds-site-footer'),
    )

    expect(operational).toContain('Scope2Plan')
    expect(operational).toContain('PartnerForge')
    expect(operational).not.toContain('Who Gets the Call?')
    expect(marketplace).toContain('Who Gets the Call?')
    expect(marketplace).toContain('Live marketplace')
    expect(marketplace).toContain('Explore Who Gets the Call?')
    expect(marketplace).toContain('href="/marketplace/who-gets-the-call"')
    expect(marketplace).not.toContain('href="https://whogetsthecall.lol"')
    expect(marketplace).not.toContain('BizDayz')
    expect(labs).toContain('BizDayz')
    expect(labs).toContain('AutoName')
    expect(labs).not.toContain('Who Gets the Call?')
  })

  it('renders the internal marketplace detail route with the required copy and CTAs', () => {
    const html = renderAt(
      <WhoGetsTheCallPage />,
      '/marketplace/who-gets-the-call',
    )
    expect(html).toContain('SOLVOOPS MARKETPLACE')
    expect(html).toContain('Who Gets the Call?')
    expect(html).toContain(whoGetsTheCallPage.intro)
    expect(html).toContain('Run it — Managed Services')
    expect(html).toContain('Build it — Systems Integration')
    expect(html).toContain('Power it — Software &amp; Platforms')
    expect(html).toContain('Source it — Talent &amp; Staffing')
    expect(html).toContain('href="https://whogetsthecall.lol/claim"')
    expect(html).toContain('href="https://whogetsthecall.lol"')
    expect(html).toContain('Claim a lane')
    expect(html).toContain('Explore the map')
    expect(html).toContain(whoGetsTheCallPage.ownership)
    expect(html).not.toContain('/products/who-gets-the-call')
    expect(html).not.toContain('job board')
    expect(html).not.toContain('PartnerForge feature')
  })

  it('does not change PartnerForge internal routes or the Open PartnerForge destination', () => {
    const home = renderAt(<HomePage />)
    const products = renderAt(<ProductsPage />, '/products')
    const partnerforge = renderAt(<PartnerForgePage />, '/products/partnerforge')
    const scope2plan = renderAt(<Scope2PlanPage />, '/products/scope2plan')

    expect(home).toContain('href="/products/partnerforge"')
    expect(products).toContain('href="/products/partnerforge"')
    expect(partnerforge).toContain(`href="${partnerforgePage.secondaryCta.href}"`)
    expect(partnerforge).toContain('Open PartnerForge')
    expect(partnerforge).toContain('href="/pilot?product=partnerforge"')
    expect(scope2plan).toContain('Scope2Plan')
    expect(scope2plan).toContain('href="/pilot?product=scope2plan"')
    expect(partnerforgePage.secondaryCta.href).toBe(
      'https://partnerforge.solvoops.com/',
    )
  })

  it('groups desktop and mobile navigation without nesting Who Gets the Call? under Labs', () => {
    const html = renderAt(<SiteNav />)
    expect(html).toContain('Operational products')
    expect(html).toContain('Marketplace')
    expect(html).toContain('Who Gets the Call?')
    expect(html).toContain('href="/marketplace/who-gets-the-call"')
    expect(html).toContain('ds-site-nav__mobile-heading')
    expect(html).toContain('href="/labs"')
    expect(html).toContain('ds-site-nav__menu-heading')
    expect(html).toContain('ds-site-nav__mobile-heading')
  })

  it('adds a separate footer Marketplace entry', () => {
    const html = renderAt(<SiteFooter />)
    expect(html).toContain('Footer marketplace')
    expect(html).toContain('Who Gets the Call?')
    expect(html).toContain('href="/marketplace/who-gets-the-call"')
  })

  it('keeps public links on production domains and adds the sitemap entry', () => {
    const pages = [
      renderAt(<HomePage />),
      renderAt(<ProductsPage />, '/products'),
      renderAt(<WhoGetsTheCallPage />, '/marketplace/who-gets-the-call'),
      renderAt(<PartnerForgePage />, '/products/partnerforge'),
    ].join('\n')

    const hrefs = publicHrefs(pages).filter((href) => href.startsWith('http'))
    for (const href of hrefs) {
      if (href.includes('autonamesearch.vercel.app')) continue
      for (const host of forbiddenPublicHosts) {
        expect(href.toLowerCase()).not.toContain(host)
      }
    }

    expect(sitemap).toContain(
      'https://solvoops.com/marketplace/who-gets-the-call',
    )
    expect(sitemap).not.toContain('/products/who-gets-the-call')
    expect(sitemap).not.toContain('vercel.app')
  })
})
