export const homepageContent = {
  eyebrow: 'COMPLEXITY IN. CLARITY OUT.',
  headline: 'Clarity for complex delivery.',
  lede: 'Understand the bid. Plan the work. Find the right partners.',
  primaryCta: { label: 'Explore our products', href: '#products' },
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
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
    copy: 'SolvoPlan Generate and Control handle planning and change. SolvoFind handles partner intelligence. Labs explores adjacent tools.',
  },
  marketplace: {
    eyebrow: '03 / THE MARKETPLACE',
    status: 'LIVE',
    name: 'Who Gets the Call?',
    headline: 'Four lanes. Every country. One visible position per lane.',
    description:
      'Who Gets the Call? is a global paid-advertising marketplace where companies claim a visible position in one of four commercial lanes. A separate organic Providers directory helps visitors find companies by market and capability.',
    laneLine: 'Run it · Build it · Power it · Source it',
    facts: [
      '168 countries',
      '4 lanes per country',
      '672 positions',
      'No customer account required',
    ],
    primaryCta: {
      label: 'Visit the marketplace',
      href: 'https://whogetsthecall.lol',
    },
    secondaryCta: {
      label: 'See how it works',
      href: '/marketplace/who-gets-the-call',
    },
    disclosure:
      'Map positions are paid advertising. Provider listings are reviewed separately, and sponsorship does not affect provider ordering.',
  },
  labs: {
    label: 'SolvoOps Labs',
    title: 'Smaller tools from SolvoOps Labs',
    copy: 'BizDayz and AutoNameSearch explore adjacent workflows. Labs stays secondary to SolvoPlan and SolvoFind.',
    cta: { label: 'Explore Labs', href: '/labs' },
  },
  workflow: {
    label: 'Connected workflow',
    title: 'One delivery workflow. Specialised modules.',
    copy: 'SolvoPlan Generate creates the package. SolvoFind finds who can deliver. SolvoPlan Control keeps the model aligned as work changes.',
    note: 'Designed to support a connected delivery workflow.',
    steps: [
      {
        title: 'Intake the scope',
        body: 'Bring in the SOW or project brief that defines the work.',
      },
      {
        title: 'Generate the package',
        body: 'SolvoPlan Generate builds the structured project model and delivery artefacts — plan, runbook and transition pack.',
      },
      {
        title: 'Source delivery coverage',
        body: 'SolvoFind matches requirements to ranked partner shortlists with geography, evidence and onboarded-network priority.',
      },
      {
        title: 'Control the change',
        body: 'SolvoPlan Control tracks versions, impact and regenerated artefacts as the engagement evolves.',
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
        body: 'Adopt Generate, Control or SolvoFind where you need them — without replacing the whole stack.',
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
    copy: 'SolvoOps works with delivery organisations to test focused software against real workflows — SolvoPlan Generate, SolvoPlan Control and SolvoFind use cases.',
    primaryCta: { label: 'Discuss a pilot', href: '/pilot' },
    secondaryCta: { label: 'Explore SolvoPlan', href: '/products/scope2plan' },
  },
  heroFlow: [
    { id: 'scope', label: 'Scope', note: 'SOW intake' },
    { id: 'plan', label: 'Generate', note: 'SolvoPlan Generate' },
    { id: 'source', label: 'Source', note: 'SolvoFind' },
    { id: 'deliver', label: 'Deliver', note: 'Execution' },
    { id: 'control', label: 'Control', note: 'SolvoPlan Control' },
  ],
} as const
