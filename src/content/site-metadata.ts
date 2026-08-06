import { company } from './company'
import { getProductById } from './products'

export type PageMetadata = {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

const defaultTitle = `${company.name} | Operational Intelligence for Service Delivery`
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
    title: 'SolvoOps | Operational Intelligence for Service Delivery',
    description:
      'SolvoOps builds focused software for project planning, scope control, partner discovery and complex service-delivery workflows.',
  },
  products: {
    path: '/products',
    title: `Products | ${company.name}`,
    description:
      'Explore Scope2Plan and PartnerForge — focused SolvoOps products for planning, control and partner intelligence.',
  },
  scope2plan: {
    path: '/products/scope2plan',
    title: 'Scope2Plan | From Project Scope to Controlled Delivery',
    description:
      'Turn SOWs and project scopes into structured plans, complete project packages and controlled project lifecycles.',
  },
  partnerforge: {
    path: '/products/partnerforge',
    title: 'PartnerForge | Partner Discovery and Intelligence',
    description:
      'Discover and evaluate delivery partners using geographic intent, structured evidence and explainable ranking.',
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
    description: company.mission,
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
      'Test Scope2Plan or PartnerForge against a real operational workflow.',
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
  return pagesMetadata[productId === 'scope2plan' ? 'scope2plan' : productId]
}
