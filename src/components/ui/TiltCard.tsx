import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'

type Props = {
  children: ReactNode
  className?: string
  /** Degrees of rotation at the card's edges. */
  intensity?: number
}

/**
 * Pointer-tracked 3D tilt with a cursor-following sheen. Falls back to a plain
 * card on touch devices, where `pointermove` never fires meaningfully.
 */
export function TiltCard({ children, className = '', intensity = 7 }: Props) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 220,
    damping: 24,
  })

  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, rgba(34,211,238,0.13), transparent 65%)`

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
    >
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  )
}
