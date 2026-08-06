import { company } from '../content/company'
import {
  pilotFormLimits,
  pilotProductOptions,
  type PilotFormValues,
} from '../content/pilot'

export type PilotFormErrors = Partial<
  Record<keyof Omit<PilotFormValues, 'website'>, string>
>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validatePilotForm(values: PilotFormValues): PilotFormErrors {
  const errors: PilotFormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const organisation = values.organisation.trim()
  const challenge = values.challenge.trim()

  if (name.length < pilotFormLimits.nameMin) {
    errors.name = 'Enter your name.'
  } else if (name.length > pilotFormLimits.nameMax) {
    errors.name = `Name must be ${pilotFormLimits.nameMax} characters or fewer.`
  }

  if (!email) {
    errors.email = 'Enter a work email address.'
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (organisation.length < pilotFormLimits.organisationMin) {
    errors.organisation = 'Enter your organisation.'
  } else if (organisation.length > pilotFormLimits.organisationMax) {
    errors.organisation = `Organisation must be ${pilotFormLimits.organisationMax} characters or fewer.`
  }

  if (!values.product) {
    errors.product = 'Select a product of interest.'
  } else if (
    !pilotProductOptions.some(
      (option) => option.value === values.product && option.value !== '',
    )
  ) {
    errors.product = 'Select a valid product option.'
  }

  if (!values.context) {
    errors.context = 'Select a delivery context.'
  }

  if (challenge.length < pilotFormLimits.challengeMin) {
    errors.challenge = `Describe the workflow in at least ${pilotFormLimits.challengeMin} characters (general terms only).`
  } else if (challenge.length > pilotFormLimits.challengeMax) {
    errors.challenge = `Keep the description to ${pilotFormLimits.challengeMax} characters or fewer.`
  }

  return errors
}

export function isHoneypotTriggered(values: PilotFormValues): boolean {
  return values.website.trim().length > 0
}

function productLabel(product: string): string {
  return (
    pilotProductOptions.find((option) => option.value === product)?.label ??
    product
  )
}

export function buildPilotMailto(values: PilotFormValues): string {
  const subject = `Pilot request — ${productLabel(values.product)}`
  const body = [
    'Pilot request from solvoops.com',
    '',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Organisation: ${values.organisation.trim()}`,
    `Product: ${productLabel(values.product)}`,
    `Delivery context: ${values.context}`,
    '',
    'Operational challenge (general terms):',
    values.challenge.trim(),
    '',
    '---',
    'Submitted via the SolvoOps pilot form. No confidential uploads are accepted on this page.',
  ].join('\n')

  return `mailto:${company.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Analytics payload — never includes free-text challenge/message body. */
export type PilotAnalyticsPayload = {
  product: string
  context: string
  organisationPresent: boolean
}

export function pilotAnalyticsPayload(
  values: PilotFormValues,
): PilotAnalyticsPayload {
  return {
    product: values.product,
    context: values.context,
    organisationPresent: values.organisation.trim().length > 0,
  }
}
