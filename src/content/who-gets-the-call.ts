export const whoGetsTheCallUrls = {
  production: 'https://whogetsthecall.lol',
  claim: 'https://whogetsthecall.lol/claim',
  detail: '/marketplace/who-gets-the-call',
} as const

export const whoGetsTheCallPage = {
  eyebrow: 'SOLVOOPS MARKETPLACE',
  status: 'LIVE',
  name: 'Who Gets the Call?',
  headline: 'Who Gets the Call?',
  intro:
    'Four ways to get the job done. One visible sponsorship position per lane, per country.',
  body: [
    'Who Gets the Call? is a global paid-advertising marketplace built around four commercial lanes. Companies can claim a position using a website-only checkout and appear directly on the public map.',
    'A separate Providers directory helps visitors find companies by market and capability. Paid sponsorship and organic provider listings remain independent: buying a map position does not change provider ordering.',
  ],
  primaryCta: {
    label: 'Claim a lane',
    href: whoGetsTheCallUrls.claim,
  },
  secondaryCta: {
    label: 'Explore the map',
    href: whoGetsTheCallUrls.production,
  },
  lanes: [
    { name: 'Run it', category: 'Managed Services' },
    { name: 'Build it', category: 'Systems Integration' },
    { name: 'Power it', category: 'Software & Platforms' },
    { name: 'Source it', category: 'Talent & Staffing' },
  ],
  laneLine: 'Run it · Build it · Power it · Source it',
  howItWorks: {
    title: 'How it works',
    steps: [
      {
        title: 'Choose a country.',
        body: 'Pick the market where the company should appear on the map.',
      },
      {
        title: 'Choose one of four commercial lanes.',
        body: 'Run it, Build it, Power it, or Source it — one visible position per lane.',
      },
      {
        title: 'Submit the company website and complete the secure checkout.',
        body: 'Public customers do not create accounts. Payments are one-time sponsorship purchases.',
      },
      {
        title: 'The verified payment publishes the position on the map.',
        body: 'The claimed lane appears on the public map for that country.',
      },
    ],
  },
  providers: {
    title: 'Providers are different',
    body: 'The Providers directory is an organic company directory. Companies can apply without buying a sponsorship position. Paid sponsorship never changes provider ordering.',
  },
  ownership: 'Who Gets the Call? is built and operated by SolvoOps.',
  facts: [
    'Product: Who Gets the Call?',
    'Production URL: https://whogetsthecall.lol',
    'Status: Live',
    '168 countries',
    'Four lanes',
    '672 total country × lane positions',
    'Public customers do not create accounts',
    'Payments are one-time sponsorship purchases',
    'Map positions are paid advertising',
    'Provider applications are separate',
    'Paid money does not affect provider ordering',
  ],
} as const
