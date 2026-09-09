import { describe, expect, it } from 'vitest'
import {
  canPause,
  canReplay,
  canResume,
  initialPlaybackState,
  reducePlayback,
  sceneProgress,
  SCENE_TRANSITION_MS,
} from './scene-playback'

describe('scene playback', () => {
  it('starts static when the policy is static', () => {
    const state = reducePlayback(initialPlaybackState, {
      type: 'init',
      policy: 'static',
    })
    expect(state).toEqual({
      status: 'static',
      elapsedMs: 0,
      userPaused: false,
    })
  })

  it('autoplays the 24s transition and holds night instead of resetting', () => {
    let state = reducePlayback(initialPlaybackState, {
      type: 'init',
      policy: 'auto',
    })
    state = reducePlayback(state, { type: 'tick', deltaMs: SCENE_TRANSITION_MS })
    expect(state.status).toBe('ambient')
    expect(state.elapsedMs).toBe(SCENE_TRANSITION_MS)
    state = reducePlayback(state, { type: 'tick', deltaMs: 8_000 })
    expect(state.status).toBe('ambient')
    expect(sceneProgress(state.elapsedMs).transition).toBe(1)
    expect(sceneProgress(0).transition).toBe(0)
  })

  it('never auto-resumes after a user pause', () => {
    let state = reducePlayback(initialPlaybackState, {
      type: 'init',
      policy: 'auto',
    })
    state = reducePlayback(state, { type: 'tick', deltaMs: 4_000 })
    state = reducePlayback(state, { type: 'pause' })
    expect(state.userPaused).toBe(true)
    expect(canResume(state)).toBe(true)
    expect(canPause(state)).toBe(false)
    state = reducePlayback(state, { type: 'suspend' })
    expect(state.status).toBe('paused')
    state = reducePlayback(state, { type: 'unsuspend' })
    expect(state.status).toBe('paused')
    expect(state.elapsedMs).toBe(4_000)
    state = reducePlayback(state, { type: 'resume' })
    expect(state.status).toBe('playing')
    expect(state.userPaused).toBe(false)
  })

  it('replays from sunset and keeps pause/resume/replay available', () => {
    let state = reducePlayback(initialPlaybackState, {
      type: 'init',
      policy: 'auto',
    })
    state = reducePlayback(state, { type: 'tick', deltaMs: 20_000 })
    state = reducePlayback(state, { type: 'replay' })
    expect(state).toEqual({
      status: 'playing',
      elapsedMs: 0,
      userPaused: false,
    })
    expect(canReplay(state)).toBe(true)
  })

  it('suspends when hidden and resumes only if the user did not pause', () => {
    let state = reducePlayback(initialPlaybackState, {
      type: 'init',
      policy: 'auto',
    })
    state = reducePlayback(state, { type: 'tick', deltaMs: 1_000 })
    state = reducePlayback(state, { type: 'suspend' })
    expect(state.status).toBe('suspended')
    state = reducePlayback(state, { type: 'unsuspend' })
    expect(state.status).toBe('playing')
  })
})
