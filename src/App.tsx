import { useReducedMotion } from 'motion/react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const reduced = useReducedMotion() ?? false

  // Momentum scrolling is disorienting for users who asked for less motion.
  useSmoothScroll(!reduced)

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero reduced={reduced} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
