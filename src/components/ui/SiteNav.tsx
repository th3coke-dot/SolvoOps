import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company, primaryNavigation, type NavItem } from '../../content'
import { LinkButton } from './Button'
import './ui.css'

type SiteNavProps = {
  showPilotCta?: boolean
}

function isActivePath(pathname: string, href: string, end = false) {
  if (end) return pathname === href
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNav({ showPilotCta = true }: SiteNavProps) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const menuId = useId()
  const productsId = useId()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpen(false)
    setProductsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open && !productsOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setProductsOpen(false)
      }
    }
    const onPointer = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setProductsOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onPointer)
    }
  }, [open, productsOpen])

  const close = () => {
    setOpen(false)
    setProductsOpen(false)
  }

  const productsItem = primaryNavigation.find((item) => item.id === 'products')

  return (
    <header className="ds-shell-header" ref={headerRef}>
      <div className="ds-site-nav">
        <Link className="ds-site-nav__brand" to="/" onClick={close}>
          {company.name}
        </Link>

        <nav className="ds-site-nav__desktop" aria-label="Primary">
          {primaryNavigation.map((item) =>
            item.children?.length ? (
              <div
                key={item.id}
                className="ds-site-nav__dropdown"
                data-open={productsOpen ? 'true' : 'false'}
              >
                <button
                  type="button"
                  className="ds-site-nav__link ds-site-nav__trigger"
                  aria-expanded={productsOpen}
                  aria-controls={productsId}
                  aria-current={
                    isActivePath(location.pathname, item.href) ? 'page' : undefined
                  }
                  onClick={() => setProductsOpen((value) => !value)}
                >
                  {item.label}
                  <span aria-hidden="true"> ▾</span>
                </button>
                <div
                  id={productsId}
                  className="ds-site-nav__menu"
                  hidden={!productsOpen}
                  role="group"
                  aria-label="Products"
                >
                  <NavLink
                    to={item.href}
                    className="ds-site-nav__menu-link"
                    onClick={close}
                  >
                    All products
                  </NavLink>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.href}
                      className="ds-site-nav__menu-link"
                      onClick={close}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.id}
                to={item.href}
                className="ds-site-nav__link"
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ),
          )}
          {showPilotCta ? (
            <LinkButton to="/pilot" variant="primary" size="sm">
              Discuss a pilot
            </LinkButton>
          ) : null}
        </nav>

        <button
          type="button"
          className="ds-site-nav__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      <div
        id={menuId}
        className="ds-site-nav__mobile"
        data-open={open ? 'true' : 'false'}
      >
        <nav aria-label="Mobile primary">
          {primaryNavigation.map((item) => (
            <MobileNavItem key={item.id} item={item} onNavigate={close} />
          ))}
          {productsItem?.children?.map((child) => (
            <NavLink
              key={`${child.id}-mobile-child`}
              to={child.href}
              className="ds-site-nav__mobile-child"
              onClick={close}
            >
              {child.label}
            </NavLink>
          ))}
          {showPilotCta ? (
            <div onClick={close}>
              <LinkButton to="/pilot" variant="ink">
                Discuss a pilot
              </LinkButton>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  )
}

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem
  onNavigate: () => void
}) {
  return (
    <NavLink to={item.href} onClick={onNavigate} end={item.href === '/'}>
      {item.label}
    </NavLink>
  )
}
