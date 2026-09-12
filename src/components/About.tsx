import { profile } from '../data/resume'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { MapPinIcon } from './ui/icons'

const highlights = [
  {
    k: 'What I do',
    v: 'Design and ship backend services for AI products — gateways, orchestration layers, and the auth that wraps them.',
  },
  {
    k: 'Currently',
    v: 'Software Engineer at Esyasoft, building a GenAI analytics platform for utility operations.',
  },
  {
    k: 'Depth',
    v: 'Node.js and FastAPI in production, Postgres and Redis under load, Docker and Nginx in front.',
  },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Engineer for the AI-era backend."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-cyan/18 via-transparent to-violet/18 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-line">
                <img
                  src={`${import.meta.env.BASE_URL}rishav.jpg`}
                  alt="Rishav Shah"
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/5 w-full object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPinIcon className="size-4 text-cyan" />
                {profile.location}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-balance sm:text-xl">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 space-y-6">
                {highlights.map((h) => (
                  <div key={h.k} className="grid gap-1.5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="font-mono text-xs tracking-wider text-cyan uppercase">
                      {h.k}
                    </dt>
                    <dd className="leading-relaxed text-muted">{h.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
