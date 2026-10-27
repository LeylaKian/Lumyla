import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The sandbox preview reaches the dev server through a proxy host that carries a
// rotating sandbox id, so the allowlist is extended with a wildcard only when the
// Base44 preview flag is on. With the flag unset, Vite's default allowlist applies.
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts:
      previewMode && sandboxHostDomain
        ? ['localhost', '127.0.0.1', `.${sandboxHostDomain}`]
        : ['localhost', '127.0.0.1'],
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://api:8080',
        changeOrigin: true,
      },
    },
  },
})
