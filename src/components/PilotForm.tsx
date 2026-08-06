import {
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { Button, LinkButton } from './ui'
import {
  emptyPilotFormValues,
  pilotContextOptions,
  pilotFormLimits,
  pilotPageContent,
  pilotProductOptions,
  type PilotFormValues,
} from '../content/pilot'
import { company } from '../content/company'
import { trackEvent } from '../lib/analytics'
import {
  buildPilotMailto,
  isHoneypotTriggered,
  pilotAnalyticsPayload,
  validatePilotForm,
  type PilotFormErrors,
} from '../lib/pilot-form'
import './PilotForm.css'

type PilotFormProps = {
  initialProduct?: string | null
}

export function PilotForm({ initialProduct }: PilotFormProps) {
  const formId = useId()
  const [values, setValues] = useState<PilotFormValues>(() => ({
    ...emptyPilotFormValues(),
    product:
      initialProduct &&
      pilotProductOptions.some((option) => option.value === initialProduct)
        ? initialProduct
        : '',
  }))
  const [errors, setErrors] = useState<PilotFormErrors>({})
  const [submittedMailto, setSubmittedMailto] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  function updateField<K extends keyof PilotFormValues>(
    key: K,
    value: PilotFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    updateField(name as keyof PilotFormValues, value)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatusMessage(null)

    if (isHoneypotTriggered(values)) {
      // Silent success for bots — do not open mail or fire analytics.
      setSubmittedMailto(`mailto:${company.contactEmail}`)
      setErrors({})
      return
    }

    const nextErrors = validatePilotForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('Please correct the highlighted fields.')
      const firstInvalid = Object.keys(nextErrors)[0]
      const el = document.getElementById(`${formId}-${firstInvalid}`)
      el?.focus()
      return
    }

    const mailto = buildPilotMailto(values)
    trackEvent('pilot_form_submit', pilotAnalyticsPayload(values))
    setSubmittedMailto(mailto)
    window.location.href = mailto
  }

  if (submittedMailto) {
    return (
      <div className="pilot-form pilot-form--success" role="status">
        <h2 className="pilot-form__success-title">{pilotPageContent.successTitle}</h2>
        <p>{pilotPageContent.successBody}</p>
        <p className="pilot-form__actions">
          <LinkButton to={submittedMailto} variant="ink">
            {pilotPageContent.mailtoFallbackLabel}
          </LinkButton>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSubmittedMailto(null)
              setValues(emptyPilotFormValues())
            }}
          >
            Start another request
          </Button>
        </p>
      </div>
    )
  }

  return (
    <form className="pilot-form" onSubmit={onSubmit} noValidate>
      <p className="pilot-form__intro">{pilotPageContent.formIntro}</p>
      <p className="pilot-form__notice" role="note">
        {pilotPageContent.confidentialityNotice}
      </p>

      {statusMessage ? (
        <p className="pilot-form__status" role="alert">
          {statusMessage}
        </p>
      ) : null}

      <div className="pilot-form__grid">
        <Field
          id={`${formId}-name`}
          label="Name"
          name="name"
          value={values.name}
          onChange={onChange}
          error={errors.name}
          autoComplete="name"
          required
          maxLength={pilotFormLimits.nameMax}
        />
        <Field
          id={`${formId}-email`}
          label="Work email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Field
          id={`${formId}-organisation`}
          label="Organisation"
          name="organisation"
          value={values.organisation}
          onChange={onChange}
          error={errors.organisation}
          autoComplete="organization"
          required
          maxLength={pilotFormLimits.organisationMax}
          className="pilot-form__span"
        />
        <SelectField
          id={`${formId}-product`}
          label="Product of interest"
          name="product"
          value={values.product}
          onChange={onChange}
          error={errors.product}
          required
          options={pilotProductOptions}
        />
        <SelectField
          id={`${formId}-context`}
          label="Delivery context"
          name="context"
          value={values.context}
          onChange={onChange}
          error={errors.context}
          required
          options={pilotContextOptions}
        />
        <TextAreaField
          id={`${formId}-challenge`}
          label="Operational challenge"
          name="challenge"
          value={values.challenge}
          onChange={onChange}
          error={errors.challenge}
          required
          maxLength={pilotFormLimits.challengeMax}
          hint="Describe the workflow in general terms. Do not paste confidential scopes, customer data or credentials."
          className="pilot-form__span"
        />
      </div>

      {/* Honeypot: visually hidden, removed from AT, ignored by autofill where possible */}
      <div className="pilot-form__hp" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Company website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          value={values.website}
          onChange={onChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="pilot-form__actions">
        <Button type="submit" variant="ink">
          Request a pilot conversation
        </Button>
        <LinkButton to={`mailto:${company.contactEmail}`} variant="secondary">
          {pilotPageContent.mailtoFallbackLabel}
        </LinkButton>
      </div>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  name: keyof PilotFormValues
  value: string
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void
  error?: string
  type?: string
  autoComplete?: string
  required?: boolean
  maxLength?: number
  className?: string
}

function Field({
  id,
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  required,
  maxLength,
  className,
}: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div className={`pilot-field${className ? ` ${className}` : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p className="pilot-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type SelectFieldProps = Omit<FieldProps, 'type' | 'autoComplete' | 'maxLength'> & {
  options: ReadonlyArray<{ value: string; label: string }>
}

function SelectField({
  id,
  label,
  name,
  value,
  onChange,
  error,
  required,
  options,
  className,
}: SelectFieldProps) {
  const errorId = `${id}-error`
  return (
    <div className={`pilot-field${className ? ` ${className}` : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      >
        {options.map((option) => (
          <option key={option.value || 'empty'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="pilot-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextAreaFieldProps = Omit<FieldProps, 'type' | 'autoComplete'> & {
  hint?: string
}

function TextAreaField({
  id,
  label,
  name,
  value,
  onChange,
  error,
  required,
  maxLength,
  hint,
  className,
}: TextAreaFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={`pilot-field${className ? ` ${className}` : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
      />
      {hint ? (
        <p className="pilot-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="pilot-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
