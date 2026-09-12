import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile, roles, stats } from '../data/resume'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { useInView } from '../hooks/useInView'
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
} from './ui/icons'

// The three.js bundle is the heaviest asset on the page — keep it out of the
// initial chunk so text paints immediately.
const HeroScene = lazy(() =>
  import('../three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

function RotatingRole({ frozen }: { frozen: boolean }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (frozen) return
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [frozen])

  return (
    <span className="relative inline-flex min-h-[1.3em] items-center">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grad-text"
      >
        {roles[index]}
      </motion.span>
      <span className="animate-caret ml-1 inline-block h-[1em] w-px bg-cyan align-middle" />
    </span>
  )
}

export function Hero({ reduced }: { reduced: boolean }) {
  // Keep drawing slightly past the fold so scrolling back up isn't a cold start.
  const [sceneRef, sceneInView] = useInView<HTMLDivElement>('250px')

  return (
    <section id="hero" className="relative min-h-svh overflow-hidden pt-16">
      {/* 3D layer */}
      <div ref={sceneRef} className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <HeroScene frozen={reduced} active={sceneInView} />
        </Suspense>
      </div>

      {/* Keeps the copy readable over the mesh: a full scrim on narrow screens,
          a left-weighted one once the scene slides right. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-void/55 lg:bg-gradient-to-r lg:from-void lg:via-void/75 lg:to-transparent" />

      {/* Fade the canvas into the page background at the seam. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-void" />

      <div className="shell relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
            </span>
            <span className="font-mono text-xs text-muted">
              Software Engineer @ Esyasoft · Bengaluru
            </span>
          </div>

          <h1 className="font-display text-5xl leading-[0.95] font-bold text-balance sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>

          <p className="mt-5 font-display text-2xl font-medium sm:text-4xl">
            <RotatingRole frozen={reduced} />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I build the backend that AI products run on — API gateways, intent-routed
            microservices and self-hosted LLM/speech pipelines. NIT Jamshedpur alumnus.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection('projects')}
              className="glow-cyan group inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <DownloadIcon className="size-4" />
              Resume
            </a>

            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <GithubIcon className="size-4.5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <LinkedinIcon className="size-4.5" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl font-bold text-cyan sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-dim transition-colors hover:text-cyan lg:block"
      >
        <ArrowDownIcon className="size-5 animate-bounce" />
      </button>
    </section>
  )
}
