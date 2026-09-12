import { profile } from '../data/resume'
import { Reveal } from './ui/Reveal'
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from './ui/icons'

const channels = [
  { Icon: MailIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
  },
  { Icon: LinkedinIcon, label: 'LinkedIn', value: 'in/rishav97', href: profile.linkedin },
  { Icon: GithubIcon, label: 'GitHub', value: 'rishavs001', href: profile.github },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-45" />

      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-line" />
            <span className="eyebrow">Contact</span>
            <span className="h-px w-8 bg-line" />
          </div>

          <h2 className="font-display text-4xl font-bold text-balance sm:text-6xl">
            Let's build something <span className="grad-text">worth scaling</span>.
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Open to backend, platform and GenAI engineering roles. The fastest way to reach me
            is email — I reply to everything.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="glow-cyan group mt-10 inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-3.5 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
          >
            {profile.email}
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-cyan/40"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-cyan transition-colors group-hover:border-cyan/40 group-hover:bg-cyan/10">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs tracking-wider text-dim uppercase">
                    {label}
                  </span>
                  <span className="block truncate text-sm text-muted transition-colors group-hover:text-ink">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-10 flex items-center justify-center gap-2 text-sm text-dim">
            <MapPinIcon className="size-4" />
            {profile.location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
