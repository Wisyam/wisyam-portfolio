import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Billboard, Text } from '@react-three/drei'
import { BOUNDARY, SECTIONS, WORLD_HALF } from './config'

/**
 * Decorative low-poly props: instanced trees & rocks, a perimeter fence,
 * dirt paths from the center to each section, and a center fountain.
 * Instancing + shared geometry keeps the draw call count low.
 */

/** [x, z, scale] - placed in open quadrants, away from paths and buildings. */
const TREE_PLACEMENTS: [number, number, number][] = [
  [5.5, 2.8, 1.0],
  [7.5, 6.5, 1.15],
  [-5.5, 2.8, 0.9],
  [-7.5, -6.5, 1.1],
  [3.8, -7, 0.85],
  [-3.8, 7, 1.2],
  [12.5, -10, 0.95],
  [-12.5, -11, 1.05],
  [12, 10.5, 1.25],
  [-12, 11.5, 0.9],
  [16.5, 0, 1.1],
  [-16.5, -2.5, 0.8],
  [1.5, 15, 1.15],
  [-1.5, -15.5, 1.0],
  [0, 17.5, 0.85],
]

/** [x, z, scale] flat low-poly rocks near the map edge. */
const ROCK_PLACEMENTS: [number, number, number][] = [
  [13.5, -13.5, 1.0],
  [-13.5, 13.5, 0.7],
  [15, 8.5, 1.3],
  [-15, -8.5, 0.9],
  [10.5, -16.5, 0.8],
  [-10.5, 16.5, 1.1],
  [17, -4, 1.2],
  [-17, 4, 0.75],
  [4.5, 16.5, 1.0],
  [-4.5, -16.5, 0.85],
]

const FENCE_POSTS: [number, number][] = (() => {
  const posts: [number, number][] = []
  const steps = 16
  const span = BOUNDARY * 2
  const step = span / steps
  for (let i = 0; i <= steps; i++) {
    const t = -BOUNDARY + i * step
    posts.push([t, BOUNDARY], [t, -BOUNDARY], [BOUNDARY, t], [-BOUNDARY, t])
  }
  return posts
})()

const RAIL_YS = [0.45, 0.85]

export function Trees() {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const foliageRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    const dummy = new THREE.Object3D()
    TREE_PLACEMENTS.forEach(([x, z, s], i) => {
      dummy.position.set(x, 0.55 * s, z)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      trunkRef.current?.setMatrixAt(i, dummy.matrix)
      dummy.position.set(x, 2.2 * s, z)
      dummy.updateMatrix()
      foliageRef.current?.setMatrixAt(i, dummy.matrix)
    })
    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true
    if (foliageRef.current) foliageRef.current.instanceMatrix.needsUpdate = true
  }, [])

  const count = TREE_PLACEMENTS.length
  return (
    <group>
      <instancedMesh
        ref={trunkRef}
        args={[undefined, undefined, count]}
        castShadow
        receiveShadow
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.18, 0.24, 1.1, 6]} />
        <meshStandardMaterial color="#8b5a2b" />
      </instancedMesh>
      <instancedMesh
        ref={foliageRef}
        args={[undefined, undefined, count]}
        castShadow
        frustumCulled={false}
      >
        <coneGeometry args={[1.15, 2.2, 7]} />
        <meshStandardMaterial color="#2f9e44" />
      </instancedMesh>
    </group>
  )
}

export function Rocks() {
  const ref = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    const dummy = new THREE.Object3D()
    ROCK_PLACEMENTS.forEach(([x, z, s], i) => {
      dummy.position.set(x, 0.28 * s, z)
      dummy.scale.set(s, 0.6 * s, s)
      dummy.updateMatrix()
      ref.current?.setMatrixAt(i, dummy.matrix)
    })
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true
  }, [])

  const count = ROCK_PLACEMENTS.length
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, count]}
      castShadow
      receiveShadow
      frustumCulled={false}
    >
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#8d99a6" roughness={0.95} />
    </instancedMesh>
  )
}

export function Fence() {
  const postRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    const dummy = new THREE.Object3D()
    FENCE_POSTS.forEach(([x, z], i) => {
      dummy.position.set(x, 0.55, z)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      postRef.current?.setMatrixAt(i, dummy.matrix)
    })
    if (postRef.current) postRef.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <group>
      <instancedMesh
        ref={postRef}
        args={[undefined, undefined, FENCE_POSTS.length]}
        castShadow
        frustumCulled={false}
      >
        <boxGeometry args={[0.16, 1.1, 0.16]} />
        <meshStandardMaterial color="#a16207" />
      </instancedMesh>

      {RAIL_YS.flatMap((y, railIndex) => [
        <mesh key={`x${railIndex}`} position={[0, y, BOUNDARY]} castShadow>
          <boxGeometry args={[WORLD_HALF * 2, 0.1, 0.1]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>,
        <mesh key={`x-${railIndex}`} position={[0, y, -BOUNDARY]} castShadow>
          <boxGeometry args={[WORLD_HALF * 2, 0.1, 0.1]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>,
        <mesh key={`z${railIndex}`} position={[BOUNDARY, y, 0]} castShadow>
          <boxGeometry args={[0.1, 0.1, WORLD_HALF * 2]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>,
        <mesh key={`z-${railIndex}`} position={[-BOUNDARY, y, 0]} castShadow>
          <boxGeometry args={[0.1, 0.1, WORLD_HALF * 2]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>,
      ])}
    </group>
  )
}

/** Dirt strips from the center fountain to every section building. */
export function Paths() {
  return (
    <group>
      {SECTIONS.map((section) => {
        const [x, , z] = section.position
        const length = Math.hypot(x, z)
        const yaw = Math.atan2(x, z)
        return (
          <mesh
            key={section.id}
            position={[x / 2, 0.02, z / 2]}
            rotation={[0, yaw, 0]}
            receiveShadow
          >
            <boxGeometry args={[1.5, 0.04, length]} />
            <meshStandardMaterial color="#d6b37e" />
          </mesh>
        )
      })}
    </group>
  )
}

/** Darker grass strip marking the world border under the fence. */
export function BorderStrip() {
  const strip = (key: string, position: [number, number, number], size: [number, number, number]) => (
    <mesh key={key} position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#4d7c46" />
    </mesh>
  )
  return (
    <group>
      {strip('n', [0, 0.03, BOUNDARY], [WORLD_HALF * 2, 0.06, 0.8])}
      {strip('s', [0, 0.03, -BOUNDARY], [WORLD_HALF * 2, 0.06, 0.8])}
      {strip('e', [BOUNDARY, 0.03, 0], [0.8, 0.06, WORLD_HALF * 2])}
      {strip('w', [-BOUNDARY, 0.03, 0], [0.8, 0.06, WORLD_HALF * 2])}
    </group>
  )
}

/** Center fountain with a "W" monogram marker. */
export function Fountain() {
  return (
    <group>
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.7, 0.12, 10]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 10]} />
        <meshStandardMaterial color="#60c5e6" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[0.45, 0.6, 0.45]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <Billboard position={[0, 1.5, 0]}>
        <Text
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          outlineWidth={0.04}
          outlineColor="#1e293b"
        >
          W
        </Text>
      </Billboard>
    </group>
  )
}
