import { Canvas } from '@react-three/fiber'
import { PortfolioScene } from '../scenes/PortfolioScene'
import { CAMERA_RIG } from '../world/config'

export function SceneCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      shadows="soft"
      camera={{
        position: CAMERA_RIG.position,
        fov: 45,
        near: 0.1,
        far: 200,
      }}
    >
      <PortfolioScene />
    </Canvas>
  )
}
