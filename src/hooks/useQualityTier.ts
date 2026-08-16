/**
 * Quality tier (epic decision #10): device capability detection →
 * `low | mid | high`, with a manual override. Every visual feature that has a
 * cheap/expensive variant (shaders, effects, shadows, particle counts) must
 * read its tier from here instead of hardcoding.
 *
 * Usage:
 *   const { tier, auto, setTier } = useQualityTier()
 *   // cheap variant when low, e.g.:
 *   const settings = QUALITY_TIER_SETTINGS[tier]
 *   <Canvas dpr={[1, settings.maxDpr]} shadows={settings.shadows} />
 *   // manual toggle in HUD:
 *   setTier('low' | 'mid' | 'high' | 'auto')
 *
 * Nothing consumes the tier yet — SceneCanvas keeps its v1 settings until the
 * Performance issue wires it in. The constant + docs are the contract.
 */

import { useCallback, useMemo, useState } from 'react'

export type QualityTier = 'low' | 'mid' | 'high'
export type QualityTierSetting = QualityTier | 'auto'

export interface QualityTierSettings {
  /** Upper cap for the renderer pixel ratio (Canvas dpr). */
  maxDpr: number
  /** Whether expensive shadow maps should be rendered. */
  shadows: boolean
  /** Upper bound for ambient particle counts (Sparkles, dust, etc.). */
  maxParticles: number
}

/** Per-tier caps — future features read this instead of inventing their own. */
export const QUALITY_TIER_SETTINGS: Record<QualityTier, QualityTierSettings> = {
  low: { maxDpr: 1, shadows: false, maxParticles: 30 },
  mid: { maxDpr: 1.5, shadows: true, maxParticles: 60 },
  high: { maxDpr: 2, shadows: true, maxParticles: 90 },
}

/**
 * Device detection: WebGL2 availability (software/old GPUs fall back to low),
 * low memory budget, screen size and pixel ratio. Computed once — a device
 * does not change mid-session (same pattern as useIsTouch).
 */
export function detectQualityTier(): QualityTier {
  if (typeof window === 'undefined') return 'high'

  const { devicePixelRatio, innerWidth } = window
  const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory

  let webgl2 = false
  try {
    const canvas = document.createElement('canvas')
    webgl2 = canvas.getContext('webgl2') !== null
  } catch {
    webgl2 = false
  }

  if (!webgl2 || (deviceMemory !== undefined && deviceMemory <= 2) || innerWidth < 480) {
    return 'low'
  }
  if (innerWidth < 1024 || devicePixelRatio < 2 || (deviceMemory !== undefined && deviceMemory <= 4)) {
    return 'mid'
  }
  return 'high'
}

export interface QualityTierController {
  tier: QualityTier
  /** true while the tier follows device detection, false after a manual override. */
  auto: boolean
  setTier: (setting: QualityTierSetting) => void
}

export function useQualityTier(): QualityTierController {
  const [detected] = useState(detectQualityTier)
  const [override, setOverride] = useState<QualityTier | null>(null)

  const setTier = useCallback((setting: QualityTierSetting) => {
    setOverride(setting === 'auto' ? null : setting)
  }, [])

  return useMemo(
    () => ({
      tier: override ?? detected,
      auto: override === null,
      setTier,
    }),
    [detected, override, setTier],
  )
}
