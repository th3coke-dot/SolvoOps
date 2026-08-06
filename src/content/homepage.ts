export const homepageContent = {
  eyebrow: 'Operational intelligence software',
  headline: 'From operational complexity to controlled execution',
  lede: 'SolvoOps builds focused software that helps delivery organisations turn scopes into executable plans, find qualified partners and maintain control as projects change.',
  primaryCta: { label: 'Explore our products', href: '#products' },
  secondaryCta: { label: 'Discuss a pilot', href: '/pilot' },
  problem: {
    label: 'The operational problem',
    title: 'Complex delivery still depends on fragmented manual work',
    copy: 'Important delivery workflows are still spread across documents, spreadsheets, email, web searches and individual employee knowledge. This creates delays, inconsistent outputs and unnecessary operational risk.',
    items: [
      {
        title: 'Manual project initiation',
        body: 'Project managers and delivery teams repeatedly interpret scopes and create the same planning documents from scratch.',
      },
      {
        title: 'Fragmented partner sourcing',
        body: 'Finding qualified delivery partners often requires repeated web searches, manual validation and knowledge held by individual sourcing specialists.',
      },
      {
        title: 'Disconnected project control',
        body: 'As scopes change, plans, risks, responsibilities and customer obligations quickly become inconsistent.',
      },
    ],
  },
  products: {
    label: 'Products',
    title: 'Focused products for critical delivery workflows',
    copy: 'Scope2Plan Generate and Control handle planning and change. PartnerForge handles partner intelligence. Labs explores adjacent tools.',
  },
  labs: {
    label: 'SolvoOps Labs',
    title: 'Smaller tools from SolvoOps Labs',
    copy: 'BizDayz and AutoNameSearch explore adjacent workflows. Labs stays secondary to Scope2Plan and PartnerForge.',
    cta: { label: 'Explore Labs', href: '/labs' },
  },
  workflow: {
    label: 'Connected workflow',
    title: 'One delivery workflow. Specialised modules.',
    copy: 'Scope2Plan Generate creates the package. PartnerForge finds who can deliver. Scope2Plan Control keeps the model aligned as work changes.',
    note: 'Designed to support a connected delivery workflow.',
    steps: [
      {
        title: 'Intake the scope',
        body: 'Bring in the SOW or project brief that defines the work.',
      },
      {
        title: 'Generate the package',
        body: 'Scope2Plan Generate builds the structured project model and delivery artefacts — plan, runbook and transition pack.',
      },
      {
        title: 'Source delivery coverage',
        body: 'PartnerForge matches requirements to ranked partner shortlists with geography, evidence and onboarded-network priority.',
      },
      {
        title: 'Control the change',
        body: 'Scope2Plan Control tracks versions, impact and regenerated artefacts as the engagement evolves.',
      },
    ],
  },
  why: {
    label: 'Why SolvoOps',
    title: 'Built around the workflow, not the hype',
    principles: [
      {
        title: 'Domain-focused',
        body: 'Each product is designed around a clearly defined operational problem.',
      },
      {
        title: 'Explainable',
        body: 'Important outputs should be supported by structured data, evidence and understandable reasoning.',
      },
      {
        title: 'Human-controlled',
        body: 'AI can propose, structure and accelerate work, but users remain in control of important decisions.',
      },
      {
        title: 'Compatible',
        body: 'SolvoOps products are designed to complement established project, CRM and service-management systems.',
      },
      {
        title: 'Modular',
        body: 'Adopt Generate, Control or PartnerForge where you need them — without replacing the whole stack.',
      },
      {
        title: 'Continuously improving',
        body: 'Real workflow feedback is used to improve quality, relevance and operational value.',
      },
    ],
  },
  audience: {
    label: 'Built for delivery organisations',
    title: 'Designed for organisations where delivery complexity has a real cost',
  },
  pilot: {
    label: 'Pilot',
    title: 'Bring us an operational bottleneck',
    copy: 'SolvoOps works with delivery organisations to test focused software against real workflows — Scope2Plan Generate, Scope2Plan Control and PartnerForge use cases.',
    primaryCta: { label: 'Discuss a pilot', href: '/pilot' },
    secondaryCta: { label: 'Explore Scope2Plan', href: '/products/scope2plan' },
  },
  heroFlow: [
    { id: 'scope', label: 'Scope', note: 'SOW intake' },
    { id: 'plan', label: 'Generate', note: 'Scope2Plan Generate' },
    { id: 'source', label: 'Source', note: 'PartnerForge' },
    { id: 'deliver', label: 'Deliver', note: 'Execution' },
    { id: 'control', label: 'Control', note: 'Scope2Plan Control' },
  ],
} as const
