import { education } from '../data/resume'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="shell">
        <SectionHeading index="05" eyebrow="Education" title="Where I learned the fundamentals." />

        <div className="grid gap-4 lg:grid-cols-2">
          {education.map((entry, i) => (
            <Reveal key={entry.school} delay={i * 0.08}>
              <div className="glass group relative h-full overflow-hidden rounded-2xl p-7 transition-colors hover:border-cyan/40">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <p className="font-mono text-xs text-cyan">{entry.period}</p>

                <h3 className="mt-3 font-display text-xl font-semibold text-balance">
                  {entry.school}
                </h3>

                <p className="mt-2 text-muted">{entry.degree}</p>
                <p className="mt-1 text-sm text-dim">{entry.location}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
