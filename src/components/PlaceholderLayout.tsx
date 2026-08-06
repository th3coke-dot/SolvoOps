import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  company,
  featureFlags,
  primaryNavigation,
  secondaryNavigation,
} from '../content'
import './PlaceholderLayout.css'

type PlaceholderLayoutProps = {
  title: string
  eyebrow?: string
  children: ReactNode
}

/**
 * Minimal IA shell for new routes until the redesign shell (PR 4) lands.
 * Intentionally plain — not the visual redesign.
 */
export function PlaceholderLayout({
  title,
  eyebrow = 'SolvoOps',
  children,
}: PlaceholderLayoutProps) {
  return (
    <div className="ia-shell">
      <a className="ia-skip" href="#ia-main">
        Skip to content
      </a>
      <header className="ia-header">
        <Link className="ia-brand" to="/">
          {company.name}
        </Link>
        {featureFlags.showIaNav ? (
          <nav className="ia-nav" aria-label="Primary">
            {primaryNavigation.map((item) => (
              <Link key={item.id} to={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav className="ia-nav" aria-label="Section">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/pilot">Pilot</Link>
          </nav>
        )}
      </header>

      <main id="ia-main" className="ia-main">
        <p className="ia-eyebrow">{eyebrow}</p>
        <h1 className="ia-title">{title}</h1>
        <div className="ia-body">{children}</div>
      </main>

      <footer className="ia-footer">
        <p>
          <strong>{company.name}</strong> — placeholder page for information
          architecture (redesign in progress).
        </p>
        <nav aria-label="Secondary">
          {secondaryNavigation.map((item) => (
            <Link key={item.id} to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  )
}
