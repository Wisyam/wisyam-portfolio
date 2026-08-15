/**
 * Portfolio 3D world: sky, fog, lighting, ground, props and the 6 section
 * buildings. Static scene — player movement and interaction land in later tasks.
 */

import { Ground } from '../components/world/Ground'
import { Props } from '../components/world/Props'
import { SectionBuilding } from '../components/world/SectionBuilding'
import { SECTIONS } from '../content/sections'

const SKY_COLOR = '#a7d8f0'

export function PortfolioScene() {
  return (
    <>
      <color attach="background" args={[SKY_COLOR]} />
      <fog attach="fog" args={[SKY_COLOR, 35, 70]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#87ceeb', '#4a7c59', 0.5]} />
      <directionalLight
        position={[12, 24, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-bias={-0.0002}
      />

      <Ground />
      <Props />

      {SECTIONS.map((section) => (
        <SectionBuilding key={section.id} section={section} />
      ))}
    </>
  )
}
