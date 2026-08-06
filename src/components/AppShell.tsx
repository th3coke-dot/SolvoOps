import type { ReactNode } from 'react'
import { DocumentMeta } from './DocumentMeta'
import {
  SectionHeader,
  SiteFooter,
  SiteNav,
} from './ui'
import type { PageMetadata } from '../content'

type AppShellProps = {
  metadata: PageMetadata
  title: string
  eyebrow?: string
  copy?: ReactNode
  children: ReactNode
  /** When false, omit redesign nav (unused today; homepage stays legacy). */
  showShellNav?: boolean
}

/**
 * Redesign page shell foundations for IA placeholders.
 * Full global-shell polish continues in PR 4; homepage remains legacy until PR 5.
 */
export function AppShell({
  metadata,
  title,
  eyebrow,
  copy,
  children,
  showShellNav = true,
}: AppShellProps) {
  return (
    <>
      <DocumentMeta metadata={metadata} />
      <div className="ds-app">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {showShellNav ? <SiteNav /> : null}
        <main id="main-content" className="container" style={{ paddingBlock: 'var(--space-section)' }}>
          <SectionHeader
            label={eyebrow}
            title={title}
            copy={copy}
            titleAs="h1"
          />
          <div style={{ marginTop: 'var(--space-8)' }}>{children}</div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
