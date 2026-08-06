import type { ReactNode } from 'react'
import './ui.css'

type FeatureCardProps = {
  title: string
  children: ReactNode
}

export function FeatureCard({ title, children }: FeatureCardProps) {
  return (
    <article className="ds-feature-card">
      <h3 className="ds-feature-card__title">{title}</h3>
      <div className="ds-feature-card__body">{children}</div>
    </article>
  )
}

type WorkflowStep = {
  title: string
  body: string
}

type WorkflowStepsProps = {
  steps: WorkflowStep[]
  labelledBy?: string
}

export function WorkflowSteps({ steps, labelledBy }: WorkflowStepsProps) {
  return (
    <ol className="ds-workflow" aria-labelledby={labelledBy}>
      {steps.map((step) => (
        <li key={step.title} className="ds-workflow__step">
          <h3 className="ds-workflow__title">{step.title}</h3>
          <p className="ds-workflow__body">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

type CtaPanelProps = {
  label?: string
  title: string
  copy?: ReactNode
  actions: ReactNode
  titleId?: string
}

export function CtaPanel({
  label,
  title,
  copy,
  actions,
  titleId,
}: CtaPanelProps) {
  return (
    <section className="ds-cta-panel" aria-labelledby={titleId}>
      <div>
        {label ? <p className="ds-section-header__label">{label}</p> : null}
        <h2 className="ds-section-header__title" id={titleId}>
          {title}
        </h2>
        {copy ? <div className="ds-section-header__copy">{copy}</div> : null}
      </div>
      <div className="ds-cta-panel__actions">{actions}</div>
    </section>
  )
}
