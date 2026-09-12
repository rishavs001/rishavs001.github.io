# Rishav Shah — Portfolio

Personal portfolio site. Dark "neural mesh" theme with an interactive WebGL hero,
built as a single-page React app.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · three.js (React Three
Fiber + drei + postprocessing) · Motion · Lenis

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck, then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` only |
| `npm run optimize:img` | Downscale + re-encode `public/rishav.jpg` |

## Editing content

**All Resume content lives in one file: [`src/data/resume.ts`](src/data/resume.ts).**
Profile, stats, experience, skills, projects, education and nav items are typed
exports there — edit that file and every section updates. No copy is hardcoded in
components.

To swap the Resume PDF, replace `public/Rishav_Shah_Resume.pdf` and update
`profile.resumeFile` if you rename it.

## Project layout

```
src/
  data/resume.ts        all site content (single source of truth)
  three/                WebGL hero
    HeroScene.tsx       canvas, lights, bloom, responsive composition
    NeuralNetwork.tsx   node graph + data pulses travelling along edges
    CoreOrb.tsx         distorted core + counter-rotating wireframe shell
    Starfield.tsx       background depth layer
  components/           one file per page section
    ui/                 Reveal, SectionHeading, TiltCard, icons
  hooks/                useSmoothScroll (Lenis), useActiveSection (scroll spy)
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages.

The base path is resolved automatically at build time:

- **User page** (repo named `<owner>.github.io`) → base `/`
- **Project page** (any other repo name) → base `/<repo>/`

This is injected as `VITE_BASE` and read by `vite.config.ts`, so no manual config
is needed. One-time repo setup: **Settings → Pages → Source → GitHub Actions**.

## Performance and accessibility notes

- The three.js bundle is `lazy()`-loaded and split into its own chunk, so text
  paints before WebGL initialises.
- `PerformanceMonitor` drops bloom/vignette on weak hardware via a one-way latch
  (deliberately not paired with `AdaptiveDpr` — the two form a resize/fps
  feedback loop that pegs the render thread).
- `prefers-reduced-motion` freezes every animation, including the 3D scene, and
  disables Lenis momentum scrolling.
- The canvas is `aria-hidden`; all content is real text with semantic headings,
  lists and a skip link.

## Previous site

The original static HTML/CSS site is archived under [`_legacy/`](_legacy/).
