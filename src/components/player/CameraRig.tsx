/**
 * Camera rig: follows the player with a damped (frame-rate independent) lerp,
 * keeping the top-down angled pitch (~52deg) and the character roughly
 * centered with a small look-ahead so the path ahead is visible.
 */

import { useFrame } from '@react-three/fiber'
import { useRef, type RefObject } from 'react'
import * as THREE from 'three'

/** Camera offset from the player, matching the world rig's original top-down angle. */
const CAMERA_OFFSET = new THREE.Vector3(0, 22, 17)
/** Look slightly ahead of the player (toward -z, the "up" direction on screen). */
const LOOK_AHEAD = -2.5
/** Higher = snappier follow; still trails slightly on sharp turns for game feel. */
const FOLLOW_DAMP = 6.5

export function CameraRig({ playerRef }: { playerRef: RefObject<THREE.Group | null> }) {
  const lookTarget = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const player = playerRef.current
    if (!player) return

    const camera = state.camera
    camera.position.x = THREE.MathUtils.damp(camera.position.x, player.position.x + CAMERA_OFFSET.x, FOLLOW_DAMP, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, CAMERA_OFFSET.y, FOLLOW_DAMP, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, player.position.z + CAMERA_OFFSET.z, FOLLOW_DAMP, delta)

    lookTarget.current.set(player.position.x, 0, player.position.z + LOOK_AHEAD)
    camera.lookAt(lookTarget.current)
  })

  return null
}
