export const partnerforgePage = {
  label: 'PartnerForge',
  headline: 'Partner discovery with geography, evidence and ranked shortlists',
  lede: 'PartnerForge is a structured partner-intelligence workspace for service-delivery and sourcing teams. Describe a requirement, search with filters, or drop a project document — then review a ranked shortlist that prioritises onboarded network partners when they fit.',
  primaryCta: {
    label: 'Discuss a PartnerForge pilot',
    href: '/pilot?product=partnerforge',
  },
  secondaryCta: {
    label: 'Open PartnerForge',
    href: 'https://partnerforge.solvoops.com/',
  },
  problem: {
    title: 'Partner discovery should not depend on repeated searches and individual memory',
    body: 'Traditional sourcing is fragmented across search engines, spreadsheets, registries, CRM records and specialist knowledge. PartnerForge turns that into a controlled discovery workflow spanning intent, multi-source retrieval, entity intelligence, evidence, explainable ranking and a human-approved shortlist.',
  },
  coverage: {
    title: 'Built for multi-region delivery coverage',
    body: 'Search partners across Europe, North America, South America, Asia and the Middle East. Narrow by country, category, reach, distance and network status — or start from a free-text requirement.',
    regions: [
      'Europe',
      'North America',
      'South America',
      'Asia',
      'Middle East',
    ],
  },
  workflow: [
    {
      title: 'Describe the requirement',
      body: 'Use natural language, structured filters, or both — location, capability, delivery type and reach.',
    },
    {
      title: 'Or match from a project document',
      body: 'Drop a project document to derive a ranked shortlist from real delivery intent.',
    },
    {
      title: 'Resolve geography and intent',
      body: 'Interpret geographic and technical meaning before retrieval so results stay relevant.',
    },
    {
      title: 'Search configured sources',
      body: 'Combine public, registry and approved internal sources where available.',
    },
    {
      title: 'Construct candidate entities',
      body: 'Normalise, deduplicate and enrich partners into structured profiles.',
    },
    {
      title: 'Attach evidence',
      body: 'Link supporting sources to capabilities, locations and other claims.',
    },
    {
      title: 'Rank with an explainable core',
      body: 'Score candidates deterministically; onboarded network partners rise when they fit.',
    },
    {
      title: 'Review and shortlist',
      body: 'Keep humans in control of final selection and next commercial steps.',
    },
  ],
  capabilities: [
    {
      title: 'Requirement intake',
      body: 'Free-text search, filter-only search, or project-document matching for ranked shortlists.',
    },
    {
      title: 'Geographic intelligence',
      body: 'Country, region, reach and distance controls help prevent irrelevant results from the wrong markets.',
    },
    {
      title: 'Multi-source discovery',
      body: 'Discovery can combine public web results, business registries, approved internal sources and configured providers.',
    },
    {
      title: 'Entity intelligence',
      body: 'Potential partners become normalised, deduplicated candidate profiles rather than raw search hits.',
    },
    {
      title: 'Evidence and provenance',
      body: 'Supporting sources can be attached to capabilities, locations and other relevant claims.',
    },
    {
      title: 'Explainable ranking',
      body: 'A deterministic scoring core keeps ranking stable and understandable — not only opaque AI output.',
    },
    {
      title: 'Onboarded network priority',
      body: 'When onboarded partners match the requirement, they are prioritised in the shortlist.',
    },
    {
      title: 'Existing-system compatibility',
      body: 'PartnerForge complements CRM and supplier-management systems. Live CRM projection remains planned unless separately confirmed.',
    },
  ],
  differentiation: {
    title: 'More than an AI web search',
    body: 'PartnerForge is a partner-intelligence system: search becomes structured entities with geography, evidence, network status and explainable ranking.',
    points: [
      'Multi-region coverage',
      'Filter + natural-language search',
      'Project-document matching',
      'Structured entity records',
      'Source provenance',
      'Onboarded partner priority',
      'Deterministic ranking',
      'Human review',
      'Optional CRM projection',
    ],
  },
  finalCta: {
    title: 'Test PartnerForge against a real sourcing requirement.',
    href: '/pilot?product=partnerforge',
    label: 'Discuss a PartnerForge pilot',
  },
} as const
