/**
 * Ground plane (grass) + the two dirt paths crossing at the center.
 *
 * On touch devices the ground also acts as the tap-to-move surface: a
 * pointer-down on the grass sets the player's walk target (buildings are
 * separate meshes, so tapping a building still opens its panel instead).
 */

import { useIsTouch } from '../../hooks/useIsTouch'

const GROUND_SIZE = 44
const GROUND_COLOR = '#67b26f'
const PATH_COLOR = '#c9b37e'

const PATH_LENGTH = 16
const PATH_WIDTH = 1.5
const PATH_HEIGHT = 0.04

interface GroundProps {
  /** Called with the world x/z of a ground tap (touch devices only). */
  onTap?: (x: number, z: number) => void
}

export function Ground({ onTap }: GroundProps) {
  const isTouch = useIsTouch()

  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerDown={(event) => {
          if (!isTouch || !onTap) return
          event.stopPropagation()
          // event.point is already in world space, on the plane surface.
          onTap(event.point.x, event.point.z)
        }}
      >
        <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
        <meshStandardMaterial color={GROUND_COLOR} />
      </mesh>

      {/* Cross paths: along x and z, from the center outward */}
      <mesh position={[0, PATH_HEIGHT / 2, 0]} receiveShadow>
        <boxGeometry args={[PATH_LENGTH, PATH_HEIGHT, PATH_WIDTH]} />
        <meshStandardMaterial color={PATH_COLOR} />
      </mesh>
      <mesh position={[0, PATH_HEIGHT / 2, 0]} receiveShadow>
        <boxGeometry args={[PATH_WIDTH, PATH_HEIGHT, PATH_LENGTH]} />
        <meshStandardMaterial color={PATH_COLOR} />
      </mesh>
    </>
  )
}
