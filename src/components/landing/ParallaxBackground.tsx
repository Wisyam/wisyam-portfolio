/**
 * Pixel-flavored parallax backdrop for the landing page.
 *
 * Layers (back → front): gradient sky → sun → pixel mountains → hills →
 * village silhouette → foreground grass. Each layer translates at a
 * different speed on scroll (translate3d, transform-only for 60fps).
 *
 * On touch/small screens the layer set is simplified (no sun, no village)
 * so the page stays light and jank-free on mobile.
 */

import { useEffect, useRef, useState } from 'react'
import { useIsTouch } from '../../hooks/useIsTouch'

const SCROLL_DAMPING = 3

/** Small viewport (< 640px) gets the simplified layer set even on devices
 * with a fine pointer (e.g. narrow desktop windows, touchscreen laptops). */
function useIsSmallViewport(): boolean {
  const [isSmall] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
  )
  return isSmall
}

interface ParallaxLayerProps {
  /** Scroll speed multiplier. 0 = fixed, 1 = moves with page, < 1 = slower. */
  speed: number
  /** Translate offset applied on top of the parallax shift (units: px). */
  offsetY?: number
  children: React.ReactNode
}

function ParallaxLayer({ speed, offsetY = 0, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let current = 0

    const update = () => {
      raf = 0
      const scrollY = window.scrollY
      const target = scrollY * speed + offsetY
      current += (target - current) / SCROLL_DAMPING
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed, offsetY])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-x-0 will-change-transform">
      {children}
    </div>
  )
}

/** A single pixel block rendered with box-shadow (no sprite sheets). */
function PixelBlock({ size, x, y, color }: { size: number; x: number; y: number; color: string }) {
  return (
    <span
      aria-hidden
      className="absolute block"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        boxShadow: `${size}px 0 0 ${color}, ${size * 2}px 0 0 ${color}, ${size * 3}px 0 0 ${color}`,
      }}
    />
  )
}

/**
 * Village silhouette built from stacked pixel blocks. Pure CSS, generated
 * from a tiny map so there are no sprite assets to load.
 */
function VillageSilhouette() {
  const house = (left: number, height: number, body: string, roof: string, windows: string) => (
    <span aria-hidden className="absolute" style={{ left, bottom: 0 }}>
      {/* body */}
      <span
        className="absolute block"
        style={{
          width: 90,
          height,
          bottom: 0,
          background: body,
          boxShadow: `0 ${-height + 12}px 0 0 ${roof}`,
        }}
      />
      {/* windows */}
      <span
        className="absolute block"
        style={{
          width: 12,
          height: 12,
          left: 22,
          bottom: 18,
          background: windows,
          boxShadow: `38px 0 0 ${windows}`,
        }}
      />
    </span>
  )

  return (
    <div className="absolute inset-x-0 bottom-0 h-44">
      {house(40, 72, '#3f5f43', '#2f4a33', '#ffd98a')}
      {house(160, 52, '#4a6b4e', '#38503c', '#ffc96b')}
      {house(300, 88, '#3f5f43', '#2f4a33', '#ffd98a')}
      {house(460, 60, '#4a6b4e', '#38503c', '#ffc96b')}
      {house(620, 96, '#3f5f43', '#2f4a33', '#ffd98a')}
      {house(780, 54, '#4a6b4e', '#38503c', '#ffc96b')}
      {/* ground line */}
      <span className="absolute bottom-0 left-0 block h-3 w-full bg-[#35503a]" />
    </div>
  )
}

