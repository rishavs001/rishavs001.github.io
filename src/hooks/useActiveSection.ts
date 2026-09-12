import { useEffect, useState } from 'react'

/** Scroll-spy: reports whichever section currently owns the viewport middle. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    const targets = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
