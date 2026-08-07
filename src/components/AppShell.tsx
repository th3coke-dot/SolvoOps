import type { ReactNode } from 'react'
import { DocumentMeta } from './DocumentMeta'
import { SectionHeader, SiteFooter, SiteNav } from './ui'
import type { PageMetadata } from '../content'

type AppShellProps = {
  metadata: PageMetadata
  title?: string
  eyebrow?: string
  copy?: ReactNode
  children: ReactNode
  showShellNav?: boolean
  showShellFooter?: boolean
  /** When false, page supplies its own H1 / hero. */
  showPageHeader?: boolean
  mainClassName?: string
  /** Lets a page opt into a deliberate, page-specific shell treatment. */
  shellTone?: 'default' | 'light-landing'
}

/**
 * Global redesign shell: skip-link, sticky nav, footer.
 * Homepage may omit the default page header and supply a custom hero.
 */
export function AppShell({
  metadata,
  title,
  eyebrow,
  copy,
  children,
  showShellNav = true,
  showShellFooter = true,
  showPageHeader = true,
  mainClassName,
  shellTone = 'default',
}: AppShellProps) {
  return (
    <>
      <DocumentMeta metadata={metadata} />
      <div className={`ds-app${shellTone === 'light-landing' ? ' ds-app--light-landing' : ''}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {showShellNav ? <SiteNav /> : null}
        <main
          id="main-content"
          className={mainClassName ?? 'container'}
          style={
            mainClassName
              ? undefined
              : { paddingBlock: 'var(--space-section)' }
          }
        >
          {showPageHeader && title ? (
            <>
              <SectionHeader
                label={eyebrow}
                title={title}
                copy={copy}
                titleAs="h1"
              />
              <div style={{ marginTop: 'var(--space-8)' }}>{children}</div>
            </>
          ) : (
            children
          )}
        </main>
        {showShellFooter ? <SiteFooter /> : null}
      </div>
    </>
  )
}
