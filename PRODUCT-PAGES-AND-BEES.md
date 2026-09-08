# Product pages + flying bees

## 1. Clicking a product opens its own page

New route: **`/<locale>/product/<product-id>`** — e.g. `/ar/product/wild-meadow`,
`/en/product/wild-meadow`, `/fr/product/wild-meadow`.

Files added:

| File | Role |
|---|---|
| `src/app/[locale]/product/[id]/page.tsx` | Server route: loads content, resolves the product, builds SEO metadata, 404s on unknown ids |
| `src/components/site/ProductDetail.tsx` | The page itself: gallery, information, order panel, related products |
| `src/app/bees.css` | Styles for the product page, the card links and the bees |

On the shop grid, three things now open the product page: the **photo**, the
**product name**, and a new **“View product”** button. The existing WhatsApp
quick-order button on the card is untouched, so nothing you had before was lost.

### What the page shows
1. **Big pictures** — a large 4:5 stage image with the badge overlaid, plus a
   thumbnail strip when a product has more than one image (the admin can already
   upload several; the first one is the cover).
2. **Better information** — short kicker, large title, stock dot, delivery note,
   large price with the unit, full description, tasting-note chips, and a
   specification table (weight, category, unit price, availability).
3. **Order panel below** — a real form: quantity stepper (1–99), full name,
   phone, delivery location, optional note, a **live total** that recalculates as
   the quantity changes, and one button that opens WhatsApp with the whole order
   pre-written in the visitor's language. Out-of-stock products show a notice and
   the button is disabled.
4. **“You may also like”** — up to three other products, same category first.

All wording exists in Arabic, English and French; prices render as `د.م.` in
Arabic and `MAD` otherwise. The layout is one column under 1100px, the gallery
sticks beside the text on desktop, and every input uses 16px text so iOS Safari
does not zoom on focus.

## 2. Bees that fly on their own

`src/components/site/Bees.tsx` drops a small swarm over the big imagery in:

* the **hero** (3 bees, kept to the side so they never sit on the headline),
* the **story** photo (3 bees),
* the **ecosystem / pollination** section (5 bees),
* the **final CTA** jar photo (5 bees),
* the **product page** gallery (3 bees).

How the motion works:

* Four different `bee-wander-*` keyframe routes, each scaled by a per-bee
  `--bee-drift` multiplier, so no two bees trace the same shape.
* Durations of 19–31s with negative delays, so the bees are already mid-flight
  on the first paint and never restart in sync.
* A separate slow `bee-bob` hover on the wrapper and a 0.1s wing beat on the
  wings — three layers combining into motion that reads as organic, not linear.
* The bee flips (`scaleX(-1)`) when its route turns back, so it always faces the
  way it is flying.

Safety details:

* Values are hard-coded, not `Math.random()`, so the server HTML matches the
  client and React never reports a hydration mismatch.
* `pointer-events: none` and `aria-hidden` — bees never block a tap or reach a
  screen reader.
* On phones the bees scale to 72% and only the first three per section render.
* `@media (prefers-reduced-motion: reduce)` hides them completely.
* `.bee-field` is `overflow: hidden` + `contain: layout paint`, so a bee can
  never add page width — the exact class of bug that caused the Arabic blank
  screen. Verified: document scroll width stays equal to the viewport in both
  RTL and LTR.

## Verified renders
Arabic RTL and English LTR product pages at 390×844 and 1440×900: gallery,
thumbnails, specs, order form with live total, related row, and bees all paint,
with `scrollWidth === clientWidth` in both directions.

## Deploy
Same as before: deploy the folder containing `package.json`, clear the Vercel
build cache, then open in a private window.
