import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
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
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function LinkButton({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  onClick,
}: LinkButtonProps) {
  const cls = classNames(variant, size, className)
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    try {
      onClick?.(event)
    } catch {
      // Analytics or other click handlers must never block navigation.
    }
  }
  if (
    external ||
    to.startsWith('http') ||
    to.startsWith('mailto:') ||
    to.startsWith('#')
  ) {
    const isHttp = to.startsWith('http')
    return (
      <a
        className={cls}
        href={to}
        onClick={handleClick}
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
    <Link className={cls} to={to} onClick={handleClick}>
      {children}
    </Link>
  )
}
