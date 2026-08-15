import { Billboard, Text } from '@react-three/drei'
import type { SectionConfig } from './config'

const BODY_WIDTH = 2.6
const BODY_DEPTH = 2.6
/** Pyramid roof overhangs the box body (half-diagonal is ~1.84). */
const ROOF_RADIUS = 2.0
const ROOF_HEIGHT = 1.3

interface SectionBuildingProps {
  section: SectionConfig
}

/**
 * A low-poly building representing one portfolio section.
 * Body + roof are built from shared primitive geometry; the floating
 * name label always faces the camera via drei's <Billboard>.
 */
export function SectionBuilding({ section }: SectionBuildingProps) {
  const { position, color, roofColor, roof, height, feature } = section
  const [x, , z] = position

  // Rotate the building so its front (+z local) faces the map center.
  const yaw = Math.atan2(-x, -z)

  const roofTop = roof === 'pyramid' ? height + ROOF_HEIGHT : height + 0.15
  const labelY = roofTop + 0.75

  return (
    <group position={position} rotation={[0, yaw, 0]}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_WIDTH, height, BODY_DEPTH]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Roof */}
      {roof === 'pyramid' ? (
        <mesh position={[0, height + ROOF_HEIGHT / 2 - 0.03, 0]} castShadow>
          <coneGeometry args={[ROOF_RADIUS, ROOF_HEIGHT, 4]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>
      ) : (
        <mesh position={[0, height + 0.075, 0]} castShadow>
          <boxGeometry args={[BODY_WIDTH + 0.4, 0.15, BODY_DEPTH + 0.4]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>
      )}

      <SectionFeature feature={feature} height={height} roofTop={roofTop} />

      {/* Floating name label */}
      <Billboard position={[0, labelY, 0]}>
        <Text
          fontSize={0.55}
          letterSpacing={0.08}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          outlineWidth={0.035}
          outlineColor="#1e293b"
        >
          {section.label}
        </Text>
      </Billboard>
    </group>
  )
}

interface FeatureProps {
  feature: SectionConfig['feature']
  height: number
  roofTop: number
}

/** Small per-section accent element so buildings read as distinct objects. */
function SectionFeature({ feature, height, roofTop }: FeatureProps) {
  switch (feature) {
    case 'screen':
      return (
        <mesh position={[0, 1.15, BODY_DEPTH / 2 + 0.02]}>
          <planeGeometry args={[1.5, 1.0]} />
          <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.3} />
        </mesh>
      )
    case 'antenna':
      return (
        <group>
          <mesh position={[0, height + 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.5, 6]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
          <mesh position={[0, height + 1.52, 0]}>
            <sphereGeometry args={[0.12, 6, 6]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </group>
      )
    case 'chimney':
      return (
        <mesh position={[-0.75, roofTop + 0.4, 0.55]} castShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.8, 8]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
      )
    case 'flag':
      return (
        <group position={[0.8, 0, 0.8]}>
          <mesh position={[0, roofTop + 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.6, 6]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
          <mesh position={[0.42, roofTop + 1.58, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.42, 0.85, 3]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </group>
      )
    case 'mailbox':
      return (
        <group>
          <mesh position={[0, 0.45, BODY_DEPTH / 2 + 0.35]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.9, 6]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 0.98, BODY_DEPTH / 2 + 0.35]} castShadow>
            <boxGeometry args={[0.55, 0.38, 0.38]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <mesh position={[0, 0.95, BODY_DEPTH / 2 + 0.56]}>
            <boxGeometry args={[0.34, 0.06, 0.02]} />
            <meshStandardMaterial color="#450a0a" />
          </mesh>
        </group>
      )
    case 'none':
      return null
  }
}
