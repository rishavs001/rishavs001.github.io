import { profile } from '../data/resume'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { GithubIcon, LinkedinIcon, MailIcon } from './ui/icons'

const socials = [
  { Icon: GithubIcon, href: profile.github, label: 'GitHub' },
  { Icon: LinkedinIcon, href: profile.linkedin, label: 'LinkedIn' },
  { Icon: MailIcon, href: `mailto:${profile.email}`, label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col items-center justify-between gap-6 sm:flex-row">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-display text-lg font-bold tracking-tight"
        >
          <span className="grad-text">R</span>ishav
          <span className="ml-1 text-dim">Shah</span>
        </button>

        {/* <p className="order-3 text-center text-xs text-dim sm:order-2">
          © {new Date().getFullYear()} Rishav Shah · Built with React, TypeScript &amp; three.js
        </p> */}

        <div className="order-2 flex items-center gap-1 sm:order-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={label}
              className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
