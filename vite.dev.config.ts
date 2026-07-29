import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dev-only server for live-reload iteration in Chrome — NOT the extension build.
//
// Deliberately does NOT reuse vite.config.ts. That config is lib-mode and defines
// process.env.NODE_ENV='production', which is exactly wrong here: production mode
// disables React Fast Refresh (no HMR) and makes plugin-react emit the classic jsx
// transform instead of jsxDEV. Here we want plain dev mode, so editing any file under
// src/ hot-reloads in the browser (React components patch in place; the imperative
// Three.js scene triggers a fast full reload). The shipped extension is still built by
// `npm run build` → dist/index.js; nothing in dev/ or this config is ever bundled in.
export default defineConfig({
  plugins: [
    react(),
    // The harness html lives at /dev/, but vite prints the bare "Local:" base URL and
    // that's the first thing anyone types. Redirect / → /dev/ so the printed URL just
    // works instead of 404-ing on an empty root.
    {
      name: 'mini-games-dev-root-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            res.statusCode = 302
            res.setHeader('Location', '/dev/')
            res.end()
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    port: 5175,
    open: '/dev/',
  },
})
