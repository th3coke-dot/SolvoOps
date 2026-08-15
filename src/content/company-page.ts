import { company } from './company'

export const companyPageContent = {
  label: 'Company',
  title: 'The operating entity behind SolvoOps',
  titleAccent: 'operating entity',
  lede: `${company.name} is the product brand for operational intelligence software. The marketing site and current commercial activity are operated by ${company.operator.legalName}, a Norwegian ${company.operator.formLabel.toLowerCase()}.`,
  secondaryLede:
    'This page states who you are dealing with, how to contact us, and how a pilot conversation starts. It does not create a contract.',
  identity: {
    label: 'Legal identity',
    title: 'Who operates SolvoOps today',
    titleAccent: 'today',
    facts: [
      {
        id: 'brand',
        title: 'Brand',
        body: company.name,
      },
      {
        id: 'operator',
        title: 'Operating entity',
        body: `${company.operator.legalName} (${company.operator.formLabel})`,
      },
      {
        id: 'orgnr',
        title: 'Organisation number',
        body: company.operator.organizationNumberLabel,
      },
      {
        id: 'country',
        title: 'Country',
        body: company.operator.country,
      },
      {
        id: 'contact',
        title: 'Contact',
        body: company.contactEmail,
      },
      {
        id: 'registry',
        title: 'Public register',
        body: `${company.operator.registryName} holds the official record for this organisation number.`,
      },
    ],
  },
  engage: {
    label: 'Working with us',
    title: 'Start with a defined operational bottleneck',
    titleAccent: 'operational bottleneck',
    copy: 'A pilot request opens a conversation. It does not create a binding commercial agreement. Do not send confidential customer data, credentials or contracts through the marketing form.',
    options: [
      {
        id: 'scope2plan',
        title: 'Scope2Plan',
        body: 'Turn a sanitised SOW into a delivery package, or explore Control for scope change.',
      },
      {
        id: 'partnerforge',
        title: 'PartnerForge',
        body: 'Test partner discovery, evidence and ranking against a real sourcing requirement.',
      },
    ],
  },
  documents: {
    label: 'Documents',
    title: 'Privacy, terms and founder context',
    titleAccent: 'founder context',
    copy: 'Privacy and Terms describe current marketing-site behaviour. They are interim copy pending counsel review.',
  },
} as const
