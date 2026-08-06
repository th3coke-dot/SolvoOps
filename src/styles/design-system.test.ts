import { describe, expect, it } from 'vitest'
import { contrastNotes, tokens } from '../styles/tokens'
import { productStatusLabels } from '../content'

describe('design system foundations', () => {
  it('preserves core brand colours from the existing site', () => {
    expect(tokens.color.ink.toLowerCase()).toBe('#123c34')
    expect(tokens.color.signal.toLowerCase()).toBe('#d4a24c')
    expect(tokens.font.display).toContain('Bricolage Grotesque')
    expect(tokens.font.body).toContain('Source Sans 3')
  })

  it('documents contrast guidance for text pairs', () => {
    expect(contrastNotes.length).toBeGreaterThanOrEqual(4)
    expect(contrastNotes.some((n) => n.pair.includes('Ink'))).toBe(true)
  })

  it('keeps product status vocabulary aligned with content model', () => {
    expect(Object.keys(productStatusLabels).sort()).toEqual(
      [
        'available',
        'in-development',
        'pilot',
        'planned',
        'private-preview',
      ].sort(),
    )
  })
})
