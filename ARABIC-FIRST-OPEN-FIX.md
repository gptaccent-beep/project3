# Arabic (RTL) blank screen on first open — root cause and fix

## The bug you saw
On the Arabic pages (`/ar`), the first time the page opened on a phone, the screen
was black/empty. Touching or scrolling the page made the content appear, and
English/French were always fine.

## Root cause (confirmed by reproduction, not a guess)
`src/app/globals.css` hid the accessibility "skip to content" link with the old
trick:

```css
.skip-link { position: absolute; left: -9999px; }
```

* In **LTR** (English/French) content placed at `-9999px` is off the *start* edge,
  so it creates no scrollable area. The page width stays 390px.
* In **RTL** (Arabic) the inline start edge is on the **right**, so that element
  became real page width. Measured in a headless Chromium at 390px viewport:

  | direction | `document.documentElement.scrollWidth` |
  |-----------|----------------------------------------|
  | LTR       | 390 px                                 |
  | RTL       | **10 389 px**                          |

  The browser therefore opened the Arabic page scrolled into a 10 000px-wide
  empty region — a black screen — until the first touch snapped it back.
  `overflow-x: clip/hidden` on `html`/`body` did **not** prevent this.

## Fixes applied
1. **`globals.css` — skip link** now uses clip-based hiding
   (`position: fixed; width/height: 1px; clip-path: inset(50%)`), which adds zero
   page width in either direction. RTL page width is now 390px, same as LTR.
2. **Content no longer depends on JavaScript to be visible.** `.reveal`,
   `.reveal-scale`, `.img-reveal` and `.split` used to start at `opacity: 0` and
   only became visible after `public/motion.js` booted from a React `useEffect`.
   They are now visible by default; the entrance animation only runs after an
   inline `<head>` script adds `js-ready`, plus a 1.2s failsafe that reveals
   everything if the motion script never loads.
3. **Broken Arabic webfont removed.** `/assets/noto-arabic.ttf` is actually a
   *Latin* Noto Sans build with **0 Arabic glyphs**, yet it was preloaded and
   forced as the first Arabic family. Arabic now uses the device font stack
   (`Noto Kufi Arabic, Noto Naskh Arabic, Geeza Pro, Segoe UI, Tahoma`), which
   paints instantly on the first open with no font-block flash.
4. Minor: the hero stat suffix `" hives"` no longer appears in Arabic/French.
5. The universal responsive layer (phone / tablet / laptop / desktop / TV) from
   the previous pass is kept intact.

## Verified
Headless Chromium screenshots of the Arabic RTL page, JavaScript reveal not yet
booted:

* 390 x 844 (phone): full hero, title, body, both buttons, stats, jar image.
* 941 x 689 (the exact viewport in your DevTools screenshot): renders correctly.
* LTR unchanged.

## Deploy
Deploy the folder that contains `package.json`. On Vercel, redeploy **with the
build cache cleared**, then open the site in a private window (the old CSS bundle
is cached aggressively).
