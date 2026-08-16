/**
 * Portfolio 3D world: sky, fog, lighting, ground, props and the 6 section
 * buildings, plus the player character and its follow camera.
 *
 * Also owns the interaction glue: each frame it computes which building is
 * within E-key range of the player (visible as the "Press E" prompt), and a
 * keydown listener opens that section's panel.
 */

import { createRef, useEffect, useRef, useState, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CameraRig } from '../components/player/CameraRig'
import { Player } from '../components/player/Player'
import { Ground } from '../components/world/Ground'
import { Props } from '../components/world/Props'
import { SectionBuilding } from '../components/world/SectionBuilding'
import { SECTIONS, type SectionVariant } from '../content/sections'

const SKY_COLOR = '#a7d8f0'
/** Extra distance beyond the highlight ring radius that counts as "in range". */
const INTERACT_MARGIN = 1.1

interface PortfolioSceneProps {
  activeSection: SectionVariant | null
  onOpenSection: (id: SectionVariant) => void
}

export function PortfolioScene({ activeSection, onOpenSection }: PortfolioSceneProps) {
  const playerRef = useRef<THREE.Group | null>(null)

  const [inRangeSection, setInRangeSection] = useState<SectionVariant | null>(null)
  const inRangeRef = useRef<SectionVariant | null>(null)

  // One stable ref per building; shared with every label so each label is
  // hidden whenever another building stands between it and the camera.
  const buildingRefs = useRef<RefObject<THREE.Group | null>[]>([])
  if (buildingRefs.current.length === 0) {
    buildingRefs.current = SECTIONS.map(() => createRef<THREE.Group>())
  }
  const occludeRefs = buildingRefs.current as RefObject<THREE.Object3D>[]

  useFrame(() => {
    const player = playerRef.current
    if (!player) return

    let nearest: SectionVariant | null = null
    let bestDistSq = Infinity
    for (const section of SECTIONS) {
      const dx = player.position.x - section.position[0]
      const dz = player.position.z - section.position[2]
      const range = section.ringRadius + INTERACT_MARGIN
      const distSq = dx * dx + dz * dz
      if (distSq < range * range && distSq < bestDistSq) {
        bestDistSq = distSq
        nearest = section.id
      }
    }
    if (nearest !== inRangeRef.current) {
      inRangeRef.current = nearest
      setInRangeSection(nearest)
    }
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE' || event.repeat || activeSection) return
      const id = inRangeRef.current
      if (id) onOpenSection(id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeSection, onOpenSection])

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

      {SECTIONS.map((section, index) => (
        <SectionBuilding
          key={section.id}
          section={section}
          occludeRef={buildingRefs.current[index]}
          occludeRefs={occludeRefs}
          onOpen={() => onOpenSection(section.id)}
          showPrompt={inRangeSection === section.id && activeSection === null}
        />
      ))}

      <Player playerRef={playerRef} disabled={activeSection !== null} />
      <CameraRig playerRef={playerRef} />
    </>
  )
}
