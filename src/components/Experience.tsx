import { experience } from '../data/resume'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-45" />

      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I've shipped."
          blurb="From maintaining 45 RHEL servers for airline operations to architecting an enterprise GenAI platform."
        />

        <ol className="relative">
          {/* Timeline rail */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-cyan/60 via-violet/40 to-transparent md:left-[13.5rem]"
          />

          {experience.map((job, i) => (
            <li key={job.company} className="relative">
              <Reveal delay={i * 0.06}>
                {/* The rail sits on the column boundary, so clearance comes from
                    each column's own padding — not the grid gap. */}
                <div className="grid gap-6 pb-14 pl-8 md:grid-cols-[13.5rem_1fr] md:gap-x-0 md:pl-0">
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute top-2 left-0 size-2.5 -translate-x-[calc(50%-0.5px)] rounded-full bg-cyan ring-4 ring-void md:left-[13.5rem]"
                  />

                  <div className="md:pt-0.5 md:pr-10 md:text-right">
                    <p className="font-mono text-sm text-cyan md:whitespace-nowrap">{job.period}</p>
                    <p className="mt-1 text-xs text-dim">{job.location}</p>
                  </div>

                  <div className="md:pl-10">
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">{job.role}</h3>
                    <p className="mt-1 text-sm text-muted">{job.company}</p>

                    <ul className="mt-5 space-y-3">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span
                            aria-hidden
                            className="mt-2 size-1 shrink-0 rounded-full bg-violet"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
