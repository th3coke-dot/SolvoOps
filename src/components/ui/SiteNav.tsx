import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { company, primaryNavigation } from '../../content'
import { LinkButton } from './Button'
import './ui.css'

type SiteNavProps = {
  showPilotCta?: boolean
}

export function SiteNav({ showPilotCta = true }: SiteNavProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  const links = primaryNavigation.flatMap((item) =>
    item.children?.length
      ? [item, ...item.children]
      : [item],
  )

  return (
    <header>
      <div className="ds-site-nav">
        <Link className="ds-site-nav__brand" to="/" onClick={close}>
          {company.name}
        </Link>

        <nav className="ds-site-nav__desktop" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              className="ds-site-nav__link"
              end={item.href === '/'}
            >
              {item.label}
            </NavLink>
          ))}
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
          {links.map((item) => (
            <NavLink
              key={`${item.id}-mobile`}
              to={item.href}
              onClick={close}
              end={item.href === '/'}
            >
              {item.label}
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
