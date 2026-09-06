# BOUZID — multilingual content-managed honey store

Next.js 15 + React 19 + TypeScript storefront with Arabic-first localization and a private management studio.

## Included

- Arabic (`/ar`, default and RTL), English (`/en`) and French (`/fr`)
- Persistent language switcher and localized metadata
- Dynamic section visibility and ordering
- Product management with translated fields, pricing and stock
- Bundles and scheduled promotions
- Storefront copy, branding, SEO and media management
- Environment-backed admin login with HTTP-only session cookie
- Admin routes: `/admin` and the safe shortcut `/0`
- Responsive admin interface

## Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000` for the Arabic storefront. Open `http://localhost:3000/admin` for the management studio.

The sample credentials are `Bouzid` / `admin`; change them in `.env.local` before launch.

See [HANDOFF.md](HANDOFF.md) for usage, deployment storage recommendations, and the security note.
