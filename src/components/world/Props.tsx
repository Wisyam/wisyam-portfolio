/**
 * Decorative world props: trees, rocks and the boundary fence.
 * Repeated geometry is instanced (drei <Instances>) to keep the draw call
 * and poly count low. Positions were picked to never overlap the 6 buildings
 * (see src/content/sections.ts) nor the cross paths at the center.
 */

import { Instance, Instances } from '@react-three/drei'
import { FENCE_HALF, ROCKS, TREES } from '../../content/world-props'

const TREE_GREENS = ['#2e7d32', '#388e3c', '#43a047', '#2f9e44']
const TREE_TRUNK_COLOR = '#6d4c41'
const ROCK_COLORS = ['#95a5a6', '#8e9eab', '#a0a8b0']

const POST_SPACING = 4
const FENCE_POST_COLOR = '#a1887f'
const FENCE_RAIL_COLOR = '#8d6e63'
const RAIL_Y = [0.7, 1.4]

/** Posts on all four sides at ±FENCE_HALF, corners deduplicated. */
function fencePosts(): Array<[number, number]> {
  const posts = new Map<string, [number, number]>()
  for (let p = -FENCE_HALF; p <= FENCE_HALF; p += POST_SPACING) {
    posts.set(`${p},-${FENCE_HALF}`, [p, -FENCE_HALF])
    posts.set(`${p},${FENCE_HALF}`, [p, FENCE_HALF])
    posts.set(`-${FENCE_HALF},${p}`, [-FENCE_HALF, p])
    posts.set(`${FENCE_HALF},${p}`, [FENCE_HALF, p])
  }
  return [...posts.values()]
}

/** Two rails per side (bottom + top), horizontal thin boxes along the boundary. */
function FenceRails() {
  return (
    <>
      {RAIL_Y.map((y) => (
        <mesh key={`rail-z-${y}`} position={[0, y, -FENCE_HALF]} castShadow>
          <boxGeometry args={[FENCE_HALF * 2, 0.18, 0.12]} />
          <meshStandardMaterial color={FENCE_RAIL_COLOR} />
        </mesh>
      ))}
      {RAIL_Y.map((y) => (
        <mesh key={`rail-z+${y}`} position={[0, y, FENCE_HALF]} castShadow>
          <boxGeometry args={[FENCE_HALF * 2, 0.18, 0.12]} />
          <meshStandardMaterial color={FENCE_RAIL_COLOR} />
        </mesh>
      ))}
      {RAIL_Y.map((y) => (
        <mesh key={`rail-x-${y}`} position={[-FENCE_HALF, y, 0]} castShadow>
          <boxGeometry args={[0.12, 0.18, FENCE_HALF * 2]} />
          <meshStandardMaterial color={FENCE_RAIL_COLOR} />
        </mesh>
      ))}
      {RAIL_Y.map((y) => (
        <mesh key={`rail-x+${y}`} position={[FENCE_HALF, y, 0]} castShadow>
          <boxGeometry args={[0.12, 0.18, FENCE_HALF * 2]} />
          <meshStandardMaterial color={FENCE_RAIL_COLOR} />
        </mesh>
      ))}
    </>
  )
}

export function Props() {
  const posts = fencePosts()

  return (
    <>
      {/* Tree trunks */}
      <Instances limit={TREES.length} range={TREES.length} castShadow>
        <cylinderGeometry args={[0.22, 0.3, 1.4, 6]} />
        <meshStandardMaterial color={TREE_TRUNK_COLOR} />
        {TREES.map((tree, i) => (
          <Instance
            key={i}
            position={[tree.x, 0.7 * tree.scale, tree.z]}
            scale={tree.scale}
          />
        ))}
      </Instances>

      {/* Tree canopies */}
      <Instances limit={TREES.length} range={TREES.length} castShadow>
        <coneGeometry args={[1.3, 2.4, 8]} />
        <meshStandardMaterial color={TREE_GREENS[0]} />
        {TREES.map((tree, i) => (
          <Instance
            key={i}
            position={[tree.x, 2.6 * tree.scale, tree.z]}
            scale={tree.scale}
            color={TREE_GREENS[i % TREE_GREENS.length]}
          />
        ))}
      </Instances>

      {/* Rocks: flattened dodecahedrons */}
      <Instances limit={ROCKS.length} range={ROCKS.length} castShadow>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={ROCK_COLORS[0]} />
        {ROCKS.map((rock, i) => (
          <Instance
            key={i}
            position={[rock.x, 0.3 * rock.scale, rock.z]}
            scale={[rock.scale, rock.scale * 0.6, rock.scale]}
            rotation={[0, (i * Math.PI) / 3, 0]}
            color={ROCK_COLORS[i % ROCK_COLORS.length]}
          />
        ))}
      </Instances>

      {/* Fence posts */}
      <Instances limit={posts.length} range={posts.length} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.8, 6]} />
        <meshStandardMaterial color={FENCE_POST_COLOR} />
        {posts.map(([x, z], i) => (
          <Instance key={i} position={[x, 0.9, z]} />
        ))}
      </Instances>

      <FenceRails />
    </>
  )
}
