import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 92
const MAX_LINK_DIST = 1.6
const MAX_LINKS_PER_NODE = 3
const PULSE_COUNT = 38

type Edge = { a: number; b: number }

/**
 * Nodes are scattered on a slightly flattened spherical shell (Fibonacci
 * distribution + jitter) and linked to their nearest neighbours, giving a
 * graph that reads as a service mesh rather than a random point cloud.
 */
function buildGraph() {
  const nodes: THREE.Vector3[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    const radius = 2.4 + Math.random() * 1.05
    nodes.push(
      new THREE.Vector3(
        Math.cos(theta) * ring * radius,
        y * radius * 0.8,
        Math.sin(theta) * ring * radius,
      ),
    )
  }

  const edges: Edge[] = []
  const seen = new Set<string>()

  for (let i = 0; i < NODE_COUNT; i++) {
    const near: { j: number; d: number }[] = []
    for (let j = 0; j < NODE_COUNT; j++) {
      if (i === j) continue
      const d = nodes[i].distanceTo(nodes[j])
      if (d < MAX_LINK_DIST) near.push({ j, d })
    }
    near.sort((p, q) => p.d - q.d)

    for (const { j } of near.slice(0, MAX_LINKS_PER_NODE)) {
      const key = i < j ? `${i}:${j}` : `${j}:${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ a: i, b: j })
    }
  }

  return { nodes, edges }
}

type Pulse = { edge: number; t: number; speed: number }

const CYAN = new THREE.Color('#22d3ee')
const VIOLET = new THREE.Color('#a78bfa')

export function NeuralNetwork({ frozen = false }: { frozen?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const nodeMesh = useRef<THREE.InstancedMesh>(null)
  const pulseMesh = useRef<THREE.InstancedMesh>(null)

  const { nodes, edges } = useMemo(buildGraph, [])

  // Per-node phase offset so the "breathing" scale doesn't move in lockstep.
  const phases = useMemo(
    () => Float32Array.from({ length: NODE_COUNT }, () => Math.random() * Math.PI * 2),
    [],
  )

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const verts = new Float32Array(edges.length * 6)
    const colors = new Float32Array(edges.length * 6)
    const c = new THREE.Color()

    edges.forEach((e, i) => {
      const a = nodes[e.a]
      const b = nodes[e.b]
      verts.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6)

      c.copy(CYAN).lerp(VIOLET, Math.random())
      colors.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6)
    })

    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [nodes, edges])

  const pulses = useMemo<Pulse[]>(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.28 + Math.random() * 0.5,
      })),
    [edges.length],
  )

  // Seed static node colours once the instanced mesh exists.
  useLayoutEffect(() => {
    const mesh = nodeMesh.current
    if (!mesh) return
    const c = new THREE.Color()
    for (let i = 0; i < NODE_COUNT; i++) {
      c.copy(CYAN).lerp(VIOLET, Math.random())
      mesh.setColorAt(i, c)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const from = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const dt = Math.min(delta, 0.05)

    if (group.current && !frozen) {
      group.current.rotation.y += dt * 0.05

      // Ease toward the pointer for a parallax tilt.
      const { x, y } = state.pointer
      group.current.rotation.x += (y * 0.22 - group.current.rotation.x) * 0.03
      group.current.position.x += (x * 0.35 - group.current.position.x) * 0.03
    }

    if (nodeMesh.current) {
      for (let i = 0; i < NODE_COUNT; i++) {
        const s = frozen ? 1 : 0.78 + Math.sin(t * 1.6 + phases[i]) * 0.3
        dummy.position.copy(nodes[i])
        dummy.scale.setScalar(s)
        dummy.updateMatrix()
        nodeMesh.current.setMatrixAt(i, dummy.matrix)
      }
      nodeMesh.current.instanceMatrix.needsUpdate = true
    }

    if (pulseMesh.current && !frozen) {
      for (let i = 0; i < PULSE_COUNT; i++) {
        const p = pulses[i]
        p.t += dt * p.speed

        // Retire the packet at the far end and re-launch it on a new edge.
        if (p.t > 1) {
          p.t = 0
          p.edge = Math.floor(Math.random() * edges.length)
          p.speed = 0.28 + Math.random() * 0.5
        }

        const e = edges[p.edge]
        from.copy(nodes[e.a]).lerp(nodes[e.b], p.t)

        // Fade in and out at the endpoints.
        const fade = Math.sin(p.t * Math.PI)
        dummy.position.copy(from)
        dummy.scale.setScalar(0.055 + fade * 0.075)
        dummy.updateMatrix()
        pulseMesh.current.setMatrixAt(i, dummy.matrix)
      }
      pulseMesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <instancedMesh
        ref={nodeMesh}
        args={[undefined, undefined, NODE_COUNT]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh
        ref={pulseMesh}
        args={[undefined, undefined, PULSE_COUNT]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial
          color="#a5f3fc"
          toneMapped={false}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  )
}
