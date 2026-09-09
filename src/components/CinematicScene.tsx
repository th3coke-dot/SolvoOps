import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { cinematicSceneAssets } from '../content/cinematic'
import {
  canPause,
  canReplay,
  canResume,
  initialPlaybackState,
  isActivationKey,
  reducePlayback,
  sceneProgress,
  type PlaybackEvent,
  type PlaybackState,
} from '../lib/scene-playback'
import {
  readBrowserScenePolicy,
  type ScenePolicy,
} from '../lib/scene-policy'

type ConnectionLike = { saveData?: boolean }

function navigatorConnection(): ConnectionLike | undefined {
  const nav = navigator as Navigator & { connection?: ConnectionLike }
  return nav.connection
}

export function CinematicScene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [policy, setPolicy] = useState<ScenePolicy>('static')
  const [state, setState] = useState<PlaybackState>(initialPlaybackState)
  const [platesReady, setPlatesReady] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    const nextPolicy = readBrowserScenePolicy(window, navigatorConnection())
    setPolicy(nextPolicy)
    setState((current) => reducePlayback(current, { type: 'init', policy: nextPolicy }))
  }, [])

  useEffect(() => {
    if (policy !== 'auto') return
    let cancelled = false
    Promise.all(
      [cinematicSceneAssets.dusk, cinematicSceneAssets.blueHour].map((src) => {
        const image = new Image()
        image.src = src
        return image.decode().catch(() => undefined)
      }),
    ).then(() => {
      if (!cancelled) setPlatesReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [policy])

  useEffect(() => {
    const running = state.status === 'playing' || state.status === 'ambient'
    if (!running) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const deltaMs = now - last
      last = now
      setState((current) => reducePlayback(current, { type: 'tick', deltaMs }))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [state.status])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const latestRatio = { current: 1 }
    const syncVisibility = () => {
      const hidden = document.hidden
      const ratio = latestRatio.current
      const shouldSuspend = hidden || ratio < 0.5
      const current = stateRef.current
      if (shouldSuspend && (current.status === 'playing' || current.status === 'ambient')) {
        setState((value) => reducePlayback(value, { type: 'suspend' }))
        return
      }
      if (!shouldSuspend && current.status === 'suspended') {
        setState((value) => reducePlayback(value, { type: 'unsuspend' }))
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        latestRatio.current = entry.intersectionRatio
        syncVisibility()
      },
      { threshold: [0, 0.5, 1] },
    )
    observer.observe(node)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  const dispatch = (type: Extract<PlaybackEvent['type'], 'play' | 'pause' | 'resume' | 'replay'>) => {
    setState((current) => reducePlayback(current, { type }))
  }

  const progress = sceneProgress(state.elapsedMs)
  const duskOpacity =
    state.status === 'static' || state.status === 'failed' || !platesReady
      ? 0
      : clamp((progress.transition - 0.18) / 0.28)
  const blueOpacity =
    state.status === 'static' || state.status === 'failed' || !platesReady
      ? 0
      : clamp((progress.transition - 0.42) / 0.28)
  const nightOpacity =
    state.status === 'static' || state.status === 'failed'
      ? 0
      : clamp((progress.transition - 0.62) / 0.3)
  const auroraOpacity =
    state.status === 'static' || state.status === 'failed'
      ? 0
      : clamp((progress.transition - 0.72) / 0.28) *
        (0.82 + 0.18 * Math.sin(progress.ambient * Math.PI * 2))

  const showPlay = policy === 'static' && state.status === 'static'

  return (
    <div className="cinematic-scene" ref={rootRef}>
      <div className="cinematic-scene__stage" aria-hidden="true">
        <LockedTerrain />
        <img
          className="cinematic-scene__plate cinematic-scene__plate--sunset"
          src={cinematicSceneAssets.sunset}
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
          onError={() => {
            setPosterFailed(true)
            setState((current) => reducePlayback(current, { type: 'fail' }))
          }}
          data-failed={posterFailed ? 'true' : 'false'}
        />
        {policy === 'auto' || platesReady ? (
          <>
            <img
              className="cinematic-scene__plate"
              src={cinematicSceneAssets.dusk}
              alt=""
              width={1280}
              height={720}
              decoding="async"
              style={{ opacity: duskOpacity }}
            />
            <img
              className="cinematic-scene__plate"
              src={cinematicSceneAssets.blueHour}
              alt=""
              width={1280}
              height={720}
              decoding="async"
              style={{ opacity: blueOpacity }}
            />
          </>
        ) : null}
        <div
          className="cinematic-scene__night"
          style={{ opacity: nightOpacity }}
        />
        <AuroraOverlay opacity={auroraOpacity} />
        <div className="cinematic-scene__veil" />
      </div>
      <div className="cinematic-scene__controls">
        <div className="cinematic-controls" role="toolbar" aria-label="Scene playback">
          {showPlay ? (
            <SceneControl label="Play" onActivate={() => dispatch('play')} />
          ) : null}
          <SceneControl
            label="Pause"
            disabled={!canPause(state)}
            onActivate={() => dispatch('pause')}
          />
          <SceneControl
            label="Resume"
            disabled={!canResume(state)}
            onActivate={() => dispatch('resume')}
          />
          <SceneControl
            label="Replay"
            disabled={!canReplay(state)}
            onActivate={() => dispatch('replay')}
          />
        </div>
      </div>
    </div>
  )
}

function SceneControl({
  label,
  disabled = false,
  onActivate,
}: {
  label: string
  disabled?: boolean
  onActivate: () => void
}) {
  const activate = () => {
    if (disabled) return
    onActivate()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!isActivationKey(event.key)) return
    event.preventDefault()
    activate()
  }

  return (
    <button
      type="button"
      className="cinematic-controls__btn"
      aria-label={`${label} scene`}
      disabled={disabled}
      onClick={activate}
      onKeyDown={onKeyDown}
    >
      {label}
    </button>
  )
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

function LockedTerrain() {
  return (
    <svg
      className="cinematic-scene__fallback"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3a" />
          <stop offset="45%" stopColor="#d4783a" />
          <stop offset="72%" stopColor="#f0c27a" />
          <stop offset="100%" stopColor="#071411" />
        </linearGradient>
        <linearGradient id="scene-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2214" />
          <stop offset="100%" stopColor="#071411" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#scene-sky)" />
      <path
        d="M0 430 C180 360 280 390 420 300 C520 240 610 310 720 360 C820 280 940 250 1040 310 C1160 380 1280 250 1600 300 L1600 620 L0 620 Z"
        fill="#0a241f"
      />
      <path
        d="M0 500 C220 470 390 520 560 490 C740 455 900 530 1120 500 C1300 478 1460 520 1600 490 L1600 640 L0 640 Z"
        fill="#071411"
      />
      <rect y="610" width="1600" height="290" fill="url(#scene-water)" />
    </svg>
  )
}

function AuroraOverlay({ opacity }: { opacity: number }) {
  return (
    <svg
      className="cinematic-scene__aurora"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aurora-wash" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#79dcd3" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#79dcd3" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#79dcd3" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M420 0 C480 180 520 280 560 430 C500 520 470 600 510 900 L720 900 C690 620 740 420 700 0 Z"
        fill="url(#aurora-wash)"
      />
      <path
        d="M680 0 C760 160 790 300 820 470 C790 610 810 760 780 900 L960 900 C990 680 940 420 900 0 Z"
        fill="url(#aurora-wash)"
        opacity="0.7"
      />
    </svg>
  )
}
