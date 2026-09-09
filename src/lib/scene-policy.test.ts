import { describe, expect, it } from 'vitest'
import { detectScenePolicy } from './scene-policy'

describe('scene policy', () => {
  it('uses a static sunset poster for reduced motion or save-data', () => {
    expect(
      detectScenePolicy({ prefersReducedMotion: true, saveData: false }),
    ).toBe('static')
    expect(
      detectScenePolicy({ prefersReducedMotion: false, saveData: true }),
    ).toBe('static')
    expect(
      detectScenePolicy({ prefersReducedMotion: false, saveData: false }),
    ).toBe('auto')
  })
})
