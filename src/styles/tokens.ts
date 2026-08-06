export const tokens = {
  color: {
    ink: '#123c34',
    inkDeep: '#0a241f',
    mist: '#e8f2ed',
    paper: '#f6faf7',
    signal: '#d4a24c',
    signalDeep: '#b8842f',
    signalText: '#8a6420',
    white: '#ffffff',
    textMuted: 'rgba(18, 60, 52, 0.72)',
    border: 'rgba(18, 60, 52, 0.14)',
    focus: '#1f6f5b',
    scope2plan: '#3d4f9c',
    partnerforge: '#0f766e',
    labs: '#5c6670',
  },
  font: {
    display: '"Bricolage Grotesque", Georgia, serif',
    body: '"Source Sans 3", "Segoe UI", sans-serif',
  },
  layout: {
    max: 1120,
    narrow: 720,
  },
  motion: {
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const

/** Documented contrast pairs (approx WCAG AA for normal/large text). */
export const contrastNotes = [
  {
    pair: 'Ink (#123c34) on Paper/White',
    usage: 'Body text, headings',
    target: 'AA+',
  },
  {
    pair: 'Signal-text (#8a6420) on Paper/White',
    usage: 'Status labels and small accent text',
    target: 'AA',
  },
  {
    pair: 'Signal-deep (#b8842f) on Paper/White',
    usage: 'Section labels (large / uppercase)',
    target: 'AA large',
  },
  {
    pair: 'Ink-deep on Signal (#d4a24c)',
    usage: 'Primary button label',
    target: 'AA',
  },
  {
    pair: 'White on Ink',
    usage: 'Inverse buttons / hero nav',
    target: 'AA+',
  },
] as const

export type ProductAccent = 'scope2plan' | 'partnerforge' | 'labs' | 'brand'

export function accentCssVars(accent: ProductAccent = 'brand'): Record<string, string> {
  switch (accent) {
    case 'scope2plan':
      return {
        '--accent': 'var(--color-accent-scope2plan)',
        '--accent-soft': 'var(--color-accent-scope2plan-soft)',
      }
    case 'partnerforge':
      return {
        '--accent': 'var(--color-accent-partnerforge)',
        '--accent-soft': 'var(--color-accent-partnerforge-soft)',
      }
    case 'labs':
      return {
        '--accent': 'var(--color-accent-labs)',
        '--accent-soft': 'var(--color-accent-labs-soft)',
      }
    default:
      return {
        '--accent': 'var(--color-signal-deep)',
        '--accent-soft': 'var(--color-mist)',
      }
  }
}
