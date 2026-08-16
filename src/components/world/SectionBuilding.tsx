/**
 * One distinct low-poly building per portfolio section + its floating label.
 * Buildings stay as simple primitives (boxes/cones/cylinders) so a later task
 * can add player collision without touching the meshes.
 *
 * Every building is interactable: hovering highlights it (amber emissive +
 * ground ring), clicking it from any distance opens its section panel (R3F
 * raycast events bubble up from the child meshes), and a "Press E" pill is
 * shown while the player stands in range.
 */

import { Html } from '@react-three/drei'
import { useEffect, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import type { Group, Object3D } from 'three'
import type { PortfolioSection, SectionVariant } from '../../content/sections'

const HOVER_EMISSIVE = '#fbbf24'
const HOVER_EMISSIVE_INTENSITY = 0.5
const RING_COLOR = '#fbbf24'
const RING_WIDTH = 0.3
/** Below the section label so the prompt reads as a second line. */
const PROMPT_LABEL_OFFSET = 0.85

/**
 * Vertical offset of the floating label above each building's highest point.
 * The camera sits ~23-35 units from the buildings, so distanceFactor is tuned
 * to render the text-xs pill at a readable 10-15px on screen.
 */
const LABEL_HEIGHTS: Record<SectionVariant, number> = {
  about: 4.7,
  skills: 6.4,
  projects: 4.2,
  experience: 3.4,
  education: 6.9,
  contact: 5.2,
}

function SectionLabel({
  label,
  height,
  occludeRefs,
}: {
  label: string
  height: number
  occludeRefs?: RefObject<Object3D>[]
}) {
  return (
    <Html
      position={[0, height, 0]}
      center
      distanceFactor={24}
      occlude={occludeRefs}
      // wrapperClass hits the outer container: without it the label div would
      // swallow clicks/pointer events and block raycast interaction below it.
      wrapperClass="pointer-events-none"
      className="pointer-events-none select-none"
    >
      <div className="whitespace-nowrap rounded-full border border-white/20 bg-slate-900/80 px-2 py-0.5 text-xs font-medium text-white shadow-lg">
        {label}
      </div>
    </Html>
  )
}

/** Cozy house: box body, pyramid roof, door, windows, chimney. */
function AboutBuilding() {
  return (
    <>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3.4, 2.2, 3]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
      <mesh position={[0, 3.05, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.5, 1.7, 4]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
      <mesh position={[0, 0.7, 1.51]} castShadow>
        <boxGeometry args={[0.7, 1.4, 0.1]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      <mesh position={[-1.1, 1.6, 1.51]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#aed6f1" />
      </mesh>
      <mesh position={[1.1, 1.6, 1.51]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#aed6f1" />
      </mesh>
      <mesh position={[-0.8, 2.75, -0.8]} castShadow>
        <boxGeometry args={[0.45, 0.9, 0.45]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </>
  )
}

/** Tower: shrinking stacked boxes, cylinder cap, sphere finial. */
function SkillsBuilding() {
  return (
    <>
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[2.6, 1.3, 2.6]} />
        <meshStandardMaterial color="#6c3483" />
      </mesh>
      <mesh position={[0, 1.95, 0]} castShadow>
        <boxGeometry args={[2.2, 1.3, 2.2]} />
        <meshStandardMaterial color="#7d3c98" />
      </mesh>
      <mesh position={[0, 3.25, 0]} castShadow>
        <boxGeometry args={[1.8, 1.3, 1.8]} />
        <meshStandardMaterial color="#8e44ad" />
      </mesh>
      <mesh position={[0, 4.5, 0]} castShadow>
        <cylinderGeometry args={[1.0, 1.0, 1.2, 8]} />
        <meshStandardMaterial color="#a569bd" />
      </mesh>
      <mesh position={[0, 5.3, 0]} castShadow>
        <sphereGeometry args={[0.35, 8, 6]} />
        <meshStandardMaterial color="#c39bd3" />
      </mesh>
    </>
  )
}

/** Projects: cluster of three boxes in an L shape, blue family. */
function ProjectsBuilding() {
  return (
    <>
      <mesh position={[-1.4, 1.2, 0]} castShadow>
        <boxGeometry args={[3, 2.4, 2.2]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>
      <mesh position={[1.6, 1.5, 0.4]} castShadow>
        <boxGeometry args={[2.2, 3, 2.2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      <mesh position={[0.1, 0.9, 2.6]} castShadow>
        <boxGeometry args={[2.6, 1.8, 2.6]} />
        <meshStandardMaterial color="#1f618d" />
      </mesh>
    </>
  )
}

/** Experience: long low office with flat roof and a smaller wing. */
function ExperienceBuilding() {
  return (
    <>
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[6, 1.8, 2.6]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      <mesh position={[0, 1.95, 0]} castShadow>
        <boxGeometry args={[6.4, 0.3, 3]} />
        <meshStandardMaterial color="#1e8449" />
      </mesh>
      <mesh position={[3.8, 0.7, 0]} castShadow>
        <boxGeometry args={[2.2, 1.4, 2.2]} />
        <meshStandardMaterial color="#2ecc71" />
      </mesh>
      <mesh position={[3.8, 1.52, 0]} castShadow>
        <boxGeometry args={[2.6, 0.25, 2.6]} />
        <meshStandardMaterial color="#239b56" />
      </mesh>
    </>
  )
}

/** Education: school with flat roof, flag pole and a cone pennant flag. */
function EducationBuilding() {
  return (
    <>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[4.4, 2.2, 3]} />
        <meshStandardMaterial color="#f1c40f" />
      </mesh>
      <mesh position={[0, 2.375, 0]} castShadow>
        <boxGeometry args={[4.8, 0.35, 3.4]} />
        <meshStandardMaterial color="#d4ac0d" />
      </mesh>
      <mesh position={[2.6, 4.25, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 3.4, 6]} />
        <meshStandardMaterial color="#bdc3c7" />
      </mesh>
      <mesh position={[2.95, 5.85, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <coneGeometry args={[0.28, 0.7, 3]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
    </>
  )
}

/** Contact: small cabin with pyramid roof, door and a thin antenna. */
function ContactBuilding() {
  return (
    <>
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2.6, 2, 3]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      <mesh position={[0, 2.6, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.1, 1.2, 4]} />
        <meshStandardMaterial color="#922b21" />
      </mesh>
      <mesh position={[0, 0.65, 1.51]} castShadow>
        <boxGeometry args={[0.7, 1.3, 0.1]} />
        <meshStandardMaterial color="#641e16" />
      </mesh>
      <mesh position={[1.0, 3.4, 0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.4, 6]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      <mesh position={[1.0, 4.68, 0.8]} castShadow>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#ecf0f1" />
      </mesh>
    </>
  )
}

function BuildingMeshes({ variant }: { variant: SectionVariant }) {
  switch (variant) {
    case 'about':
      return <AboutBuilding />
    case 'skills':
      return <SkillsBuilding />
    case 'projects':
      return <ProjectsBuilding />
    case 'experience':
      return <ExperienceBuilding />
    case 'education':
      return <EducationBuilding />
    case 'contact':
      return <ContactBuilding />
  }
}

interface SectionBuildingProps {
  section: PortfolioSection
  /** Group ref this building attaches to (collected by the scene for label occlusion). */
  occludeRef?: RefObject<Group | null>
  /** All building group refs; every label raycasts against all buildings. */
  occludeRefs?: RefObject<Object3D>[]
  /** Called when the building is clicked (raycast, any distance). */
  onOpen?: () => void
  /** Show the "Press E" prompt pill (player is in range, no panel open). */
  showPrompt?: boolean
}

export function SectionBuilding({
  section,
  occludeRef,
  occludeRefs,
  onOpen,
  showPrompt = false,
}: SectionBuildingProps) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group | null>(null)
  const savedEmissive = useRef<
    Array<{ material: THREE.MeshStandardMaterial; color: THREE.Color; intensity: number }>
  >([])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const materials: THREE.MeshStandardMaterial[] = []
    group.traverse((object) => {
      const mesh = object as THREE.Mesh
      if (mesh.isMesh && mesh.material instanceof THREE.MeshStandardMaterial) {
        materials.push(mesh.material)
      }
    })

    if (hovered) {
      savedEmissive.current = materials.map((material) => ({
        material,
        color: material.emissive.clone(),
        intensity: material.emissiveIntensity,
      }))
      for (const saved of savedEmissive.current) {
        saved.material.emissive.set(HOVER_EMISSIVE)
        saved.material.emissiveIntensity = HOVER_EMISSIVE_INTENSITY
      }
    } else {
      for (const saved of savedEmissive.current) {
        saved.material.emissive.copy(saved.color)
        saved.material.emissiveIntensity = saved.intensity
      }
      savedEmissive.current = []
    }
  }, [hovered])

  const highlighted = hovered || showPrompt

  return (
    <group
      position={section.position}
      ref={(node) => {
        groupRef.current = node
        if (occludeRef) occludeRef.current = node
      }}
      onPointerOver={() => {
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(event) => {
        event.stopPropagation()
        onOpen?.()
      }}
    >
      <BuildingMeshes variant={section.id} />

      {/* Mounted only while highlighted: three.js raycasts invisible meshes,
          so a hidden ring would swallow clicks on the ground next to the
          building and open the panel ("phantom click"). */}
      {highlighted && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
          <ringGeometry args={[section.ringRadius - RING_WIDTH, section.ringRadius, 48]} />
          <meshBasicMaterial color={RING_COLOR} transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
      )}

      <SectionLabel label={section.label} height={LABEL_HEIGHTS[section.id]} occludeRefs={occludeRefs} />

      {showPrompt && (
        <Html
          position={[0, LABEL_HEIGHTS[section.id] - PROMPT_LABEL_OFFSET, 0]}
          center
          distanceFactor={24}
          wrapperClass="pointer-events-none"
          className="pointer-events-none select-none"
        >
          <div className="animate-pulse whitespace-nowrap rounded-full border border-emerald-300/40 bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white shadow-lg">
            Press E
          </div>
        </Html>
      )}
    </group>
  )
}
