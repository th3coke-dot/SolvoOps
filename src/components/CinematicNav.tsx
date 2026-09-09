import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  cinematicBrandAssets,
  cinematicHero,
  cinematicNav,
} from '../content/cinematic'

export function CinematicNav() {
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
        <Link
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
        </Link>

        <nav className="cinematic-nav__desktop" aria-label="Primary">
          {cinematicNav.map((item) => (
            <a key={item.id} className="cinematic-nav__link" href={item.href}>
              {item.label}
            </a>
          ))}
          <Link className="cinematic-nav__pilot" to={cinematicHero.pilotCta.href}>
            {cinematicHero.pilotCta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="cinematic-nav__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
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
            <a key={item.id} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <Link to={cinematicHero.pilotCta.href} onClick={close}>
            {cinematicHero.pilotCta.label}
          </Link>
        </nav>
      </div>
    </header>
  )
}
