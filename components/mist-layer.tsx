"use client"

import { useEffect, useRef, useState } from "react"

type Wisp = {
  id: number
  hue: number
  chroma: number
  lightness: number
  width: number
  height: number
  top: number
  left: number
  duration: number
  delay: number
  depth: number
  tx1: number
  ty1: number
  tx2: number
  ty2: number
  tx3: number
  ty3: number
}

// Curated hues drawn from the fog palette: dawn gold, pale mist blue, slate blue-grey, dusk blue.
const HUES = [75, 215, 235, 250]

const RESET_INTERVAL_MS = 15 * 60 * 1000
const PARALLAX_MAX_PX = 28

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createWisps(): Wisp[] {
  const positions = [
    { top: rand(0, 30), left: rand(0, 30) },
    { top: rand(0, 30), left: rand(70, 100) },
    { top: rand(70, 100), left: rand(0, 30) },
    { top: rand(70, 100), left: rand(70, 100) },
  ]

  return HUES.map((hue, i) => {
    const width = rand(42, 66)
    return {
      id: Date.now() + i,
      hue,
      chroma: rand(0.03, 0.08),
      lightness: rand(0.55, 0.78),
      width,
      height: width * rand(0.45, 0.7),
      top: positions[i].top,
      left: positions[i].left,
      duration: rand(26, 40),
      delay: rand(-20, 0),
      depth: rand(0.5, 1.4),
      tx1: rand(-8, 8),
      ty1: rand(-6, 6),
      tx2: rand(-8, 8),
      ty2: rand(-6, 6),
      tx3: rand(-8, 8),
      ty3: rand(-6, 6),
    }
  })
}

export function MistLayer() {
  const [wisps, setWisps] = useState<Wisp[] | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setWisps(createWisps())

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(media.matches)
    const onChange = () => setReducedMotion(media.matches)
    media.addEventListener("change", onChange)

    const interval = setInterval(() => setWisps(createWisps()), RESET_INTERVAL_MS)

    return () => {
      media.removeEventListener("change", onChange)
      clearInterval(interval)
    }
  }, [])

  // Subtle parallax: wisps drift toward the pointer (fine-pointer devices) or with
  // scroll position (touch devices, which have no cursor to react to), each at its
  // own depth — like layers of fog receding at different distances.
  useEffect(() => {
    if (reducedMotion) return

    const pointerFine = window.matchMedia("(pointer: fine)").matches
    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }
    let raf = 0

    const tick = () => {
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04

      wrapperRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = wisps?.[i]?.depth ?? 1
        const px = current.x * PARALLAX_MAX_PX * depth
        const py = current.y * PARALLAX_MAX_PX * depth
        el.style.transform = `translate3d(${px}px, ${py}px, 0)`
      })

      raf = requestAnimationFrame(tick)
    }

    if (pointerFine) {
      const onPointerMove = (e: PointerEvent) => {
        target = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        }
      }
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      raf = requestAnimationFrame(tick)
      return () => {
        window.removeEventListener("pointermove", onPointerMove)
        cancelAnimationFrame(raf)
      }
    }

    // Touch devices: bounded oscillation driven by scroll depth, not raw scrollY,
    // so it stays gentle no matter how long the page is.
    const onScroll = () => {
      const s = window.scrollY
      target = {
        x: Math.sin(s * 0.0015) * 0.6,
        y: Math.sin(s * 0.0025),
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion, wisps])

  if (!wisps) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {wisps.map((wisp, i) => (
        <div
          key={wisp.id}
          ref={(el) => {
            wrapperRefs.current[i] = el
          }}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <div
            className="animated-blob absolute rounded-full"
            style={
              {
                top: `${wisp.top}%`,
                left: `${wisp.left}%`,
                width: `${wisp.width}vw`,
                height: `${wisp.height}vw`,
                background: `oklch(${wisp.lightness} ${wisp.chroma} ${wisp.hue})`,
                animationDuration: reducedMotion ? undefined : `${wisp.duration}s`,
                animationDelay: reducedMotion ? undefined : `${wisp.delay}s`,
                animationPlayState: reducedMotion ? "paused" : "running",
                "--tx1": `${wisp.tx1}vw`,
                "--ty1": `${wisp.ty1}vh`,
                "--tx2": `${wisp.tx2}vw`,
                "--ty2": `${wisp.ty2}vh`,
                "--tx3": `${wisp.tx3}vw`,
                "--ty3": `${wisp.ty3}vh`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  )
}
