import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element is near the viewport. Used to stop the WebGL
 * render loop once the hero scrolls away — otherwise the canvas keeps drawing
 * at full rate behind the rest of the page.
 */
export function useInView<T extends HTMLElement>(rootMargin = '0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
