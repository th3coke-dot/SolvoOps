import { describe, expect, it } from 'vitest'
import {
  buildPilotMailto,
  isHoneypotTriggered,
  pilotAnalyticsPayload,
  validatePilotForm,
} from './pilot-form'
import { emptyPilotFormValues } from '../content/pilot'

const valid = {
  ...emptyPilotFormValues(),
  name: 'Alex Rivera',
  email: 'alex@example.com',
  organisation: 'Example MSP',
  product: 'scope2plan',
  context: 'Managed services',
  challenge:
    'We spend too long turning SOWs into workable project packages for multi-site rollouts.',
}

describe('validatePilotForm', () => {
  it('accepts a complete sanitised request', () => {
    expect(validatePilotForm(valid)).toEqual({})
  })

  it('requires core fields', () => {
    const errors = validatePilotForm(emptyPilotFormValues())
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.organisation).toBeTruthy()
    expect(errors.product).toBeTruthy()
    expect(errors.context).toBeTruthy()
    expect(errors.challenge).toBeTruthy()
  })

  it('rejects invalid email', () => {
    expect(validatePilotForm({ ...valid, email: 'not-an-email' }).email).toBeTruthy()
  })
})

describe('honeypot and mailto', () => {
  it('detects filled honeypot', () => {
    expect(isHoneypotTriggered({ ...valid, website: 'http://spam.test' })).toBe(
      true,
    )
    expect(isHoneypotTriggered(valid)).toBe(false)
  })

  it('builds a mailto without storing data', () => {
    const href = buildPilotMailto(valid)
    expect(href.startsWith('mailto:hello@solvoops.com?')).toBe(true)
    expect(href).toContain(encodeURIComponent('Scope2Plan'))
    expect(href).toContain(encodeURIComponent(valid.challenge))
  })

  it('analytics payload omits challenge text', () => {
    const payload = pilotAnalyticsPayload(valid)
    expect(payload).toEqual({
      product: 'scope2plan',
      context: 'Managed services',
      organisationPresent: true,
    })
    expect(JSON.stringify(payload)).not.toContain('SOWs')
  })
})
