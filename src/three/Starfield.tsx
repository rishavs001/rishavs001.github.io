import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Additive, depth-write-off points are pure overdraw — keep the count modest.
const COUNT = 520

/** Sparse depth layer sitting behind the mesh. */
export function Starfield({ frozen = false }: { frozen?: boolean }) {
  const points = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      // Rejection-free shell sampling: random direction, random radius in band.
      const u = Math.random() * 2 - 1
      const theta = Math.random() * Math.PI * 2
      const ring = Math.sqrt(1 - u * u)
      const r = 9 + Math.random() * 16

      positions[i * 3] = Math.cos(theta) * ring * r
      positions[i * 3 + 1] = u * r * 0.65
      positions[i * 3 + 2] = Math.sin(theta) * ring * r
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((_, delta) => {
    if (points.current && !frozen) {
      points.current.rotation.y += Math.min(delta, 0.05) * 0.012
    }
  })

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.045}
        color="#93a4c4"
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
