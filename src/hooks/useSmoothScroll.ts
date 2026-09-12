import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

/** Mounts Lenis for the lifetime of the app (skipped when motion is reduced). */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.6 })
    instance = lenis

    let frame = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
    }
  }, [enabled])
}

/** Nav/anchor scrolling that routes through Lenis when it's active. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  if (instance) instance.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
