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
    headline: 'Generate the package. Control the change.',
    description:
      'Scope2Plan Generate turns SOWs into delivery-ready project plans, runbooks and transition packs. Scope2Plan Control keeps the structured project model aligned as scopes and obligations change.',
    status: productStatusById.scope2plan,
    statusLabel: getStatusLabel(productStatusById.scope2plan),
    accent: 'scope2plan',
    productUrl: 'https://www.scope2plan.com',
    route: '/products/scope2plan',
    shortRoute: '/scope2plan',
    pilotUrl: '/pilot?product=scope2plan',
    bottleneck: 'Delivery planning from SOWs',
    availableCapabilities: [
      'SOW / scope intake (Generate)',
      'Structured project-model extraction (Generate)',
      'Project plan generation (Generate)',
      'Runbook / SOP generation (Generate)',
      'Transition pack generation (Generate)',
      'ITIL 4 and PMP-aligned artefacts (Generate)',
      'PDF / DOCX export (Generate)',
    ],
    pilotCapabilities: [],
    plannedCapabilities: [
      'Scope-version management (Control)',
      'Semantic scope comparison (Control)',
      'Change-impact analysis (Control)',
      'Linked project registers (Control)',
      'Versioned document regeneration (Control)',
      'Decision and evidence trail (Control)',
    ],
  },
  {
    id: 'partnerforge',
    name: 'PartnerForge',
    shortName: 'PartnerForge',
    tier: 'primary',
    category: 'Partner discovery and intelligence',
    headline: 'Ranked partner intelligence across regions',
    description:
      'PartnerForge helps organisations discover and evaluate delivery partners with multi-region search, project-document matching, geographic filters, evidence-backed profiles and explainable ranking that prioritises onboarded network partners.',
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
      'Filter-based search (country, category, reach, distance)',
      'Multi-region partner discovery',
      'Geographic intent resolution',
      'Explainable ranking signals',
    ],
    pilotCapabilities: [
      'Project-document matching to shortlist',
      'Structured candidate entity profiles',
      'Evidence and provenance attachment',
      'Onboarded network partner priority',
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
