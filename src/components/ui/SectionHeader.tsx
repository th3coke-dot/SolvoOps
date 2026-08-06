import type { ReactNode } from 'react'
import { accentCssVars, type ProductAccent } from '../../styles/tokens'
import './ui.css'

type SectionHeaderProps = {
  label?: string
  title: string
  copy?: ReactNode
  accent?: ProductAccent
  titleAs?: 'h1' | 'h2' | 'h3'
  id?: string
}

export function SectionHeader({
  label,
  title,
  copy,
  accent = 'brand',
  titleAs = 'h2',
  id,
}: SectionHeaderProps) {
  const TitleTag = titleAs
  return (
    <header className="ds-section-header" style={accentCssVars(accent)}>
      {label ? <p className="ds-section-header__label">{label}</p> : null}
      <TitleTag className="ds-section-header__title" id={id}>
        {title}
      </TitleTag>
      {copy ? <div className="ds-section-header__copy">{copy}</div> : null}
    </header>
  )
}
