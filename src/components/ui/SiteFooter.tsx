import { NavLink } from 'react-router-dom'
import {
  company,
  primaryProducts,
  secondaryNavigation,
} from '../../content'
import { LinkButton } from './Button'
import './ui.css'

function FooterBrand() {
  return (
    <span className="ds-footer-brand-lockup">
      <span className="ds-brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <strong>{company.name}</strong>
    </span>
  )
}

export function SiteFooter() {
  const productLinks = [
    { id: 'products', label: 'Products', href: '/products' },
    ...primaryProducts.map((product) => ({
      id: product.id,
      label: product.name,
      href: product.route,
    })),
    { id: 'labs', label: 'Labs', href: '/labs' },
    { id: 'how-it-works', label: 'How It Works', href: '/how-it-works' },
    { id: 'about', label: 'About', href: '/about' },
  ]

  return (
    <footer className="ds-site-footer">
      <div className="ds-site-footer__band">
        <div className="ds-site-footer__inner">
          <div className="ds-site-footer__brand">
            <FooterBrand />
            <p>{company.tagline}</p>
          </div>
          <div className="ds-site-footer__cta">
            <p>Ready to test a real workflow?</p>
            <LinkButton to="/pilot" variant="primary" size="sm">
              Discuss a pilot
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="ds-site-footer__links">
        <nav className="ds-site-footer__nav" aria-label="Footer products">
          {productLinks.map((item) => (
            <NavLink key={item.id} to={item.href} end={item.href === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <nav className="ds-site-footer__nav ds-site-footer__nav--utility" aria-label="Footer utility">
          {secondaryNavigation.map((item) => (
            <NavLink key={item.id} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </footer>
  )
}
