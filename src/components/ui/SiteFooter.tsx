import { NavLink } from 'react-router-dom'
import {
  company,
  primaryProducts,
  secondaryNavigation,
} from '../../content'
import './ui.css'

export function SiteFooter() {
  const links = [
    { id: 'products', label: 'Products', href: '/products' },
    ...primaryProducts.map((product) => ({
      id: product.id,
      label: product.name,
      href: product.route,
    })),
    { id: 'how-it-works', label: 'How It Works', href: '/how-it-works' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'pilot', label: 'Pilot', href: '/pilot' },
    ...secondaryNavigation,
  ]

  return (
    <footer className="ds-site-footer">
      <div className="ds-site-footer__brand">
        <strong>{company.name}</strong>
        <p>{company.tagline}</p>
      </div>
      <nav className="ds-site-footer__nav" aria-label="Footer">
        {links.map((item) => (
          <NavLink key={item.id} to={item.href} end={item.href === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </footer>
  )
}
