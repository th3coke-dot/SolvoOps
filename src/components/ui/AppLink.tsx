import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type AppLinkProps = {
  to: string
  className?: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>

function isExternalHref(href: string) {
  return (
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('#')
  )
}

export function AppLink({ to, className, children, ...rest }: AppLinkProps) {
  if (isExternalHref(to)) {
    const isHttp = to.startsWith('http')
    return (
      <a
        className={className}
        href={to}
        {...rest}
        {...(isHttp
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
        {isHttp ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    )
  }
  return (
    <Link className={className} to={to} {...rest}>
      {children}
    </Link>
  )
}

