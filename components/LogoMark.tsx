'use client'
import { useEffect, useRef, useState } from 'react'

// ElderCare+ logo mark — two arcs cradling a heart ("hands holding care").
// Draws in via stroke-dashoffset on mount, respects prefers-reduced-motion.
export default function LogoMark({ size = 28 }: { size?: number }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setReady(true); return }
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const len = 120

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="url(#eldercare-grad)" />
      {/* cradling arcs (hands) */}
      <path
        d="M7 20c0-5 3-9 9-9s9 4 9 9"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* heart (care) — draws in */}
      <path
        ref={pathRef}
        d="M16 22.5s-6-3.7-6-8.1c0-2.4 1.9-4.1 4.1-4.1 1.2 0 2.3.5 3 1.4a4 4 0 0 1 2.9-1.4c2.2 0 4.1 1.7 4.1 4.1 0 4.4-6 8.1-6 8.1z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinejoin="round"
        style={{
          strokeDasharray: len,
          strokeDashoffset: ready ? 0 : len,
          opacity: ready ? 1 : 0,
          transition: 'stroke-dashoffset 700ms cubic-bezier(0.23,1,0.32,1), opacity 400ms cubic-bezier(0.23,1,0.32,1)',
        }}
      />
      <defs>
        <linearGradient id="eldercare-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
