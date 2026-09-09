export type ScenePolicy = 'auto' | 'static'

export type ScenePolicyInput = {
  prefersReducedMotion: boolean
  saveData: boolean
}

export function detectScenePolicy(input: ScenePolicyInput): ScenePolicy {
  if (input.prefersReducedMotion || input.saveData) return 'static'
  return 'auto'
}

export function readBrowserScenePolicy(
  media: Pick<Window, 'matchMedia'> | undefined,
  connection: { saveData?: boolean } | undefined,
): ScenePolicy {
  const prefersReducedMotion = Boolean(
    media?.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  return detectScenePolicy({
    prefersReducedMotion,
    saveData: Boolean(connection?.saveData),
  })
}
