import { projects } from '../data/resume'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TiltCard } from './ui/TiltCard'
import { ArrowUpRightIcon, GithubIcon } from './ui/icons'

const accents = {
  cyan: {
    glow: 'from-cyan/22',
    text: 'text-cyan',
    border: 'group-hover:border-cyan/45',
  },
  violet: {
    glow: 'from-violet/22',
    text: 'text-violet',
    border: 'group-hover:border-violet/45',
  },
} as const

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Things I've built end to end."
          blurb="Two systems that cover the range — a utility-grade billing engine and a full-stack marketplace."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => {
            const accent = accents[project.accent]

            return (
              <Reveal key={project.title} delay={i * 0.08}>
                <TiltCard className={`glass h-full transition-colors ${accent.border}`}>
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-gradient-to-br ${accent.glow} to-transparent blur-3xl`}
                  />

                  <div className="relative flex h-full flex-col p-7 sm:p-9">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs text-dim">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="mt-2 font-display text-2xl font-bold text-balance sm:text-3xl">
                          {project.title}
                        </h3>
                        <p className={`mt-2 text-sm ${accent.text}`}>{project.blurb}</p>
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
                      >
                        <GithubIcon className="size-4" />
                      </a>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {project.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span
                            aria-hidden
                            className={`mt-2 size-1 shrink-0 rounded-full ${
                              project.accent === 'cyan' ? 'bg-cyan' : 'bg-violet'
                            }`}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-7">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <a
            href="https://github.com/rishavs001"
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
          >
            More on GitHub
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
