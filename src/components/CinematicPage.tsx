import type { ReactNode } from 'react'
import type { PageMetadata } from '../content'
import { AppShell } from './AppShell'
import { BrandScene } from './BrandScene'
import { CinematicNav } from './CinematicNav'
import '../pages/ProductPage.css'
import '../pages/HomePage.css'
import '../pages/CinematicProductPage.css'
import '../pages/CinematicCompanyPage.css'

/** Shared frame for company, utility and marketplace pages. */
export function CinematicPage({ metadata, label, title, intro, actions, quiet = false, children, className = '' }: {
  metadata: PageMetadata; label: string; title: ReactNode; intro?: ReactNode;
  actions?: ReactNode; quiet?: boolean; children?: ReactNode; className?: string;
}) {
  return <AppShell metadata={metadata} showPageHeader={false} showShellNav={false} shellTone="cinematic"
    mainClassName={`solvo-cinematic product-page product-page--cinematic company-page ${className}`}>
    <CinematicNav />
    <section className={`company-hero${quiet ? ' company-hero--quiet' : ''}`} aria-labelledby="page-title">
      {!quiet && <BrandScene />}
      <div className="container company-hero__content">
        <p className="cinematic-hero__eyebrow">{label}</p>
        <h1 id="page-title">{title}</h1>
        {intro && <div className="company-hero__intro">{intro}</div>}
        {actions && <div className="product-entry-actions">{actions}</div>}
      </div>
    </section>
    {children}
  </AppShell>
}
