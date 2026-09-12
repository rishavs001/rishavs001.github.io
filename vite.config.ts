import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `VITE_BASE` is injected by the GitHub Pages workflow so the same config serves
// both user pages (`/`) and project pages (`/<repo>/`).
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    // No manualChunks: the bundler already splits on the `lazy()` boundary
    // around HeroScene. Forcing the 3D packages into a named chunk created a
    // static edge from the entry, pulling three.js back into first paint.
    chunkSizeWarningLimit: 1100,
  },
})
