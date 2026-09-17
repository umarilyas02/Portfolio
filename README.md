<div align="center">

# 🧊 Umar Ilyas — Portfolio

**A cinematic, scroll-driven portfolio for a full-stack developer, built with Next.js 16 and the App Router.**

[![Live Site](https://img.shields.io/badge/live-umarilyas.dev-8c9eff?style=flat-square)](https://umarilyas.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)

</div>

---

## ✨ Features

- 🎬 **Pinned, scroll-choreographed hero** — the landing headline and portrait stay sticky while the rest of the page slides over it, driven by raw scroll position (`motion`'s `useScroll`/`useTransform`).
- 🖱️ **Custom smooth scrolling** — wraps the whole app in [Lenis](https://github.com/darkroomengineering/lenis) for buttery, inertia-based scroll instead of the browser default.
- 🧲 **Magnetic cursor interactions & reveal animations** — mask-line reveals, fade-ins, and scroll-fill text effects (`src/components/reveal.jsx`, `src/components/magnetic.jsx`) used across the hero, about, and manifesto sections.
- 🗂️ **Data-driven case study library** — 12+ real client projects (ERPs, storefronts, dashboards, logistics sites) defined once in `src/data/projects.js` and rendered as an index (`/works`) and individual detail pages (`/works/[slug]`) with galleries, tech stacks, and live links.
- 🧰 **Animated tech stack showcase** — build tools and platform tools rendered with real brand icons via `simple-icons` and `lucide-react`.
- 🔍 **Full SEO layer** — per-page metadata, Open Graph/Twitter cards, a generated OG image (`opengraph-image.js`), `robots.js`, `sitemap.js`, and JSON-LD `Person`/`WebSite` structured data baked into the root layout.
- 📇 **One-click contact** — footer with copy-to-clipboard email, resume download, and social links.
- 🔤 **Self-hosted variable typography** — the PP Mori type family loaded locally via `next/font/local` for consistent, license-safe rendering.
- 📱 **Responsive, safe-area aware layout** — mobile-tuned hero composition and `env(safe-area-inset-*)` handling for notch/home-indicator devices.

## 🧱 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Motion](https://motion.dev) (Framer Motion), [Lenis](https://lenis.darkroom.engineering/) smooth scroll |
| Icons | [Lucide React](https://lucide.dev), [Simple Icons](https://simpleicons.org) |
| Linting | ESLint 9 (`eslint-config-next`) |
| Deployment | [Vercel](https://vercel.com) |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/umarilyas02/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

Other available scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── page.js           # Home page (hero, manifesto, works, stack, experience)
│   ├── about/             # About page + content
│   ├── works/             # Case study index + [slug] detail pages
│   ├── layout.js          # Root layout, fonts, metadata, JSON-LD
│   ├── sitemap.js         # Generated sitemap
│   ├── robots.js          # Generated robots.txt
│   └── opengraph-image.js # Generated OG image
├── components/           # Hero, Nav, Footer, TechStack, Works, Experience, reveal/scroll utils
├── data/
│   └── projects.js       # Case study content (source of truth for /works)
├── fonts/                # Self-hosted PP Mori font files
└── lib/
    └── site.js           # Site-wide constants (name, title, description, URL)

public/
└── projects/             # Case study screenshots, grouped by project
```

## 🌐 Live Site

[umarilyas.dev](https://umarilyas.dev)

---

<div align="center">

Made by [Umar Ilyas](https://umarilyas.dev)

</div>
