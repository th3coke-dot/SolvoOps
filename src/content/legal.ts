import { company } from './company'

/**
 * Temporary Privacy / Terms copy for production launch.
 * Owner-accepted 2026-08-06 as interim site policy text pending counsel review.
 * Not a substitute for a full counsel-reviewed legal pack.
 */
export const legalDraftNotice =
  'These pages summarise current SolvoOps.com marketing-site behaviour. They have been accepted for production as temporary Privacy and Terms copy pending counsel review.'

export const privacyPageContent = {
  label: 'Privacy',
  title: 'Privacy information',
  lede: 'How SolvoOps handles information collected through this marketing website.',
  sections: [
    {
      title: 'Who we are',
      body: `${company.name} is operated by ${company.operator.legalName}, org.nr. ${company.operator.organizationNumberLabel}. Contact: ${company.contactEmail}.`,
    },
    {
      title: 'What this site collects',
      body: 'If you use the pilot request form, your email client sends a message you compose to us. Fields may include name, work email, organisation, product of interest, delivery context and a short description of an operational challenge. Do not include confidential customer data, credentials or contracts.',
    },
    {
      title: 'What this site does not do',
      body: 'The marketing site does not create a new customer database from form submissions, does not accept file uploads, and does not store the free-text challenge description on SolvoOps servers as part of the form flow. Delivery is via email to our contact address.',
    },
    {
      title: 'Analytics',
      body: 'We may use Vercel Web Analytics to understand aggregate traffic and selected interaction events (for example that a pilot form was submitted). Event payloads are designed to exclude free-text message bodies.',
    },
    {
      title: 'Cookies and similar technologies',
      body: 'Essential hosting and security technologies may be used by our hosting provider. Analytics tooling may set or use first-party mechanisms according to the provider’s documentation.',
    },
    {
      title: 'External product sites',
      body: 'Links to Scope2Plan, PartnerForge, BizDayz, AutoNameSearch and other products leave this marketing site. Those products have their own environments and practices.',
    },
    {
      title: 'Contact',
      body: `Privacy questions: ${company.contactEmail}.`,
    },
  ],
} as const

export const termsPageContent = {
  label: 'Terms',
  title: 'Terms of use',
  lede: 'Baseline terms for using the SolvoOps marketing website.',
  sections: [
    {
      title: 'About this site',
      body: `${company.siteUrl} provides company and product information for ${company.name}, operated by ${company.operator.legalName}, org.nr. ${company.operator.organizationNumberLabel}. Product environments linked from this site may have separate terms.`,
    },
    {
      title: 'Informational content',
      body: 'Descriptions of products, capabilities and status labels are informational. Availability, features and pilot access may change. “Aligned” methodology language does not mean formal certification unless explicitly stated.',
    },
    {
      title: 'Pilot conversations',
      body: 'Submitting a pilot request starts a conversation; it does not create a binding commercial agreement. Do not submit confidential third-party information through the marketing form.',
    },
    {
      title: 'Acceptable use',
      body: 'Do not misuse the site, attempt to disrupt it, or use automated means to spam contact channels.',
    },
    {
      title: 'Intellectual property',
      body: 'Site content, branding and product names are owned by SolvoOps or their respective owners. You may not copy them for commercial use without permission.',
    },
    {
      title: 'Liability',
      body: 'The marketing site is provided as-is for informational purposes. To the extent permitted by law, SolvoOps is not liable for decisions made solely on the basis of marketing copy on this site.',
    },
    {
      title: 'Contact',
      body: `Questions: ${company.contactEmail}.`,
    },
  ],
} as const
