import {
  getStatusLabel,
  productStatusById,
  type ProductStatus,
} from './product-status'

export type ProductTier = 'primary' | 'labs'

export type ProductConfig = {
  id: string
  name: string
  shortName: string
  tier: ProductTier
  category: string
  headline: string
  description: string
  status: ProductStatus
  statusLabel: string
  accent?: string
  /** Public product environment URL — only when approved and accessible. */
  productUrl?: string
  route: string
  shortRoute?: string
  pilotUrl: string
  bottleneck?: string
  /** Capabilities confirmed for marketing as available / in pilot. */
  availableCapabilities: string[]
  /** Capabilities in active pilot only. */
  pilotCapabilities: string[]
  /** Capabilities that must be labelled planned. */
  plannedCapabilities: string[]
}

export const products: ProductConfig[] = [
  {
    id: 'scope2plan',
    name: 'Scope2Plan',
    shortName: 'Scope2Plan',
    tier: 'primary',
    category: 'Project planning and control',
    headline: 'From customer scope to controlled delivery',
    description:
      'Scope2Plan turns SOWs, project briefs and customer scopes into structured delivery plans and complete project packages, then helps teams maintain alignment as requirements change.',
    status: productStatusById.scope2plan,
    statusLabel: getStatusLabel(productStatusById.scope2plan),
    accent: 'scope2plan',
    productUrl: 'https://www.scope2plan.com',
    route: '/products/scope2plan',
    shortRoute: '/scope2plan',
    pilotUrl: '/pilot?product=scope2plan',
    bottleneck: 'Delivery planning from SOWs',
    availableCapabilities: [
      'SOW and scope intake',
      'Project package generation',
      'ITIL 4 and PMP-aligned planning artefacts',
      'Runbook / SOP generation',
      'Transition pack generation',
    ],
    pilotCapabilities: [],
    plannedCapabilities: [
      'Scope-version management (Control)',
      'Semantic scope comparison (Control)',
      'Change-impact analysis (Control)',
      'Linked project registers (Control)',
      'Versioned document regeneration (Control)',
    ],
  },
  {
    id: 'partnerforge',
    name: 'PartnerForge',
    shortName: 'PartnerForge',
    tier: 'primary',
    category: 'Partner discovery and intelligence',
    headline: 'Find delivery capability where you need it',
    description:
      'PartnerForge helps organisations discover, structure and evaluate potential delivery partners and freelancers using geographic intent, multi-source discovery, evidence and explainable ranking.',
    status: productStatusById.partnerforge,
    statusLabel: getStatusLabel(productStatusById.partnerforge),
    accent: 'partnerforge',
    productUrl: 'https://partnerforge.vercel.app',
    route: '/products/partnerforge',
    shortRoute: '/partnerforge',
    pilotUrl: '/pilot?product=partnerforge',
    bottleneck: 'Finding the right delivery partners',
    availableCapabilities: [
      'Natural-language requirement intake',
      'Geographic intent resolution',
      'Multi-source partner discovery',
      'Explainable ranking signals',
    ],
    pilotCapabilities: [
      'Structured candidate entity profiles',
      'Evidence and provenance attachment',
    ],
    plannedCapabilities: [
      'CRM projection',
      'Registry-backed enrichment where available',
    ],
  },
  {
    id: 'bizdayz',
    name: 'BizDayz',
    shortName: 'BizDayz',
    tier: 'labs',
    category: 'SolvoOps Labs',
    headline: 'Working-day and payroll math for planning',
    description:
      'Norwegian working days, public holidays, holiday pay, and employer cost — clear answers for planning and payroll without spreadsheet archaeology.',
    status: productStatusById.bizdayz,
    statusLabel: getStatusLabel(productStatusById.bizdayz),
    productUrl: 'https://www.bizdayz.com',
    route: '/labs',
    pilotUrl: '/pilot',
    bottleneck: 'Working-day and payroll math',
    availableCapabilities: [
      'Working-day calculation',
      'Public holiday calendars',
      'Holiday pay estimates',
      'Employer cost estimates',
    ],
    pilotCapabilities: [],
    plannedCapabilities: [],
  },
  {
    id: 'autoname',
    name: 'AutoName',
    shortName: 'AutoNameSearch',
    tier: 'labs',
    category: 'SolvoOps Labs',
    headline: 'Systematic naming without the guesswork',
    description:
      'A systematic naming pipeline: phonetic generation, domain checks, brand collision search, and ranked shortlists built for enterprise feel.',
    status: productStatusById.autoname,
    statusLabel: getStatusLabel(productStatusById.autoname),
    productUrl: 'https://www.autoname.pro',
    route: '/labs',
    pilotUrl: '/pilot',
    bottleneck: 'Naming without the guesswork',
    availableCapabilities: [
      'Phonetic candidate generation',
      'Domain availability checks',
      'Brand collision search',
      'Ranked shortlists',
    ],
    pilotCapabilities: [],
    plannedCapabilities: [],
  },
]

export const primaryProducts = products.filter((p) => p.tier === 'primary')
export const labsProducts = products.filter((p) => p.tier === 'labs')

export function getProductById(id: string): ProductConfig | undefined {
  return products.find((p) => p.id === id)
}

/** Homepage “demonstrated work” list still uses all four during transition. */
export const homepageDemoProducts = products.map((p) => ({
  name: p.name,
  href: p.productUrl ?? p.route,
  bottleneck: p.bottleneck ?? p.category,
  summary: p.description,
}))
