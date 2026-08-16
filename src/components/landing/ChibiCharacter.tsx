/**
 * Interactive chibi character — the 2D (SVG) representation of the 3D
 * player capsule (cyan body, dark eyes, see Player.tsx). It sits on the
 * landing hero:
 *
 * - Eyes follow the cursor (parallax-in-depth: pupils shift a few px toward
 *   the pointer, only when the pointer actually moves).
 * - Gentle idle bob (translateY) + squash on the shadow to keep it alive.
 * - On scroll the character tilts slightly toward the scroll direction.
 *
 * No external sprite sheets — the whole character is inline SVG + CSS.
 */

import { useEffect, useRef } from 'react'

const MAX_PUPIL_SHIFT = 3.5
const MAX_TILT = 7

export function ChibiCharacter({ className = '' }: { className?: string }) {
  const pupilsRef = useRef<SVGGElement>(null)
  const figureRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const pupils = pupilsRef.current
      if (!pupils) return

      // Normalize pointer position to [-1, 1] across the viewport so the
      // reaction is consistent on any screen size.
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1

      // Cheap sine easing: moves fast near the center, saturates at the edges.
      const ease = (v: number) => Math.sign(v) * Math.sin((Math.abs(v) * Math.PI) / 2)
      const dx = ease(nx) * MAX_PUPIL_SHIFT
      const dy = ease(ny) * MAX_PUPIL_SHIFT * 0.7

      for (const pupil of Array.from(pupils.children)) {
        ;(pupil as SVGElement).setAttribute('transform', `translate(${dx.toFixed(2)}, ${dy.toFixed(2)})`)
      }
    }

    const onScroll = () => {
      const figure = figureRef.current
      if (!figure) return
      const progress = Math.min(1, window.scrollY / window.innerHeight)
      figure.setAttribute('transform', `rotate(${(-progress * MAX_TILT).toFixed(2)})`)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={`animate-chibi-bob ${className}`}>
      <svg
        viewBox="0 0 160 190"
        role="img"
        aria-label="Chibi version of the 3D player character"
        className="h-full w-full drop-shadow-[0_10px_16px_rgba(15,23,42,0.35)]"
      >
        <g ref={figureRef}>
          {/* body: cyan capsule (matches the 3D player) */}
          <rect x="30" y="52" width="100" height="92" rx="50" ry="50" fill="#22d3ee" />
          {/* belly highlight */}
          <rect x="44" y="66" width="56" height="64" rx="28" ry="28" fill="#67e8f9" opacity="0.55" />
          {/* head cap (bigger head, chibi proportions) */}
          <rect x="28" y="20" width="104" height="64" rx="32" ry="32" fill="#22d3ee" />
          {/* hair fringe */}
          <path
            d="M30 40 Q80 8 130 40 L130 30 Q80 2 30 30 Z"
            fill="#0e7490"
          />
          {/* eyes: dark, same as the 3D face markers */}
          <g ref={pupilsRef}>
            <circle cx="60" cy="50" r="8" fill="#0f172a" />
            <circle cx="100" cy="50" r="8" fill="#0f172a" />
          </g>
          {/* eye shine */}
          <circle cx="57" cy="47" r="2.4" fill="#ffffff" />
          <circle cx="97" cy="47" r="2.4" fill="#ffffff" />
          {/* smile */}
          <path d="M66 62 Q80 70 94 62" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* cheeks */}
          <circle cx="50" cy="60" r="5" fill="#fda4af" opacity="0.7" />
          <circle cx="110" cy="60" r="5" fill="#fda4af" opacity="0.7" />
          {/* feet */}
          <rect x="36" y="144" width="34" height="12" rx="6" fill="#0e7490" />
          <rect x="90" y="144" width="34" height="12" rx="6" fill="#0e7490" />
        </g>
      </svg>
      {/* ground shadow — squash & stretchs with the bob */}
      <div className="animate-chibi-shadow mx-auto mt-2 h-3 w-24 rounded-full bg-slate-900/25 blur-[2px]" />
    </div>
  )
}
