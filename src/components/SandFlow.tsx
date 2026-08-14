import { useEffect, useRef } from 'react'

type Grain = {
  x: number
  y: number
  radius: number
  speed: number
  lift: number
  alpha: number
  phase: number
  warmth: number
}

function makeGrain(width: number, height: number, enterFromRight = false): Grain {
  return {
    x: enterFromRight ? width + Math.random() * 140 : Math.random() * width,
    y: height * (0.08 + Math.random() * 0.84),
    radius: 0.65 + Math.random() * 1.25,
    speed: 24 + Math.random() * 48,
    lift: 5 + Math.random() * 16,
    alpha: 0.25 + Math.random() * 0.58,
    phase: Math.random() * Math.PI * 2,
    warmth: Math.random(),
  }
}

/** A lightweight canvas field so the hero's sand reads as real motion on mobile and desktop. */
export function SandFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let grains: Grain[] = []
    let width = 0
    let height = 0
    let animationFrame = 0
    let previousTime = performance.now()

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const density = width < 640 ? 0.42 : 0.62
      const grainCount = Math.min(560, Math.max(170, Math.round(width * density)))
      grains = Array.from({ length: grainCount }, () => makeGrain(width, height))
    }

    const draw = (time: number) => {
      const step = Math.min(2.2, Math.max(0.35, (time - previousTime) / 16.667))
      previousTime = time
      context.clearRect(0, 0, width, height)

      for (const grain of grains) {
        const gust = Math.sin(time * 0.0017 + grain.phase)
        if (!reduceMotion) {
          grain.x -= grain.speed * 0.016 * step
          grain.y += (gust * grain.lift - 2.4) * 0.016 * step
        }

        if (grain.x < -24 || grain.y < -24 || grain.y > height + 24) {
          Object.assign(grain, makeGrain(width, height, true))
        }

        const alpha = grain.alpha * (0.72 + gust * 0.22)
        const colour = grain.warmth > 0.28 ? `228, 168, 58` : `247, 228, 178`
        context.beginPath()
        context.moveTo(grain.x, grain.y)
        context.lineTo(grain.x + grain.radius * 3.8, grain.y - grain.radius * 0.9)
        context.strokeStyle = `rgba(${colour}, ${alpha})`
        context.lineWidth = grain.radius
        context.lineCap = 'round'
        context.stroke()
      }

      if (!reduceMotion) animationFrame = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(() => {
      resize()
      if (reduceMotion) draw(performance.now())
    })
    observer.observe(canvas)
    draw(previousTime)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="home-sand" aria-hidden="true">
      <canvas ref={canvasRef} />
      <i className="home-sand__stream home-sand__stream--upper" />
      <i className="home-sand__stream home-sand__stream--lower" />
    </div>
  )
}
