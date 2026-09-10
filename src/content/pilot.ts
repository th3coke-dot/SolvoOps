import { company } from './company'
import { useCases } from './use-cases'

export const pilotPageContent = {
  label: 'Pilot',
  title: 'Test SolvoOps against a real workflow',
  lede: 'We work with organisations that want to test SolvoPlan, SolvoFind or SolvoBid against a defined operational challenge.',
  options: [
    { id: 'solvobid', title: 'SolvoBid pilot', body: 'Use a sanitised tender example to explore requirements, supporting evidence and the review workflow.' },
    {
      id: 'scope2plan',
      title: 'SolvoPlan Generate / Control pilot',
      body: 'Use a sanitised SOW to test Generate package creation, or explore Control for scope-versioning, change impact and governed updates.',
    },
    {
      id: 'partnerforge',
      title: 'SolvoFind pilot',
      body: 'Use a real sourcing requirement or project document to test multi-region discovery, filters, evidence quality, onboarded-network priority and ranking.',
    },
  ],
  confidentialityNotice:
    'Do not submit confidential customer information, contracts, credentials or personally identifiable third-party data through this form. Describe the workflow in general terms, or use a sanitised example.',
  formIntro:
    'Tell us enough to start a conversation. Submissions open your email client with a structured message to SolvoOps — nothing is stored in a new database from this site.',
  successTitle: 'Ready to send',
  successBody:
    'Your email client should open with a structured pilot request. If it does not, use the fallback link or email us directly.',
  mailtoFallbackLabel: `Email ${company.contactEmail}`,
} as const

export const pilotProductOptions = [
  { value: '', label: 'Select a product' },
  { value: 'scope2plan', label: 'SolvoPlan (Generate / Control)' },
  { value: 'partnerforge', label: 'SolvoFind' },
  { value: 'solvobid', label: 'SolvoBid' },
  { value: 'both', label: 'Both SolvoPlan and SolvoFind' },
  { value: 'unsure', label: 'Not sure yet' },
] as const

export const pilotContextOptions = [
  { value: '', label: 'Select a delivery context' },
  ...useCases.groups.map((group) => ({ value: group, label: group })),
  { value: 'other', label: 'Other / not listed' },
] as const

export type PilotFormValues = {
  name: string
  email: string
  organisation: string
  product: string
  context: string
  challenge: string
  /** Honeypot — must remain empty for human submissions. */
  website: string
}

export const emptyPilotFormValues = (): PilotFormValues => ({
  name: '',
  email: '',
  organisation: '',
  product: '',
  context: '',
  challenge: '',
  website: '',
})

export const pilotFormLimits = {
  nameMin: 2,
  nameMax: 120,
  organisationMin: 2,
  organisationMax: 160,
  challengeMin: 20,
  challengeMax: 1200,
} as const
