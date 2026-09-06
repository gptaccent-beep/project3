# BOUZID — premium honey marketing site

A complete, deployable **Next.js 15 (App Router) + TypeScript** project.
Zero animation libraries: no GSAP, no Framer Motion, no Lenis. Only
`next`, `react`, `react-dom`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

Push this folder as the **repository root** (so that `package.json` sits at the
top level, not inside a sub-folder), then in Vercel:

- Framework preset: **Next.js**
- Root directory: `./`
- Build command / output directory: leave as the defaults
- No environment variables are required

> If your Vercel project already exists and previously failed, open
> **Settings → General → Root Directory** and make sure it points at the folder
> that contains `package.json`.

## Project structure

```
package.json            next / react / react-dom only
next.config.mjs
tsconfig.json           "@/*" -> "./src/*"
src/app/layout.tsx      metadata, OpenGraph, JSON-LD Brand, fonts
src/app/page.tsx        composes all sections, needs no props
src/app/globals.css     full design system + all motion keyframes
src/components/site/    Hero, Products, Story, Benefits, BeeNature,
                        Testimonials, FinalCta, SiteHeader, SiteFooter, Motion
public/motion.js        scroll reveals, parallax, counters, slider, magnetic CTAs
public/assets/          images (jpg + webp), hero video (mp4 + webm), logos
```

## Sections and anchors

`#main` · `#products` · `#story` · `#benefits` · `#nature` · `#reviews` · `#shop`

## Editing content

Every section exports a typed props interface with sensible defaults, so you can
override only what you need:

```tsx
<Products
  eyebrow="The collection"
  title="Three harvests, three characters"
  products={[
    { name: "Wild Meadow Reserve", price: "€24", weight: "500 g", /* ... */ },
  ]}
/>
```

`Hero` additionally preserves the original CMS contract:

- `content` fields: `image`, `cardImage`, `logo`, `video`, `poster`,
  `titleFr/En/Ar`, `accentFr/En/Ar`
- `dict.hero.*` keys: `eyebrow`, `title`, `titleAccent`, `body`, `ctaPrimary`,
  `ctaSecondary`, `badge1`–`badge4`
- `locale` (`"en" | "fr" | "ar"`) selects the matching title/accent suffix

`dict` is optional — omit it and the English defaults render.

## Motion engine

`public/motion.js` exposes `window.BouzidMotion.boot()` and is loaded once by the
`<Motion />` client component. It is driven entirely by data attributes:

| Attribute | Effect |
| --- | --- |
| `class="reveal"` + `data-delay` | fade + rise on scroll into view |
| `class="reveal-scale"` | scale-in on scroll into view |
| `class="img-reveal"` | clip-path image reveal |
| `class="split"` | per-word headline rise |
| `data-parallax` | parallax strength for background layers |
| `data-count` / `data-suffix` | animated number counters |
| `data-slide="prev\|next"` | testimonial slider controls |

All motion is disabled automatically under `prefers-reduced-motion: reduce`.

## Performance / SEO / a11y notes

- Hero uses a poster image for LCP, with the video layered behind it
- Images ship as both `.jpg` and `.webp`
- Metadata, OpenGraph, Twitter card and a JSON-LD `Brand` block live in `layout.tsx`
- Single stylesheet, no CSS-in-JS runtime
- Skip link, `aria-labelledby` on every section, visible focus styles, AA contrast
