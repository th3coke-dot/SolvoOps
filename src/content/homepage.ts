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
    copy: 'Each SolvoOps product solves a specific operational bottleneck while remaining compatible with the systems organisations already use.',
  },
  workflow: {
    label: 'Connected workflow',
    title: 'One delivery workflow. Two specialised products.',
    copy: 'Scope2Plan and PartnerForge solve different parts of the same operational process.',
    note: 'Designed to support a connected delivery workflow.',
    steps: [
      {
        title: 'Understand the work',
        body: 'Scope2Plan Generate interprets the source material and creates a structured project model.',
      },
      {
        title: 'Build the delivery plan',
        body: 'Generate creates the required project documents, responsibilities, milestones, risks and governance package.',
      },
      {
        title: 'Identify delivery coverage',
        body: 'PartnerForge uses the structured requirements to identify relevant partner and freelancer candidates by location and capability.',
      },
      {
        title: 'Maintain project control',
        body: 'Scope2Plan Control tracks scope versions, changes, dependencies, decisions, evidence and affected project documentation.',
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
        body: 'Organisations can adopt the product they need without replacing their entire technology stack.',
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
    copy: 'SolvoOps works with delivery organisations to test focused software against real workflows. We are particularly interested in project initiation, scope control, partner discovery and delivery-governance use cases.',
    primaryCta: { label: 'Discuss a pilot', href: '/pilot' },
    secondaryCta: { label: 'Explore Scope2Plan', href: '/products/scope2plan' },
  },
  heroFlow: [
    { id: 'scope', label: 'Scope', note: 'Intake' },
    { id: 'plan', label: 'Plan', note: 'Scope2Plan Generate' },
    { id: 'source', label: 'Source', note: 'PartnerForge' },
    { id: 'deliver', label: 'Deliver', note: 'Execution' },
    { id: 'control', label: 'Control', note: 'Scope2Plan Control' },
  ],
} as const
