import { skills } from '../data/resume'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TiltCard } from './ui/TiltCard'

// Doubled so the marquee can loop seamlessly at -50%.
const ticker = [
  'TypeScript',
  'Node.js',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Keycloak',
  'React',
  'Python',
  'Nginx',
  'vLLM',
  'Whisper',
  'Zod',
  'Linux',
]

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="The stack I reach for."
          blurb="Deep on the backend and infrastructure side, comfortable owning the React layer end to end."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.title} delay={(i % 3) * 0.07}>
              <TiltCard className="glass h-full" intensity={5}>
                <div className="relative flex h-full flex-col p-6">
                  <div className="mb-5 flex items-baseline gap-3">
                    <span className="font-mono text-xs text-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full-bleed marquee */}
      <div className="relative mt-20 flex overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-2xl font-medium whitespace-nowrap text-dim sm:text-3xl"
            >
              {item}
              <span className="ml-10 text-cyan/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
