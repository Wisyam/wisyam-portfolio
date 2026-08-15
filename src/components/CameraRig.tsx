import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { CAMERA_RIG } from '../world/config'

/**
 * Top-down angled camera rig (semi-3D look): sits above and behind the
 * world with a ~54deg pitch, looking at the map center.
 *
 * Static for now - the player movement task extends this into a
 * smooth follow rig.
 */
export function CameraRig() {
  const camera = useThree((state) => state.camera)

  useEffect(() => {
    camera.position.set(...CAMERA_RIG.position)
    camera.lookAt(...CAMERA_RIG.target)
    camera.updateProjectionMatrix()
  }, [camera])

  return null
}
