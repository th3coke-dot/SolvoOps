export type NavItem = {
  id: string
  label: string
  href: string
  children?: NavItem[]
  /** When true, item is secondary (footer / utility). */
  secondary?: boolean
}

/**
 * Primary navigation for the redesign shell.
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
  { id: 'labs', label: 'Labs', href: '/labs' },
]

export const secondaryNavigation: NavItem[] = [
  { id: 'company', label: 'Company', href: '/company', secondary: true },
  { id: 'pilot', label: 'Pilot', href: '/pilot', secondary: true },
  { id: 'privacy', label: 'Privacy', href: '/privacy', secondary: true },
  { id: 'terms', label: 'Terms', href: '/terms', secondary: true },
]

export const footerNavigation: NavItem[] = [
  ...primaryNavigation.filter((i) => i.id !== 'home'),
  ...primaryNavigation
    .find((i) => i.id === 'products')
    ?.children ?? [],
  ...secondaryNavigation,
]
