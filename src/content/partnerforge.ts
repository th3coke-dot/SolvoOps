export const partnerforgePage = {
  label: 'SolvoFind',
  headline: 'Partner discovery with geography, evidence and ranked shortlists',
  lede: 'Describe the requirement and search by location and capability. Review ranked partners before choosing who to contact.',
  primaryCta: {
    label: 'Discuss a SolvoFind pilot',
    href: '/pilot?product=partnerforge',
  },
  secondaryCta: {
    label: 'Open SolvoFind',
    href: 'https://solvofind.com',
  },
  problem: {
    title: 'Bring partner research into one place',
    body: 'Compare candidate profiles and ranking signals in one workspace, with supporting evidence available in pilot.',
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
    { title: 'Describe the requirement', body: 'Use natural language and filters for location, capability and reach. Project-document matching is available in pilot.' },
    { title: 'Compare candidates', body: 'Review structured profiles and ranking signals. Evidence attachment and onboarded-network priority are pilot capabilities.' },
    { title: 'Build the shortlist', body: 'Check the fit and choose which partners to contact.' },
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
      body: 'SolvoFind complements CRM and supplier-management systems. Live CRM projection remains planned unless separately confirmed.',
    },
  ],
  differentiation: {
    title: 'More than an AI web search',
    body: 'SolvoFind is a partner-intelligence system: search becomes structured entities with geography, evidence, network status and explainable ranking.',
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
    title: 'Test SolvoFind against a real sourcing requirement.',
    href: '/pilot?product=partnerforge',
    label: 'Discuss a SolvoFind pilot',
  },
} as const
