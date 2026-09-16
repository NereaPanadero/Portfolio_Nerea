# Nerea Panadero · Portfolio

Personal portfolio of **Nerea Panadero Alfonso** — Telematics Engineer, co-founder of AIntegra and XR Accessibility Specialist.

🔗 **Live:** https://nereapanadero.github.io/Portfolio_Nerea/

## Highlights

- **Accessibility panel** (`Alt + A`): text size, high contrast, dark mode, dyslexia-friendly font (Atkinson Hyperlegible), text spacing, reading guide, read aloud, big cursor, pause animations, hide images, and quick profiles (low vision, dyslexia, focus/ADHD, seizure-safe). Settings persist per device.
- **On-device AI assistant**: answers questions about Nerea in English and Spanish, tolerant to typos, with follow-ups and action buttons. Runs fully in the browser — no external API, no tracking.
- **Accessible by default**: semantic landmarks, skip link, visible focus, native `<dialog>`, respects `prefers-reduced-motion` and `prefers-color-scheme`. Audited with axe-core (WCAG 2.2 AA rules).
- **Lightweight**: no animation library, lazy-loaded panel/chat, WebP images, inline SVG logo. ~88 KB gzipped JS on first load.
- **Secure static site**: Content-Security-Policy, strict referrer policy, `noopener` links, spam-protected contact form (honeypot + rate limit).

## Stack

React 19 · Vite 7 · Tailwind CSS 3 · lucide-react

## Development

```bash
npm install
npm run dev      # http://localhost:5173/Portfolio_Nerea/
npm run build    # production build in dist/
npm run lint
```

All content (EN/ES) lives in `src/data/portfolio.js`. Optimised images are in `public/img/`; original high-resolution sources are kept in `design-source/` (not deployed).

Deployed to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).
