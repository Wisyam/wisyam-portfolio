import { Canvas } from '@react-three/fiber'
import { PortfolioScene } from '../scenes/PortfolioScene'
import type { SectionVariant } from '../content'

interface SceneCanvasProps {
  activeSection: SectionVariant | null
  onOpenSection: (id: SectionVariant) => void
  /** Fired once the WebGL context and scene are ready to render. */
  onReady?: () => void
}

/**
 * Top-down angled camera rig (semi-3D): positioned above the world with a
 * ~52deg pitch, looking at the center. shadows => PCFSoftShadowMap.
 */
export function SceneCanvas({ activeSection, onOpenSection, onReady }: SceneCanvasProps) {
  return (
    <Canvas
      className="h-full w-full"
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [0, 22, 17], fov: 45, near: 0.1, far: 200 }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0)
        onReady?.()
      }}
    >
      <PortfolioScene activeSection={activeSection} onOpenSection={onOpenSection} />
    </Canvas>
  )
}
