import { company } from './company'
import { getProductById } from './products'

export type PageMetadata = {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

const defaultTitle = `${company.name} | From operational complexity to controlled execution`
const defaultDescription =
  'SolvoOps builds focused software for project planning, scope control, partner discovery and complex service-delivery workflows.'

export const siteMetadata = {
  siteName: company.name,
  siteUrl: company.siteUrl,
  locale: 'en',
  ogLocale: 'en_GB',
  ogImagePath: '/og-default.png',
  defaultTitle,
  defaultDescription,
  /** Current production homepage metadata until PR 5 / PR 10 cutover. */
  legacyHome: {
    title: 'SolvoOps — Tools that solve operational bottlenecks',
    description:
      'SolvoOps builds tools that solve operational bottlenecks — demonstrated with Scope2Plan, BizDayz, PartnerForge, and AutoName.',
  },
} as const

export const pagesMetadata: Record<string, PageMetadata> = {
  home: {
    path: '/',
    title: 'SolvoOps | From operational complexity to controlled execution',
    description:
      'SolvoOps builds focused software for project planning, scope control, partner discovery and complex service-delivery workflows.',
  },
  products: {
    path: '/products',
    title: `Products | ${company.name}`,
    description:
      'Explore SolvoOps operational products — Scope2Plan and PartnerForge — and the Who Gets the Call? marketplace.',
  },
  whoGetsTheCall: {
    path: '/marketplace/who-gets-the-call',
    title: 'Who Gets the Call? | SolvoOps Marketplace',
    description:
      'A global paid sponsorship map with four commercial lanes in every country, built by SolvoOps.',
  },
  scope2plan: {
    path: '/products/scope2plan',
    title: 'Scope2Plan | Generate and Control for Delivery',
    description:
      'Scope2Plan Generate turns SOWs into project plans, runbooks and transition packs. Scope2Plan Control keeps the project model aligned as work changes.',
  },
  partnerforge: {
    path: '/products/partnerforge',
    title: 'PartnerForge | Partner Intelligence and Ranked Shortlists',
    description:
      'Discover and evaluate delivery partners with multi-region search, project-document matching, evidence and explainable ranking.',
  },
  howItWorks: {
    path: '/how-it-works',
    title: `How It Works | ${company.name}`,
    description:
      'How SolvoOps turns fragmented operational workflows into structured, repeatable software systems.',
  },
  about: {
    path: '/about',
    title: `About | ${company.name}`,
    description:
      'SolvoOps was founded by Morten to turn complex operational work into focused, repeatable software systems.',
  },
  labs: {
    path: '/labs',
    title: `SolvoOps Labs | ${company.name}`,
    description:
      'Smaller tools and experiments from SolvoOps, including BizDayz and AutoNameSearch.',
  },
  pilot: {
    path: '/pilot',
    title: `Discuss a pilot | ${company.name}`,
    description:
      'Test Scope2Plan Generate, Scope2Plan Control or PartnerForge against a real operational workflow.',
  },
  privacy: {
    path: '/privacy',
    title: `Privacy | ${company.name}`,
    description:
      'How SolvoOps handles information collected through the marketing website and pilot request flow.',
  },
  terms: {
    path: '/terms',
    title: `Terms | ${company.name}`,
    description: 'Terms of use for the SolvoOps marketing website.',
  },
  notFound: {
    path: '/404',
    title: `Page not found | ${company.name}`,
    description: 'The requested page could not be found.',
    noIndex: true,
  },
}

export function metadataForProduct(productId: string): PageMetadata | undefined {
  const product = getProductById(productId)
  if (!product) return undefined
  if (productId === 'who-gets-the-call') return pagesMetadata.whoGetsTheCall
  return pagesMetadata[productId === 'scope2plan' ? 'scope2plan' : productId]
}
