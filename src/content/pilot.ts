import { company } from './company'
import { useCases } from './use-cases'

export const pilotPageContent = {
  label: 'Pilot',
  title: 'Test SolvoOps against a real workflow',
  lede: 'We work with organisations that want to test SolvoPlan, SolvoFind or SolvoBid against a defined operational challenge.',
  options: [
    { id: 'solvobid', title: 'SolvoBid', body: 'Review tender requirements and the evidence needed to answer them.' },
    {
      id: 'scope2plan',
      title: 'SolvoPlan',
      body: 'Generate a delivery package from a sanitised scope, or explore change control.',
    },
    {
      id: 'partnerforge',
      title: 'SolvoFind',
      body: 'Test partner discovery and shortlist quality against a sourcing requirement.',
    },
  ],
  confidentialityNotice:
    'Describe the workflow in general terms. Leave out confidential customer data, contracts, credentials and other people’s personal information.',
  formIntro:
    'This form prepares an email. Review it in your email app before sending.',
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
