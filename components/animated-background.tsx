"use client"

import { useEffect, useRef, useState } from "react"

type Blob = {
  id: number
  hue: number
  chroma: number
  lightness: number
  size: number
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

// Curated hues so random picks always look intentional: brand teal, violet, coral, sage.
const HUES = [200, 300, 30, 150]

const RESET_INTERVAL_MS = 15 * 60 * 1000
const PARALLAX_MAX_PX = 28

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createBlobs(): Blob[] {
  const positions = [
    { top: rand(0, 30), left: rand(0, 30) },
    { top: rand(0, 30), left: rand(70, 100) },
    { top: rand(70, 100), left: rand(0, 30) },
    { top: rand(70, 100), left: rand(70, 100) },
  ]

  return HUES.map((hue, i) => ({
    id: Date.now() + i,
    hue,
    chroma: rand(0.12, 0.17),
    lightness: rand(0.68, 0.78),
    size: rand(32, 52),
    top: positions[i].top,
    left: positions[i].left,
    duration: rand(22, 34),
    delay: rand(-20, 0),
    depth: rand(0.5, 1.4),
    tx1: rand(-10, 10),
    ty1: rand(-10, 10),
    tx2: rand(-10, 10),
    ty2: rand(-10, 10),
    tx3: rand(-10, 10),
    ty3: rand(-10, 10),
  }))
}

export function AnimatedBackground() {
  const [blobs, setBlobs] = useState<Blob[] | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setBlobs(createBlobs())

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(media.matches)
    const onChange = () => setReducedMotion(media.matches)
    media.addEventListener("change", onChange)

    const interval = setInterval(() => setBlobs(createBlobs()), RESET_INTERVAL_MS)

    return () => {
      media.removeEventListener("change", onChange)
      clearInterval(interval)
    }
  }, [])

  // Subtle cursor parallax: blobs drift slightly toward the pointer, each at its own depth.
  useEffect(() => {
    if (reducedMotion) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }
    let raf = 0

    const onPointerMove = (e: PointerEvent) => {
      target = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04

      wrapperRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = blobs?.[i]?.depth ?? 1
        const px = current.x * PARALLAX_MAX_PX * depth
        const py = current.y * PARALLAX_MAX_PX * depth
        el.style.transform = `translate(${px}px, ${py}px)`
      })

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion, blobs])

  if (!blobs) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {blobs.map((blob, i) => (
        <div
          key={blob.id}
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
                top: `${blob.top}%`,
                left: `${blob.left}%`,
                width: `${blob.size}vw`,
                height: `${blob.size}vw`,
                background: `oklch(${blob.lightness} ${blob.chroma} ${blob.hue})`,
                animationDuration: reducedMotion ? undefined : `${blob.duration}s`,
                animationDelay: reducedMotion ? undefined : `${blob.delay}s`,
                animationPlayState: reducedMotion ? "paused" : "running",
                "--tx1": `${blob.tx1}vw`,
                "--ty1": `${blob.ty1}vh`,
                "--tx2": `${blob.tx2}vw`,
                "--ty2": `${blob.ty2}vh`,
                "--tx3": `${blob.tx3}vw`,
                "--ty3": `${blob.ty3}vh`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  )
}
