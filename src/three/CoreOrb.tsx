import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Group, Mesh } from 'three'

/**
 * The gateway at the centre of the mesh: a molten inner core wrapped in a
 * counter-rotating wireframe shell.
 */
export function CoreOrb({ frozen = false }: { frozen?: boolean }) {
  const group = useRef<Group>(null)
  const shell = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (frozen) return
    const dt = Math.min(delta, 0.05)

    if (group.current) {
      group.current.rotation.y += dt * 0.16
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12
    }
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.42
      shell.current.rotation.x += dt * 0.12
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.05, 12]} />
        {/* Kept dark and metallic so the point lights sculpt a sphere — a
            brighter emissive here blows out under bloom into a flat disc. */}
        <MeshDistortMaterial
          color="#070c16"
          emissive="#22d3ee"
          emissiveIntensity={0.08}
          roughness={0.28}
          metalness={0.95}
          distort={frozen ? 0 : 0.34}
          speed={1.5}
        />
      </mesh>

      <mesh ref={shell} scale={1.38}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  )
}
