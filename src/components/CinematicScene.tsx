import { Fragment, useEffect, useRef, useState } from 'react'
import { cinematicSceneAssets } from '../content/cinematic'
import {
  canPause,
  canReplay,
  canResume,
  initialPlaybackState,
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
      [cinematicSceneAssets.dusk, cinematicSceneAssets.blueHour, '/scene/aurora-sky.webp'].map((src) => {
        const image = new Image()
        image.src = src
        return image
          .decode()
          .then(() => true)
          .catch(() => false)
      }),
    ).then((results) => {
      if (cancelled) return
      if (results.every(Boolean)) {
        setPlatesReady(true)
        return
      }
      setState((current) => reducePlayback(current, { type: 'fail' }))
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

  const dispatch = (
    type: Extract<PlaybackEvent['type'], 'pause' | 'resume' | 'replay'>,
  ) => {
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

  const controlsAvailable = policy === 'auto' && state.status !== 'failed'
  const toggleLabel = canResume(state) ? 'Resume' : 'Pause'
  const auroraRunning =
    state.status === 'playing' || state.status === 'ambient'
  const failToStatic = () => {
    setPlatesReady(false)
    setState((current) => reducePlayback(current, { type: 'fail' }))
  }

  return (
    <Fragment>
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
                onError={failToStatic}
              />
              <img
                className="cinematic-scene__plate"
                src={cinematicSceneAssets.blueHour}
                alt=""
                width={1280}
                height={720}
                decoding="async"
                style={{ opacity: blueOpacity }}
                onError={failToStatic}
              />
            </>
          ) : null}
          <div
            className="cinematic-scene__night"
            style={{ opacity: nightOpacity }}
          />
          <AuroraOverlay opacity={auroraOpacity} running={auroraRunning} />
          <div className="cinematic-scene__veil" />
        </div>
      </div>
      {controlsAvailable ? (
        <div className="cinematic-scene__controls">
          <div
            className="cinematic-controls"
            role="toolbar"
            aria-label="Scene playback"
          >
            <SceneControl
              label={toggleLabel}
              disabled={!canPause(state) && !canResume(state)}
              onActivate={() =>
                dispatch(toggleLabel === 'Pause' ? 'pause' : 'resume')
              }
            />
            <SceneControl
              label="Replay"
              disabled={!canReplay(state)}
              onActivate={() => dispatch('replay')}
            />
          </div>
        </div>
      ) : null}
    </Fragment>
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

  return (
    <button
      type="button"
      className="cinematic-controls__btn"
      aria-label={`${label} scene`}
      disabled={disabled}
      onClick={activate}
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

// The photograph and mask share the same 1280×720 coordinate system.
// Only sky and its water reflection are exposed: the terrain never moves.
const SKY_EDGE = 'M0 0H1280V247L1233 251L1198 231L1165 221L1122 215L1086 194L1046 170L1035 174L1007 207L983 215L961 211L949 220L940 229L929 231L918 249L902 268L886 284L862 307L832 288L805 285L784 276L769 279L746 297L734 289L718 284L706 288L690 298L671 303L642 302L608 306L584 315L554 317L534 324L512 313L494 305L474 285L451 277L426 272L385 269L347 273L327 272L311 250L295 230L280 224L259 209L235 206L205 203L181 190L160 182L135 178L99 173L60 165L0 155Z'

function AuroraOverlay({ opacity, running }: { opacity: number; running: boolean }) {
  return (
    <svg className="cinematic-scene__aurora" viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice" style={{ opacity }}
      data-running={running ? 'true' : 'false'} aria-hidden="true">
      <defs>
        <clipPath id="aurora-sky-clip"><path d={SKY_EDGE} /></clipPath>
        <clipPath id="aurora-water-clip"><path d={SKY_EDGE} transform="translate(0 802) scale(1 -1)" /></clipPath>
        <linearGradient id="water-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity=".55" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="water-reflection-mask"><rect y="401" width="1280" height="319" fill="url(#water-fade)" /></mask>
        <filter id="water-soft"><feGaussianBlur stdDeviation="1.5 3" /></filter>
      </defs>
      <g clipPath="url(#aurora-sky-clip)">
        <image className="cinematic-aurora__curtains" href="/scene/aurora-sky.webp"
          width="1280" height="335" preserveAspectRatio="none" />
      </g>
      <g clipPath="url(#aurora-water-clip)" mask="url(#water-reflection-mask)" filter="url(#water-soft)">
        <image className="cinematic-aurora__reflection" href="/scene/aurora-sky.webp"
          width="1280" height="335" preserveAspectRatio="none" transform="translate(0 802) scale(1 -1)" />
      </g>
    </svg>
  )
}
