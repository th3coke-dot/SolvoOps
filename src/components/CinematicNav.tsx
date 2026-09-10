import { useEffect, useId, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppLink } from './ui/AppLink'
import {
  cinematicBrandAssets,
  cinematicHero,
  cinematicNav,
} from '../content/cinematic'

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg className="cinematic-nav__toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <>
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  )
}

export function CinematicNav() {
  const { pathname } = useLocation()
  const destinations: Record<string, string> = { '#products': '/products', '#how-it-works': '/how-it-works', '#about': '/about' }
  const navHref = (href: string) => pathname === '/' ? href : destinations[href] ?? href
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="cinematic-nav">
      <div className="cinematic-nav__bar">
        <AppLink
          className="cinematic-nav__brand"
          to="/"
          onClick={close}
          aria-label="SolvoOps home"
        >
          <img
            className="cinematic-nav__logo"
            src={cinematicBrandAssets.logoDark}
            alt=""
            width={232}
            height={70}
            decoding="async"
          />
        </AppLink>

        <nav className="cinematic-nav__desktop" aria-label="Primary">
          {cinematicNav.map((item) => (
            <AppLink key={item.id} className="cinematic-nav__link" to={navHref(item.href)}>
              {item.label}
            </AppLink>
          ))}
          <AppLink className="cinematic-nav__pilot" to={cinematicHero.pilotCta.href}>
            {cinematicHero.pilotCta.label}
          </AppLink>
        </nav>

        <button
          type="button"
          className="cinematic-nav__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <ToggleIcon open={open} />
        </button>
      </div>

      <div
        id={menuId}
        className="cinematic-nav__mobile"
        data-open={open ? 'true' : 'false'}
        aria-hidden={open ? undefined : true}
        inert={open ? undefined : true}
      >
        <nav aria-label="Mobile primary">
          {cinematicNav.map((item) => (
            <AppLink key={item.id} to={navHref(item.href)} onClick={close}>
              {item.label}
            </AppLink>
          ))}
          <AppLink to={cinematicHero.pilotCta.href} onClick={close}>
            {cinematicHero.pilotCta.label}
          </AppLink>
        </nav>
      </div>
    </header>
  )
}
