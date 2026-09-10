export const cinematicBrandAssets = {
  logoDark: '/brand/solvoops-horizontal-dark.png',
  logoLight: '/brand/solvoops-horizontal-light.png',
  favicon: '/favicon.svg',
  hashes: {
    logoDark:
      'e8903eb09401215f5c914048c46d8c667daa5097f8067cb08748375e97920906',
    logoLight:
      '4b36275fb0138a77d265dfe8a1370dbd16bc54c2f8982307489a367abda5851c',
    favicon:
      '80160bdcb31b7f765786c7049aae40110c1bd917882578c13466223457b05b0d',
  },
} as const

export const cinematicSceneAssets = {
  sunset: '/scene/sunset.jpg',
  dusk: '/scene/dusk.jpg',
  blueHour: '/scene/blue-hour.jpg',
} as const

export const cinematicNav = [
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'approach', label: 'Our approach', href: '#how-it-works' },
  { id: 'about', label: 'About', href: '#about' },
] as const

export type HeroHeadlineTone = 'light' | 'gold'

export type HeroHeadlineLine = {
  readonly id: string
  readonly text: string
  readonly tone: HeroHeadlineTone
}

export const cinematicHero = {
  eyebrow: 'COMPLEXITY IN. CLARITY OUT.',
  headlineLines: [
    { id: 'lead', text: 'Clarity for', tone: 'light' },
    { id: 'accent', text: 'complex delivery.', tone: 'gold' },
  ] as const satisfies readonly HeroHeadlineLine[],
  lede: 'Understand the bid. Plan the work. Find the right partners.',
  primaryCta: { label: 'Explore our products', href: '#products' },
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
  pilotCta: { label: 'Discuss a pilot', href: '/pilot' },
} as const

export const cinematicHeroHeadline = cinematicHero.headlineLines
  .map((line) => line.text)
  .join(' ')

export const cinematicProducts = [
  {
    id: 'solvoplan',
    name: 'SolvoPlan',
    technicalId: 'scope2plan',
    href: 'https://solvoplan.com/login',
    description: 'Turn scope into clear tasks, owners and milestones.',
    rails: ['PLAN', 'STRUCTURE', 'CONTROL'],
    exampleLabel: 'Example',
    exampleKind: 'plan',
  },
  {
    id: 'solvofind',
    name: 'SolvoFind',
    technicalId: 'partnerforge',
    href: 'https://solvofind.com/login',
    description: 'Discover and evaluate the right delivery partners.',
    rails: ['SEARCH', 'COMPARE', 'DECIDE'],
    exampleLabel: 'Example',
    exampleKind: 'find',
  },
  {
    id: 'solvobid',
    name: 'SolvoBid',
    technicalId: 'solvobid',
    href: 'https://solvobid.com/login',
    description: 'Understand tender requirements. Prepare your response.',
    rails: ['DECRYPT', 'REVIEW', 'RESPOND'],
    exampleLabel: 'Example',
    exampleKind: 'bid',
  },
] as const

export type CinematicProduct = (typeof cinematicProducts)[number]
export type CinematicExampleKind = CinematicProduct['exampleKind']

export const cinematicBenefits = [
  {
    id: 'decisions',
    title: 'Clearer decisions',
    body: 'Turn information into insight.',
  },
  {
    id: 'delivery',
    title: 'Structured delivery',
    body: 'Work with the right partners.',
  },
  {
    id: 'evidence',
    title: 'Evidence in view',
    body: 'Greater confidence at every step.',
  },
] as const

export type WalkthroughStep = {
  readonly id: string
  readonly index: string
  readonly product: string
  readonly question: string
  readonly summary: string
  readonly moves: readonly string[]
  readonly linkLabel: string
  readonly href: string
}

export const cinematicWalkthrough = {
  eyebrow: 'HOW IT WORKS',
  title: 'One thread from tender to delivery.',
  lede: 'Understand what is required. Structure the work. Find the people to deliver it. Choose the tool that fits the decision in front of you.',
  steps: [
    {
      id: 'understand',
      index: '01',
      product: 'SolvoBid',
      question: 'What is this tender actually asking for?',
      summary: 'Read the pack once. SolvoBid pulls the requirements out and keeps each one beside the evidence that answers it.',
      moves: [
        'Extract requirements from the tender pack',
        'Attach the evidence that answers each one',
        'Track review state before you respond',
      ],
      linkLabel: 'Open SolvoBid',
      href: 'https://solvobid.com/login',
    },
    {
      id: 'plan',
      index: '02',
      product: 'SolvoPlan',
      question: 'What does delivering it look like?',
      summary: 'Turn the accepted scope into something a delivery team can run, structured rather than written out in prose.',
      moves: [
        'Read the SOW into a structured project model',
        'Generate the plan, runbook and transition pack',
        'Export the package to PDF or DOCX',
      ],
      linkLabel: 'Open SolvoPlan',
      href: 'https://solvoplan.com/login',
    },
    {
      id: 'find',
      index: '03',
      product: 'SolvoFind',
      question: 'Who delivers it with you?',
      summary: 'Search the partner network against the requirement and compare candidates on evidence you can read back.',
      moves: [
        'Describe the requirement in plain language',
        'Filter by country, category, reach and distance',
        'Read the ranking signals behind each candidate',
      ],
      linkLabel: 'Open SolvoFind',
      href: 'https://solvofind.com/login',
    },
  ],
} as const satisfies { eyebrow: string; title: string; lede: string; steps: readonly WalkthroughStep[] }

export const cinematicAbout = {
  eyebrow: 'OUR MISSION',
  title: 'A more capable delivery industry.',
  body: 'SolvoOps builds focused software that helps delivery organisations turn scopes into executable plans, find qualified partners and maintain control as projects change.',
  cta: { label: 'About SolvoOps', href: '/about' },
} as const
