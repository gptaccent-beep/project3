# BOUZID universal responsive build

This package contains the replacement responsive layout tested at 390, 941, 1440, and 1920 pixel viewport widths.

## Important deployment steps

1. Extract this ZIP.
2. Deploy the extracted project root — the folder containing `package.json`.
3. Do not deploy the older ZIP or only the `public` folder.
4. In Vercel, trigger a fresh production deployment with the build cache cleared.
5. After deployment, hard-refresh the browser or open the site in a private window.

## Verification

The deployed source must include:

- `src/app/render-stability.css` with the heading `BOUZID UNIVERSAL LAYOUT SAFETY LAYER`
- `src/app/responsive-mobile.css`
- `src/app/layout.tsx` importing `responsive-mobile.css`

The 941px tablet/browser-width layout now displays the hero copy, buttons, statistics, and product image instead of an empty dark panel.
