/**
 * Player character: low-poly capsule with a face marker, keyboard movement
 * (WASD + arrows) and tap-to-move (touch devices: tap the ground to walk
 * there), collision against buildings/props/world boundary, and facing
 * rotation that follows the movement direction.
 *
 * The character itself is a plain <group> whose ref is shared with the
 * CameraRig via PortfolioScene.
 */

import { useFrame } from '@react-three/fiber'
import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useKeyboardInput } from '../../hooks/useKeyboardInput'
import {
  buildingColliders,
  PLAYER_RADIUS,
  rockColliders,
  treeColliders,
  WORLD_LIMIT,
  type Aabb,
  type Circle,
} from './colliders'

const MOVE_SPEED = 6.5
const ROTATION_DAMP = 14
const MAX_DELTA = 0.05
const BODY_Y = 0.9
/** Stop distance (world units) at which tap-to-move considers the target reached. */
const TARGET_EPSILON = 0.2

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Resolve the player circle against a building footprint (AABB): push the
 * position out along the dominant penetration axis. Sliding along walls
 * falls out naturally — touching the face keeps the distance exactly at the
 * player radius, so the collider is skipped until the player moves into it.
 */
function resolveAabbs(position: THREE.Vector3, colliders: Aabb[]) {
  for (const c of colliders) {
    const closestX = clamp(position.x, c.minX, c.maxX)
    const closestZ = clamp(position.z, c.minZ, c.maxZ)
    const dx = position.x - closestX
    const dz = position.z - closestZ
    const distSq = dx * dx + dz * dz
    if (distSq >= PLAYER_RADIUS * PLAYER_RADIUS) continue
    if (distSq === 0) {
      // Center inside the footprint (can only happen via a spawn/edit): push
      // out through the nearer face.
      const pushX = Math.min(position.x - c.minX, c.maxX - position.x)
      const pushZ = Math.min(position.z - c.minZ, c.maxZ - position.z)
      if (pushX <= pushZ) {
        position.x = position.x < (c.minX + c.maxX) / 2 ? c.minX - PLAYER_RADIUS : c.maxX + PLAYER_RADIUS
      } else {
        position.z = position.z < (c.minZ + c.maxZ) / 2 ? c.minZ - PLAYER_RADIUS : c.maxZ + PLAYER_RADIUS
      }
      continue
    }
    if (Math.abs(dx) > Math.abs(dz)) {
      position.x = closestX + Math.sign(dx) * PLAYER_RADIUS
    } else {
      position.z = closestZ + Math.sign(dz) * PLAYER_RADIUS
    }
  }
}

/** Push the position out of circle obstacles (trees, rocks). */
function resolveCircles(position: THREE.Vector3, circles: Circle[]) {
  for (const c of circles) {
    const dx = position.x - c.x
    const dz = position.z - c.z
    const minDist = c.radius + PLAYER_RADIUS
    const distSq = dx * dx + dz * dz
    if (distSq >= minDist * minDist) continue
    if (distSq === 0) {
      position.x = c.x + minDist
      continue
    }
    const dist = Math.sqrt(distSq)
    position.x = c.x + (dx / dist) * minDist
    position.z = c.z + (dz / dist) * minDist
  }
}

/**
 * Advance the position along a normalized direction for one frame, clamped to
 * the world and pushed out of every collider. Shared by keyboard movement and
 * tap-to-move so the two input modes can never drift apart.
 */
function stepPosition(position: THREE.Vector3, dirX: number, dirZ: number, delta: number) {
  position.x += dirX * MOVE_SPEED * delta
  position.z += dirZ * MOVE_SPEED * delta
  position.x = clamp(position.x, -WORLD_LIMIT, WORLD_LIMIT)
  position.z = clamp(position.z, -WORLD_LIMIT, WORLD_LIMIT)
  resolveAabbs(position, buildingColliders)
  resolveCircles(position, treeColliders)
  resolveCircles(position, rockColliders)
}

/** Damp-rotate the facing angle toward a target (front of the capsule is +z). */
function dampFacing(facing: { current: number }, target: number, delta: number) {
  let diff = target - facing.current
  while (diff > Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  facing.current += diff * Math.min(1, delta * ROTATION_DAMP)
}

export function Player({
  playerRef,
  disabled = false,
  moveTargetRef,
}: {
  playerRef: RefObject<THREE.Group | null>
  /** While true (section panel open) the character does not move or rotate. */
  disabled?: boolean
  /** Tap-to-move target in world x/z; null = no target. Cleared on keyboard input. */
  moveTargetRef?: RefObject<THREE.Vector3 | null>
}) {
  const getInput = useKeyboardInput()
  const position = useRef(new THREE.Vector3(0, 0, 0))
  const facing = useRef(0)

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_DELTA)

    if (!disabled) {
      const { x: inputX, z: inputZ } = getInput()
      const moving = inputX !== 0 || inputZ !== 0

      if (moving) {
        // Keyboard takes precedence over a pending tap-to-move target.
        if (moveTargetRef) moveTargetRef.current = null
        stepPosition(position.current, inputX, inputZ, delta)
        dampFacing(facing, Math.atan2(inputX, inputZ), delta)
      } else {
        const target = moveTargetRef?.current
        if (target) {
          const dx = target.x - position.current.x
          const dz = target.z - position.current.z
          const dist = Math.hypot(dx, dz)
          if (dist < TARGET_EPSILON) {
            moveTargetRef.current = null
          } else {
            const dirX = dx / dist
            const dirZ = dz / dist
            stepPosition(position.current, dirX, dirZ, delta)
            dampFacing(facing, Math.atan2(dirX, dirZ), delta)
          }
        }
      }
    }

    const group = playerRef.current
    if (group) {
      group.position.set(position.current.x, BODY_Y, position.current.z)
      group.rotation.y = facing.current
    }
  })

  return (
    <group ref={playerRef} name="player" position={[0, BODY_Y, 0]}>
      {/* Body: rounded capsule, low-poly */}
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 0.8, 8, 16]} />
        <meshStandardMaterial color="#22d3ee" />
      </mesh>
      {/* Face marker: two eyes on the front (+z) so the facing direction reads clearly */}
      <mesh position={[-0.18, 0.16, 0.5]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.18, 0.16, 0.5]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}
