export type NavItem = {
  id: string
  label: string
  href: string
  children?: NavItem[]
  /** When true, item is secondary (footer / utility). */
  secondary?: boolean
}

/**
 * Target primary navigation for the redesign shell (PR 4+).
 * Homepage continues to use legacy hash nav until the shell ships.
 */
export const primaryNavigation: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    children: [
      { id: 'scope2plan', label: 'Scope2Plan', href: '/products/scope2plan' },
      {
        id: 'partnerforge',
        label: 'PartnerForge',
        href: '/products/partnerforge',
      },
    ],
  },
  { id: 'how-it-works', label: 'How It Works', href: '/how-it-works' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'pilot', label: 'Pilot', href: '/pilot' },
]

export const secondaryNavigation: NavItem[] = [
  { id: 'labs', label: 'Labs', href: '/labs', secondary: true },
  { id: 'privacy', label: 'Privacy', href: '/privacy', secondary: true },
  { id: 'terms', label: 'Terms', href: '/terms', secondary: true },
]

/** Current production homepage anchors — preserved until PR 5. */
export const legacyHomeNavigation: NavItem[] = [
  { id: 'brand', label: 'SolvoOps', href: '#top' },
  { id: 'work', label: 'Work', href: '#work' },
]

export const footerNavigation: NavItem[] = [
  ...primaryNavigation.filter((i) => i.id !== 'home'),
  ...primaryNavigation
    .find((i) => i.id === 'products')
    ?.children ?? [],
  ...secondaryNavigation,
]
