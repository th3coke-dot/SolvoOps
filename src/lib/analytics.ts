/**
 * Lightweight analytics bridge. Prefer Vercel Web Analytics custom events when
 * available (draft PR #2). Never pass free-text message bodies.
 */
type TrackProps = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    va?: (event: 'event', name: string, data?: TrackProps) => void
  }
}

export function trackEvent(name: string, data?: TrackProps): void {
  try {
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', name, data)
      return
    }
  } catch {
    // Analytics must never break conversion flows.
  }
}
