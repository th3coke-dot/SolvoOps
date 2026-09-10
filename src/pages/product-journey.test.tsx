import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Scope2PlanPage } from './Scope2PlanPage'
import { PartnerForgePage } from './PartnerForgePage'
import { SolvoBidPage } from './SolvoBidPage'

describe('corporate product pages', () => {
  it.each([
    ['SolvoPlan', Scope2PlanPage, '/products/scope2plan', 'https://solvoplan.com', 'scope2plan'],
    ['SolvoFind', PartnerForgePage, '/products/partnerforge', 'https://solvofind.com', 'partnerforge'],
    ['SolvoBid', SolvoBidPage, '/products/solvobid', 'https://solvobid.com', 'solvobid'],
  ] as const)('%s explains the product and offers distinct tool and pilot destinations', (name, Page, route, tool, pilot) => {
    const html = renderToStaticMarkup(<MemoryRouter initialEntries={[route]}><Page /></MemoryRouter>)
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html).toContain(name)
    expect(html).toContain('product-scene-hero')
    expect(html).toContain('Example workspace')
    expect(html).toContain(`href="${tool}"`)
    expect(html).toContain(`Open ${name}`)
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).toContain(`href="/pilot?product=${pilot}"`)
    expect(html).toContain('Discuss a pilot')
    expect(html).toContain('href="/#products"')
    expect(html).toContain('/brand/solvoops-horizontal-dark.png')
    expect(html).not.toContain('Scope2Plan')
    expect(html).not.toContain('PartnerForge')
  })
})
