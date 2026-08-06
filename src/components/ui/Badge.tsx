import type { ReactNode } from 'react'
import type { ProductStatus } from '../../content'
import { getStatusLabel } from '../../content'
import { accentCssVars, type ProductAccent } from '../../styles/tokens'
import './ui.css'

type BadgeProps = {
  children: ReactNode
  soft?: boolean
  accent?: ProductAccent
  className?: string
}

export function Badge({
  children,
  soft = false,
  accent = 'brand',
  className,
}: BadgeProps) {
  return (
    <span
      className={['ds-badge', soft ? 'ds-badge--soft' : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      style={accentCssVars(accent)}
    >
      {children}
    </span>
  )
}

type ProductStatusBadgeProps = {
  status: ProductStatus
  label?: string
  className?: string
}

/**
 * Status is also conveyed with text — colour is not the only signal.
 */
export function ProductStatusBadge({
  status,
  label,
  className,
}: ProductStatusBadgeProps) {
  const text = label ?? getStatusLabel(status)
  return (
    <span
      className={[
        'ds-badge',
        'ds-badge--status',
        `ds-badge--${status}`,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="sr-only">Status: </span>
      {text}
    </span>
  )
}
