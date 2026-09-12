import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navItems, profile } from '../data/resume'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { useActiveSection } from '../hooks/useActiveSection'
import { DownloadIcon } from './ui/icons'

export function Nav() {
  const ids = useMemo(() => navItems.map((n) => n.id), [])
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function go(id: string) {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-line bg-void/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
    >
      <nav className="shell flex h-16 items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-display text-lg font-bold tracking-tight"
        >
          <span className="grad-text">R</span>ishav
          <span className="ml-1 text-dim">Shah</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === item.id ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-white/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 text-sm text-cyan transition-colors hover:bg-cyan/20 sm:inline-flex"
          >
            <DownloadIcon className="size-3.5" />
            Resume
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full border border-line md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-void/95 backdrop-blur-xl md:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="w-full border-b border-line/60 py-3 text-left font-display text-lg text-muted"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <a
                href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 py-2.5 text-sm text-cyan"
              >
                <DownloadIcon className="size-4" />
                Download Resume
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
