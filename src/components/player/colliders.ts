/**
 * Collision data for the player: world boundary, building footprints (AABB)
 * and prop obstacles (circles). Positions derive from the single source of
 * truth in src/content (SECTIONS + world-props), so collision can never
 * drift from what is actually rendered.
 */

import { SECTIONS, type SectionVariant } from '../../content'
import { ROCKS, TREES } from '../../content'

/** Capsule radius of the player character. */
export const PLAYER_RADIUS = 0.5

/** Fence sits at ±20; keep the player center inside so the capsule never clips the rails. */
export const WORLD_LIMIT = 19.2

export interface Aabb {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

export interface Circle {
  x: number
  z: number
  radius: number
}

interface BuildingColliderDef {
  /** Footprint center offset from the building origin in sections.ts. */
  offset: [number, number]
  /** Footprint half extents [x, z] covering every mesh of the building. */
  half: [number, number]
}

const BUILDING_COLLIDER_DEFS: Record<SectionVariant, BuildingColliderDef> = {
  // House body 3.4x3 + 4-sided pyramid roof (circumradius 2.5 -> half 1.77).
  about: { offset: [0, 0], half: [1.8, 1.8] },
  // Tower base 2.6x2.6.
  skills: { offset: [0, 0], half: [1.3, 1.3] },
  // L-shaped cluster of 3 boxes: x in [-2.9, 2.7], z in [-1.1, 3.9].
  projects: { offset: [-0.1, 1.4], half: [2.8, 2.5] },
  // Long office (6.4x3) + wing at x=3.8: x in [-3.2, 5.1], z in [-1.5, 1.5].
  experience: { offset: [0.95, 0], half: [4.15, 1.5] },
  // School body 4.4x3 + flat roof 4.8x3.4.
  education: { offset: [0, 0], half: [2.4, 1.7] },
  // Cabin body 2.6x3 + pyramid roof (circumradius 2.1 -> half 1.49).
  contact: { offset: [0, 0], half: [1.5, 1.5] },
}

export const buildingColliders: Aabb[] = SECTIONS.map((section) => {
  const def = BUILDING_COLLIDER_DEFS[section.id]
  const cx = section.position[0] + def.offset[0]
  const cz = section.position[2] + def.offset[1]
  return {
    minX: cx - def.half[0],
    maxX: cx + def.half[0],
    minZ: cz - def.half[1],
    maxZ: cz + def.half[1],
  }
})

/** Tree trunks block the player; radius keeps the head clear of the canopy. */
export const treeColliders: Circle[] = TREES.map((tree) => ({
  x: tree.x,
  z: tree.z,
  radius: 1.0 * tree.scale,
}))

export const rockColliders: Circle[] = ROCKS.map((rock) => ({
  x: rock.x,
  z: rock.z,
  radius: 0.55 * rock.scale,
}))
