import { CameraRig } from '../components/CameraRig'
import { SECTIONS, WORLD_HALF } from '../world/config'
import { SectionBuilding } from '../world/SectionBuilding'
import { BorderStrip, Fence, Fountain, Paths, Rocks, Trees } from '../world/props'

/**
 * The 3D portfolio world: low-poly grass map with a perimeter fence,
 * six labeled section buildings, decorative props and soft shadows.
 * Player movement / interaction land in later tasks.
 */
export function PortfolioScene() {
  return (
    <>
      <color attach="background" args={['#a7d8f0']} />
      <fog attach="fog" args={['#a7d8f0', 45, 130]} />

      <CameraRig />

      {/* Lighting: ambient + hemisphere fill + directional sun with soft shadows */}
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#cfe8ff', '#5b8c4e', 0.5]} />
      <directionalLight
        position={[14, 26, 10]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-bias={-0.0004}
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[WORLD_HALF * 2, WORLD_HALF * 2]} />
        <meshStandardMaterial color="#7cb96a" />
      </mesh>

      <BorderStrip />
      <Paths />
      <Fountain />

      {/* Six labeled portfolio sections */}
      {SECTIONS.map((section) => (
        <SectionBuilding key={section.id} section={section} />
      ))}

      {/* Decorative props */}
      <Trees />
      <Rocks />
      <Fence />
    </>
  )
}
