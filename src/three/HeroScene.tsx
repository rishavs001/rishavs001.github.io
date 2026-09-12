import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { NeuralNetwork } from './NeuralNetwork'
import { CoreOrb } from './CoreOrb'
import { Starfield } from './Starfield'

type Props = {
  /** Pauses every animation — driven by `prefers-reduced-motion`. */
  frozen?: boolean
  /** False once the hero scrolls out of view; halts the render loop entirely. */
  active?: boolean
}

/**
 * On wide viewports the mesh slides right so the hero copy on the left sits
 * against empty space; on narrow ones it stays centred behind the text.
 */
function Composition({ frozen }: { frozen: boolean }) {
  const aspect = useThree((s) => s.viewport.aspect)
  const wide = aspect > 1.2

  return (
    <group position={[wide ? 2.7 : 0, wide ? 0 : 0.2, 0]} scale={wide ? 1 : 0.82}>
      <NeuralNetwork frozen={frozen} />
      <CoreOrb frozen={frozen} />
    </group>
  )
}

export function HeroScene({ frozen = false, active = true }: Props) {
  // Drop postprocessing first if the device can't keep up.
  const [degraded, setDegraded] = useState(false)

  // Offscreen: stop entirely. Reduced motion: draw once, then idle.
  const frameloop = !active ? 'never' : frozen ? 'demand' : 'always'

  return (
    <Canvas
      frameloop={frameloop}
      // Standard ceiling for a heavy WebGL scene: retina sharpness without
      // paying for a 3x framebuffer. Adaptive quality is left to
      // PerformanceMonitor rather than hard-coded guesses.
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 8.6], fov: 46 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      // The canvas is decorative; screen readers get the text version instead.
      aria-hidden="true"
    >
      {/* One-way latch: once postprocessing is dropped it stays dropped, so we
          never oscillate between quality levels. */}
      <PerformanceMonitor flipflops={3} onFallback={() => setDegraded(true)} />

      <ambientLight intensity={0.35} />
      <pointLight position={[6, 5, 6]} intensity={55} color="#22d3ee" distance={30} />
      <pointLight position={[-7, -4, 3]} intensity={40} color="#a78bfa" distance={30} />

      <Suspense fallback={null}>
        <Starfield frozen={frozen} />
        <Composition frozen={frozen} />
      </Suspense>

      {!degraded && (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.32}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <Vignette offset={0.3} darkness={0.8} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
