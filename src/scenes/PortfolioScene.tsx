/**
 * Placeholder 3D scene: ground plane + basic lighting + a marker object.
 * Game logic, player and portfolio content land in later tasks.
 */
export function PortfolioScene() {
  return (
    <>
      <color attach="background" args={['#a7d8f0']} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#5cb85c" />
      </mesh>
      <gridHelper args={[24, 24, '#2e7d32', '#2e7d32']} position={[0, 0.01, 0]} />

      {/* Marker so the scene reads as 3D */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff7043" />
      </mesh>
    </>
  )
}
