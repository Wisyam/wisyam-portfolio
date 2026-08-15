import { Canvas } from '@react-three/fiber'
import { PortfolioScene } from '../scenes/PortfolioScene'

export function SceneCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [9, 13, 9], fov: 45, near: 0.1, far: 200 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <PortfolioScene />
    </Canvas>
  )
}
