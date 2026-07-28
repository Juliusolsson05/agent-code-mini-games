import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { extensionViteConfig } from 'agent-code-extension-api'

// Build config for the Mini Games extension — the iframe model.
//
// extensionViteConfig() supplies the load-bearing parts: a single inlined ES module
// (the host loads exactly the one `entry` over the scheme), process.env.NODE_ENV
// defined (the frame has no `process`, so a React dev-guard would throw at activate),
// and no CSS split so the one `?inline` stylesheet is bundled in.
//
// IMPORTANT: always `NODE_ENV=production npm run build`. A dev-mode build makes
// @vitejs/plugin-react emit the jsxDEV transform, which is undefined in the
// sandboxed frame ("jsxDEV is not a function"). Install with NODE_ENV=development
// (to keep vite), build with NODE_ENV=production.
const preset = extensionViteConfig({ entry: 'src/index.ts' }) as UserConfig

export default defineConfig({
  plugins: [react()],
  define: preset.define,
  build: {
    ...preset.build,
    minify: 'esbuild',
    target: 'es2022',
    emptyOutDir: true,
    outDir: 'dist',
  },
})
