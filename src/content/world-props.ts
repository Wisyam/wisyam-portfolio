/**
 * Decorative world prop definitions (trees, rocks, fence boundary).
 * Kept separate from the rendering components so gameplay code (player
 * collision, interaction) can reference the exact prop positions without
 * importing JSX.
 */

export interface GroundProp {
  x: number
  z: number
  scale: number
}

/** Trees scattered between buildings; all within ±18 so the fence at ±20 stays clear. */
export const TREES: GroundProp[] = [
  { x: -16, z: -14, scale: 1.15 },
  { x: -15, z: -2, scale: 0.9 },
  { x: -16, z: 11, scale: 1.25 },
  { x: -7, z: -15, scale: 1.0 },
  { x: 4, z: -15, scale: 1.1 },
  { x: 14, z: -12, scale: 0.85 },
  { x: 16, z: -3, scale: 1.2 },
  { x: 17, z: 5, scale: 0.95 },
  { x: 17, z: 12, scale: 1.3 },
  { x: -15, z: 16, scale: 1.05 },
  { x: -3, z: -16, scale: 0.9 },
  { x: 9, z: 16, scale: 1.0 },
]

export const ROCKS: GroundProp[] = [
  { x: -12.5, z: -11, scale: 1.0 },
  { x: 6.5, z: -12.5, scale: 0.7 },
  { x: 14.5, z: 1, scale: 1.2 },
  { x: 13, z: 13, scale: 0.8 },
  { x: -4.5, z: 15.5, scale: 0.9 },
  { x: 2, z: 6.5, scale: 1.1 },
  { x: -6, z: 2, scale: 0.75 },
]

/** Boundary fence half-extent in world units (±FENCE_HALF). */
export const FENCE_HALF = 20
