import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Content Security Policy for the static build (GitHub Pages can't send headers,
// so it ships as a <meta>). Dev mode is skipped because Vite injects inline scripts.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "upgrade-insecure-requests",
].join('; ')

function securityMeta() {
  return {
    name: 'security-meta',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityMeta()],
  base: '/Portfolio_Nerea/',
  build: {
    target: 'es2020',
    cssMinify: true,
    assetsInlineLimit: 2048,
  },
})
