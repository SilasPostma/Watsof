"use client"

import { useEffect, useState } from "react"

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

  if (!blobs) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {blobs.map((blob) => (
        <div
          key={blob.id}
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
      ))}
    </div>
  )
}