/** Pixel mountains (two staggered triangle ranges). */
function PixelMountains() {
  const peak = (left: number, width: number, height: number, color: string) => (
    <span
      aria-hidden
      className="absolute block"
      style={{
        left,
        bottom: 0,
        width,
        height,
        background: color,
        clipPath: `polygon(0 100%, 50% 0, 100% 100%)`,
      }}
    />
  )
  return (
    <div className="absolute inset-x-0 bottom-0 h-64">
      {peak(-80, 320, 200, '#7d9c8a')}
      {peak(200, 260, 150, '#6f8f7d')}
      {peak(430, 300, 220, '#7d9c8a')}
      {peak(720, 280, 160, '#6f8f7d')}
      {peak(980, 340, 240, '#7d9c8a')}
      {/* snow caps */}
      <span
        aria-hidden
        className="absolute block bg-[#e8f2ec]"
        style={{ left: 82, bottom: 186, width: 26, height: 16, clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
      />
      <span
        aria-hidden
        className="absolute block bg-[#e8f2ec]"
        style={{ left: 566, bottom: 204, width: 26, height: 16, clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
      />
      <span
        aria-hidden
        className="absolute block bg-[#e8f2ec]"
        style={{ left: 1114, bottom: 224, width: 26, height: 16, clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
      />
    </div>
  )
}

/** Rolling pixel hills. */
function PixelHills() {
  const hill = (left: number, width: number, height: number, color: string) => (
    <span
      aria-hidden
      className="absolute block"
      style={{
        left,
        bottom: 0,
        width,
        height,
        background: color,
        borderRadius: `${width / 2}px ${width / 2}px 0 0`,
      }}
    />
  )
  return (
    <div className="absolute inset-x-0 bottom-0 h-48">
      {hill(-60, 340, 150, '#8fbf6e')}
      {hill(240, 300, 120, '#7db05e')}
      {hill(520, 360, 170, '#8fbf6e')}
      {hill(860, 320, 130, '#7db05e')}
      {hill(1160, 300, 150, '#8fbf6e')}
    </div>
  )
}

/** Foreground grass strip with pixel tufts (moves with the page). */
function ForegroundGrass() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-32">
      <span className="absolute bottom-0 left-0 block h-20 w-full bg-[#4c9a4e]" />
      <span
        className="absolute bottom-20 left-0 block h-4 w-full"
        style={{ background: '#5daa5e', boxShadow: '0 16px 0 #5daa5e, 0 32px 0 #5daa5e' }}
      />
      <PixelBlock size={10} x={90} y={96} color="#3c7f3e" />
      <PixelBlock size={10} x={300} y={88} color="#3c7f3e" />
      <PixelBlock size={10} x={540} y={100} color="#3c7f3e" />
      <PixelBlock size={10} x={760} y={90} color="#3c7f3e" />
      <PixelBlock size={10} x={1000} y={98} color="#3c7f3e" />
    </div>
  )
}

/** Gradient sky + golden-hour sun. */
function SkyAndSun() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(to bottom, #8ec9e8 0%, #a5d8ec 30%, #ffd9a0 62%, #ffc980 100%)',
      }}
    >
      <span
        aria-hidden
        className="absolute block rounded-full"
        style={{
          left: '12%',
          top: 90,
          width: 110,
          height: 110,
          background: '#ffefc2',
          boxShadow: '0 0 60px 30px rgba(255, 233, 178, 0.55)',
        }}
      />
      {/* floating pixel clouds */}
      <PixelBlock size={12} x={600} y={140} color="rgba(255,255,255,0.8)" />
      <PixelBlock size={12} x={620} y={128} color="rgba(255,255,255,0.8)" />
      <PixelBlock size={12} x={900} y={220} color="rgba(255,255,255,0.6)" />
      <PixelBlock size={12} x={920} y={208} color="rgba(255,255,255,0.6)" />
    </div>
  )
}

/**
 * Fixed full-viewport pixel parallax scene. Sits behind the page content
 * (z-0); the scrolling quest cards (z-10) pass over it.
 */
export function ParallaxBackground() {
  const isTouch = useIsTouch()
  const isSmall = useIsSmallViewport()
  const simplified = isTouch || isSmall

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      <SkyAndSun />
      {!simplified && (
        <ParallaxLayer speed={0.08} offsetY={0}>
          <PixelMountains />
        </ParallaxLayer>
      )}
      <ParallaxLayer speed={0.2}>
        <PixelHills />
      </ParallaxLayer>
      {!simplified && (
        <ParallaxLayer speed={0.34}>
          <VillageSilhouette />
        </ParallaxLayer>
      )}
      <ParallaxLayer speed={0.55}>
        <ForegroundGrass />
      </ParallaxLayer>
    </div>
  )
}
