/**
 * Analytics bridge for conversion events.
 * Uses @vercel/analytics `track` when available; never send free-text message bodies.
 */
import { track } from '@vercel/analytics'

type TrackProps = Record<string, string | number | boolean | null | undefined>

export function trackEvent(name: string, data?: TrackProps): void {
  try {
    track(name, data)
  } catch {
    // Analytics must never break conversion flows.
  }
}
