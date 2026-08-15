/**
 * Ground plane (grass) + the two dirt paths crossing at the center.
 */

const GROUND_SIZE = 44
const GROUND_COLOR = '#67b26f'
const PATH_COLOR = '#c9b37e'

const PATH_LENGTH = 16
const PATH_WIDTH = 1.5
const PATH_HEIGHT = 0.04

export function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
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
