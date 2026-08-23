export type NavItem = {
  id: string
  label: string
  href: string
  children?: NavItem[]
  /** When true, item is secondary (footer / utility). */
  secondary?: boolean
}

export type NavGroup = {
  id: string
  label: string
  items: NavItem[]
}

export const productsNavGroups: NavGroup[] = [
  {
    id: 'operational-products',
    label: 'Operational products',
    items: [
      { id: 'scope2plan', label: 'Scope2Plan', href: '/products/scope2plan' },
      { id: 'partnerforge', label: 'PartnerForge', href: '/products/partnerforge' },
    ],
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    items: [
      {
        id: 'who-gets-the-call',
        label: 'Who Gets the Call?',
        href: '/marketplace/who-gets-the-call',
      },
    ],
  },
  {
    id: 'labs',
    label: 'Labs',
    items: [{ id: 'labs-destination', label: 'Labs', href: '/labs' }],
  },
]

/**
 * Primary navigation for the redesign shell.
 */
export const primaryNavigation: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    children: productsNavGroups.flatMap((group) => group.items),
  },
  { id: 'how-it-works', label: 'How It Works', href: '/how-it-works' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'labs', label: 'Labs', href: '/labs' },
]

export const secondaryNavigation: NavItem[] = [
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
