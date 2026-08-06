import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './ui.css'

type ButtonVariant = 'primary' | 'secondary' | 'ink' | 'ghost'
type ButtonSize = 'md' | 'sm'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

function classNames(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return [
    'ds-btn',
    `ds-btn--${variant}`,
    size === 'sm' ? 'ds-btn--sm' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(variant, size, className)}
      {...rest}
    >
      {children}
    </button>
  )
}

type LinkButtonProps = CommonProps & {
  to: string
  external?: boolean
}

export function LinkButton({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
}: LinkButtonProps) {
  const cls = classNames(variant, size, className)
  if (external || to.startsWith('http') || to.startsWith('mailto:')) {
    return (
      <a
        className={cls}
        href={to}
        {...(to.startsWith('http')
          ? { target: '_blank', rel: 'noreferrer' }
          : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <Link className={cls} to={to}>
      {children}
    </Link>
  )
}
