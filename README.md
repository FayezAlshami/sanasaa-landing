# سنسعى — صفحة الهبوط | Sanasaa Landing

منصة سنسعى للتعليم الثانوي — صفحة هبوط عربية RTL بجودة Awwwards.

Sanasaa secondary-education landing page (Arabic RTL) built with a full cinematic stack.

## Live site (GitHub Pages)

https://fayezalshami.github.io/sanasaa-landing/

Static export with `basePath` `/sanasaa-landing`. Deploy via GitHub Actions on `main`, or the `gh-pages` branch fallback.

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** v4
- **GSAP** + ScrollTrigger (pinned storytelling, scrub, text reveals)
- **Motion** (Framer Motion) — FAQ accordion & UI presence
- **Lenis** — smooth scrolling
- **Three.js** via **React Three Fiber** + **drei** — cinematic 3D hero
- Font: **Cairo** (`next/font/google`), `dir=rtl` `lang=ar`

## Effects

- Page-load intro with logo reveal
- Custom cursor + magnetic CTAs (desktop)
- Scroll progress bar
- 3D hero: distort orb, floating books, particles, mouse parallax
- Scroll-scrubbed pinned horizontal feature story
- Split word/char text reveals
- Morphing SVG blobs
- 3D tilt cards, animated counters, marquee
- Prefers-reduced-motion respected; 3D dynamically imported

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

```bash
npm run build
npm run start
```

```bash
npm run lint
```

## Deploy on Vercel

1. Import the GitHub repo `FayezAlshami/sanasaa-landing` in [Vercel](https://vercel.com).
2. Framework preset: **Next.js** (auto-detected).
3. Build command: `npm run build` · Output: default `.next`.
4. Deploy. Set custom domain when ready.

No env vars required for the static marketing page.

## Brand

Logo assets live in `public/brand/` (purple `#623996`, gold `#f1a52a`, ink `#231f20`).

## License

Private — © Sanasaa / Fayez Alshami.
