import { Reveal } from './Reveal'

type Props = {
  index: string
  eyebrow: string
  title: string
  blurb?: string
}

export function SectionHeading({ index, eyebrow, title, blurb }: Props) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs text-dim">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span className="eyebrow">{eyebrow}</span>
      </div>

      <h2 className="text-4xl font-bold text-balance sm:text-5xl">{title}</h2>

      {blurb && <p className="mt-4 text-base leading-relaxed text-muted">{blurb}</p>}
    </Reveal>
  )
}
