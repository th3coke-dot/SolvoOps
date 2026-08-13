import { NavLink } from 'react-router-dom'
import {
  primaryProducts,
  secondaryNavigation,
} from '../../content'
import './ui.css'

function FooterBrand() {
  return (
    <span className="ds-footer-brand-lockup">
      <img
        className="ds-brand-logo ds-brand-logo--footer"
        src="/brand/solvoops-horizontal-dark.png"
        alt="SolvoOps"
        width={1853}
        height={559}
        decoding="async"
      />
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
