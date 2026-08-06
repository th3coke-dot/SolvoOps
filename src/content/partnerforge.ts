export const partnerforgePage = {
  label: 'PartnerForge',
  headline: 'Find delivery partners with evidence, context and control',
  lede: 'PartnerForge helps service-delivery and sourcing teams discover potential partners and freelancers by location and capability, structure the findings and understand why each result is relevant.',
  primaryCta: {
    label: 'Discuss a PartnerForge pilot',
    href: '/pilot?product=partnerforge',
  },
  secondaryCta: {
    label: 'View PartnerForge',
    href: 'https://partnerforge.vercel.app',
  },
  problem: {
    title: 'Partner discovery should not depend on repeated searches and individual memory',
    body: 'Traditional sourcing workflows are often fragmented across search engines, spreadsheets, registries, CRM records and individual employee knowledge. PartnerForge brings those steps into a structured discovery and intelligence process.',
  },
  workflow: [
    { title: 'Describe the requirement', body: 'Capture location, capability and delivery intent.' },
    { title: 'Resolve geography and intent', body: 'Interpret geographic and technical meaning before retrieval.' },
    { title: 'Search relevant sources', body: 'Combine configured public and approved internal sources.' },
    { title: 'Construct candidate entities', body: 'Normalise and deduplicate potential partners.' },
    { title: 'Attach evidence', body: 'Link supporting sources to relevant claims.' },
    { title: 'Rank deterministically', body: 'Score candidates with a stable, explainable core.' },
    { title: 'Review and shortlist', body: 'Keep humans in control of final selection.' },
  ],
  capabilities: [
    {
      title: 'Query understanding',
      body: 'PartnerForge interprets location, technical capability, delivery type and other search intent before retrieving candidates.',
    },
    {
      title: 'Multi-source discovery',
      body: 'Discovery can combine public web results, business registries, approved internal sources and other configured providers.',
    },
    {
      title: 'Entity intelligence',
      body: 'Potential partners are normalised, deduplicated and enriched into structured candidate profiles.',
    },
    {
      title: 'Evidence and provenance',
      body: 'Supporting sources can be attached to capabilities, locations and other relevant claims.',
    },
    {
      title: 'Explainable ranking',
      body: 'A deterministic scoring core helps keep ranking stable and understandable rather than relying exclusively on opaque AI output.',
    },
    {
      title: 'Geographic intelligence',
      body: 'Location resolution and geographic filtering help prevent irrelevant results from unrelated countries or regions.',
    },
    {
      title: 'Existing-system compatibility',
      body: 'PartnerForge can complement existing CRM and supplier-management systems rather than replacing them. Live CRM integration is not claimed unless separately confirmed.',
    },
  ],
  differentiation: {
    title: 'More than an AI web search',
    body: 'PartnerForge is designed as a structured discovery and intelligence workflow. Search results become normalised entities with evidence, relevance signals and explainable ranking.',
    points: [
      'Structured entity records',
      'Source provenance',
      'Geographic intent',
      'Registry-backed information where available',
      'Deterministic ranking',
      'Human review',
      'Reusable partner intelligence',
      'Optional CRM projection',
    ],
  },
  finalCta: {
    title: 'Test PartnerForge against a real sourcing requirement.',
    href: '/pilot?product=partnerforge',
    label: 'Discuss a PartnerForge pilot',
  },
} as const
