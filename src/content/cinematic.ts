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

export const cinematicHero = {
  eyebrow: 'COMPLEXITY IN. CLARITY OUT.',
  headline: 'Clarity for complex delivery.',
  lede: 'Understand the bid. Plan the work. Find the right partners.',
  primaryCta: { label: 'Explore our products', href: '#products' },
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
  pilotCta: { label: 'Discuss a pilot', href: '/pilot' },
} as const

export const cinematicProducts = [
  {
    id: 'solvoplan',
    name: 'SolvoPlan',
    technicalId: 'scope2plan',
    href: '/products/scope2plan',
    description: 'Turn scope into clear tasks, owners and milestones.',
    rails: ['PLAN', 'STRUCTURE', 'CONTROL'],
    exampleLabel: 'Example',
    exampleKind: 'plan',
  },
  {
    id: 'solvofind',
    name: 'SolvoFind',
    technicalId: 'partnerforge',
    href: '/products/partnerforge',
    description: 'Discover and evaluate the right delivery partners.',
    rails: ['SEARCH', 'COMPARE', 'DECIDE'],
    exampleLabel: 'Example',
    exampleKind: 'find',
  },
  {
    id: 'solvobid',
    name: 'SolvoBid',
    technicalId: 'solvobid',
    href: '/pilot?product=solvobid',
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

export const cinematicAbout = {
  eyebrow: 'OUR MISSION',
  title: 'A more capable delivery industry.',
  body: 'SolvoOps builds focused software that helps delivery organisations turn scopes into executable plans, find qualified partners and maintain control as projects change.',
  cta: { label: 'About SolvoOps', href: '/about' },
} as const
