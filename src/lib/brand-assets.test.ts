import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { cinematicBrandAssets } from '../content/cinematic'

function sha256(relativePath: string) {
  const bytes = readFileSync(resolve(process.cwd(), relativePath))
  return createHash('sha256').update(bytes).digest('hex')
}

describe('preserved brand assets', () => {
  it('keeps the original public logo PNGs and favicon', () => {
    expect(sha256('public/brand/solvoops-horizontal-dark.png')).toBe(
      cinematicBrandAssets.hashes.logoDark,
    )
    expect(sha256('public/brand/solvoops-horizontal-light.png')).toBe(
      cinematicBrandAssets.hashes.logoLight,
    )
    expect(sha256('public/favicon.svg')).toBe(cinematicBrandAssets.hashes.favicon)
  })
})
