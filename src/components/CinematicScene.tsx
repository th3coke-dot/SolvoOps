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
      [cinematicSceneAssets.dusk, cinematicSceneAssets.blueHour].map((src) => {
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

function AuroraOverlay({
  opacity,
  running,
}: {
  opacity: number
  running: boolean
}) {
  return (
    <svg
      className="cinematic-scene__aurora"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
      data-running={running ? 'true' : 'false'}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aurora-cyan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b7fff0" stopOpacity="0.28" />
          <stop offset="18%" stopColor="#79f3d4" stopOpacity="0.95" />
          <stop offset="72%" stopColor="#29c7bc" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#29c7bc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="aurora-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6ffca" stopOpacity="0.2" />
          <stop offset="24%" stopColor="#8effb1" stopOpacity="0.84" />
          <stop offset="76%" stopColor="#56dfb3" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#56dfb3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="aurora-reflection" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#82f6d2" stopOpacity="0.34" />
          <stop offset="48%" stopColor="#48d9c8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#48d9c8" stopOpacity="0" />
        </linearGradient>
        <filter id="aurora-glow" x="-45%" y="-30%" width="190%" height="170%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id="aurora-soft" x="-35%" y="-25%" width="170%" height="155%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="aurora-water-soft" x="-30%" y="-30%" width="160%" height="170%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <clipPath id="aurora-sky-clip">
          <rect width="1600" height="525" />
        </clipPath>
        <clipPath id="aurora-water-clip">
          <rect y="525" width="1600" height="375" />
        </clipPath>
      </defs>
      <g clipPath="url(#aurora-sky-clip)">
        <g className="cinematic-aurora__glow" filter="url(#aurora-glow)">
          <path
            d="M130 -100 C250 22 280 166 365 286 C420 365 492 408 540 518"
            fill="none"
            stroke="#47e8cb"
            strokeWidth="180"
            strokeLinecap="round"
            opacity="0.58"
          />
          <path
            d="M700 -120 C640 52 730 155 690 276 C658 370 704 440 748 522"
            fill="none"
            stroke="#78f5bd"
            strokeWidth="205"
            strokeLinecap="round"
            opacity="0.52"
          />
          <path
            d="M1190 -95 C1080 42 1132 176 1054 292 C1002 372 1034 454 1082 524"
            fill="none"
            stroke="#58ded2"
            strokeWidth="168"
            strokeLinecap="round"
            opacity="0.42"
          />
        </g>
        <g className="cinematic-aurora__curtains" filter="url(#aurora-soft)">
          <path
            d="M92 -110 C220 36 176 122 292 236 C372 315 318 392 452 535 L594 535 C505 380 536 290 420 190 C324 108 365 12 292 -110 Z"
            fill="url(#aurora-cyan)"
            opacity="0.96"
          />
          <path
            d="M510 -125 C626 4 578 118 660 206 C758 310 674 402 790 535 L930 535 C850 408 896 294 798 188 C718 100 760 -8 710 -125 Z"
            fill="url(#aurora-green)"
            opacity="0.9"
          />
          <path
            d="M925 -110 C1035 18 974 132 1084 230 C1176 312 1092 420 1210 535 L1358 535 C1260 400 1318 312 1218 202 C1130 106 1184 4 1125 -110 Z"
            fill="url(#aurora-cyan)"
            opacity="0.78"
          />
          <path
            d="M1260 -125 C1342 -18 1320 82 1400 174 C1478 264 1446 382 1535 535 L1648 535 L1648 -125 Z"
            fill="url(#aurora-green)"
            opacity="0.6"
          />
        </g>
      </g>
      <g
        className="cinematic-aurora__reflection"
        clipPath="url(#aurora-water-clip)"
        filter="url(#aurora-water-soft)"
      >
        <path
          d="M250 525 C300 608 270 682 338 770 C378 822 364 870 402 930 L548 930 C500 840 530 776 466 698 C408 628 452 570 410 525 Z"
          fill="url(#aurora-reflection)"
        />
        <path
          d="M665 525 C716 602 680 690 742 756 C808 826 770 876 820 930 L956 930 C904 842 946 784 878 714 C816 648 860 574 820 525 Z"
          fill="url(#aurora-reflection)"
          opacity="0.76"
        />
        <path
          d="M1045 525 C1102 594 1064 666 1130 744 C1190 814 1158 874 1200 930 L1328 930 C1278 848 1312 788 1248 714 C1188 646 1230 572 1184 525 Z"
          fill="url(#aurora-reflection)"
          opacity="0.54"
        />
      </g>
    </svg>
  )
}
