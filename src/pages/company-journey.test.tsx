import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AboutPage, HowItWorksPage, LabsPage, PilotPage, PrivacyPage, TermsPage, NotFoundPage } from './CompanyPages'
import { legalDraftNotice, privacyPageContent, termsPageContent } from '../content/legal'

const render = (Page: typeof AboutPage, path: string) => renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><Page /></MemoryRouter>)
describe('company and utility journeys', () => {
  it.each([
    [AboutPage, '/about'], [HowItWorksPage, '/how-it-works'], [LabsPage, '/labs'],
    [PilotPage, '/pilot'], [PrivacyPage, '/privacy'], [TermsPage, '/terms'], [NotFoundPage, '/missing'],
  ] as const)('keeps a single accessible page frame at %s %s', (Page, path) => {
    const html = render(Page, path)
    expect(html.match(/<h1\b/g)).toHaveLength(1)
    expect(html.match(/<main\b/g)).toHaveLength(1)
    expect(html).toContain('ds-app--cinematic')
    expect(html).toContain('Skip to content')
    for (const href of ['/products', '/about', '/how-it-works', '/pilot', '/privacy', '/terms']) expect(html).toContain(`href="${href}"`)
    expect(html).not.toContain('ds-site-nav__mobile')
    expect(html).not.toContain('Scope2Plan')
  })
  it.each([[PrivacyPage, privacyPageContent], [TermsPage, termsPageContent]] as const)('retains every policy section and the interim notice', (Page, content) => {
    const html = render(Page, '/legal')
    const escaped = (s: string) => renderToStaticMarkup(<p>{s}</p>).slice(3, -4)
    expect(html).toContain(escaped(legalDraftNotice))
    for (const section of content.sections) {
      expect(html).toContain(escaped(section.title))
      expect(html).toContain(escaped(section.body))
    }
    expect(html).not.toContain('brand-scene__water')
  })
  it.each(['scope2plan', 'partnerforge', 'solvobid'])('preserves the selected pilot product %s', product => {
    const html = render(PilotPage, `/pilot?product=${product}`)
    expect(html).toContain(`value="${product}" selected=""`)
    expect(html).toContain('Prepare pilot email')
    expect(html).toContain('Review it in your email app before sending.')
  })
})
