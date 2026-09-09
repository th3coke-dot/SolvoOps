import type { ScenePolicy } from './scene-policy'

export const SCENE_TRANSITION_MS = 24_000
export const SCENE_AMBIENT_MS = 10_000

export type PlaybackStatus =
  | 'static'
  | 'playing'
  | 'paused'
  | 'suspended'
  | 'ambient'
  | 'failed'

export type PlaybackState = {
  status: PlaybackStatus
  elapsedMs: number
  userPaused: boolean
}

export type PlaybackEvent =
  | { type: 'init'; policy: ScenePolicy }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'replay' }
  | { type: 'tick'; deltaMs: number }
  | { type: 'suspend' }
  | { type: 'unsuspend' }
  | { type: 'fail' }

export const initialPlaybackState: PlaybackState = {
  status: 'static',
  elapsedMs: 0,
  userPaused: false,
}

function statusForElapsed(elapsedMs: number): 'playing' | 'ambient' {
  return elapsedMs >= SCENE_TRANSITION_MS ? 'ambient' : 'playing'
}

function clampElapsed(elapsedMs: number): number {
  return Math.max(0, elapsedMs)
}

export function reducePlayback(
  state: PlaybackState,
  event: PlaybackEvent,
): PlaybackState {
  switch (event.type) {
    case 'init':
      return event.policy === 'static'
        ? { status: 'static', elapsedMs: 0, userPaused: false }
        : { status: 'playing', elapsedMs: 0, userPaused: false }
    case 'play':
      return { status: 'playing', elapsedMs: 0, userPaused: false }
    case 'pause':
      if (state.status === 'static' || state.status === 'failed') return state
      return { ...state, status: 'paused', userPaused: true }
    case 'resume':
      if (!state.userPaused || state.status === 'failed') return state
      return {
        status: statusForElapsed(state.elapsedMs),
        elapsedMs: state.elapsedMs,
        userPaused: false,
      }
    case 'replay':
      return { status: 'playing', elapsedMs: 0, userPaused: false }
    case 'tick': {
      if (state.status !== 'playing' && state.status !== 'ambient') return state
      const elapsedMs = clampElapsed(state.elapsedMs + event.deltaMs)
      return {
        ...state,
        elapsedMs,
        status: statusForElapsed(elapsedMs),
      }
    }
    case 'suspend':
      if (state.userPaused) return state
      if (state.status !== 'playing' && state.status !== 'ambient') return state
      return { ...state, status: 'suspended' }
    case 'unsuspend':
      if (state.userPaused || state.status !== 'suspended') return state
      return {
        ...state,
        status: statusForElapsed(state.elapsedMs),
      }
    case 'fail':
      return { ...state, status: 'failed' }
    default: {
      const exhaustive: never = event
      return exhaustive
    }
  }
}

export function sceneProgress(elapsedMs: number): {
  transition: number
  ambient: number
} {
  const transition = Math.min(1, Math.max(0, elapsedMs / SCENE_TRANSITION_MS))
  const after = Math.max(0, elapsedMs - SCENE_TRANSITION_MS)
  const ambient = (after % SCENE_AMBIENT_MS) / SCENE_AMBIENT_MS
  return { transition, ambient }
}

export function canPause(state: PlaybackState): boolean {
  return state.status === 'playing' || state.status === 'ambient'
}

export function canResume(state: PlaybackState): boolean {
  return state.status === 'paused' && state.userPaused
}

export function canReplay(state: PlaybackState): boolean {
  return state.status !== 'failed'
}

export function isActivationKey(key: string): boolean {
  return key === 'Enter' || key === ' '
}
