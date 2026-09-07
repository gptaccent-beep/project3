# BOUZID Store Handoff

## Run locally
1. Copy `.env.example` to `.env.local` and replace the password and session secret.
2. Run `npm install`, then `npm run dev`.
3. Storefront: `/ar` (default, RTL), `/en`, `/fr`.
4. Admin: `/admin` or `/0`. Sign in with the environment-backed credentials.

## Store management
- **Sections:** show/hide and reorder homepage regions.
- **Products:** add, edit or delete products; edit price, unit, stock and translated text.
- **Offers:** enable and edit bundles and scheduled promotions.
- **Languages:** edit all storefront copy in Arabic, English and French. Arabic is the fallback.
- **Media:** upload replacements for hero, story, nature and CTA imagery.
- **Settings:** brand asset paths and localized SEO metadata.
- Select **Publish changes** to save and immediately update the storefront.

## Recommended production storage
This delivery uses a dependency-free JSON data store and local uploads so it runs immediately. That is suitable for local hosting or a single persistent Node server. **Vercel serverless filesystems are not durable**, so before production on Vercel, use **Supabase Postgres + Storage** (recommended: one vendor, generous starter tier, row-level security) or Postgres + Vercel Blob. The UI and content model can stay the same while the functions in `src/lib/store.ts` and the upload route are replaced by those adapters.

## Security
The requested shared login is implemented with environment variables and an HTTP-only, HTTPS-only-in-production session cookie. The sample `Bouzid/admin` credentials must be changed before launch. A shared password can let anyone who obtains it edit or delete the store. Production should add rate limiting and lockout, password rotation, audit logs, and ideally 2FA through Auth.js or Clerk.

## About the “domain + 0” shortcut
`https://example.com0` is a different and generally invalid hostname, so an application cannot route it. The safe equivalent `/0` is included and redirects to `/admin`. A true `domain0` address would require owning and configuring that separate domain in DNS.


## Part 2 additions
- All storefront prices are MAD and editable per product.
- Nine seeded products are organized into editable translated categories.
- Product buttons collect quantity, buyer phone and location, then open a localized WhatsApp order to the number in Settings.
- The master logo slot updates header, footer and favicon together.
- Arabic uses Noto Kufi Arabic with RTL-specific typography and layout adjustments.
- Benefit cards, story steps, reviews and ecosystem stats are localized in all three languages.


## Part 3 additions
- The admin interface has an independent Arabic/English toggle and full RTL layout.
- No default credentials are embedded in client code. Configure `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET` on the server.
- Generate a password hash with `node scripts/hash-password.mjs "your-long-password"`.
- Login is limited to five failed attempts per IP in a 15-minute window; sessions use HTTP-only, SameSite=Strict, secure-in-production cookies.
- Admins can change the password in Settings; the replacement scrypt hash is stored server-side in `data/admin-security.json`. On Vercel, move this small secret record to durable server storage.
- Product tags are editable by index in AR/EN/FR, with add, remove, and reorder controls.


## Save and language-switch fixes
- Production content uses Vercel Blob when `BLOB_READ_WRITE_TOKEN` is configured; local development continues to use `data/site.json`. Create a Blob store in the Vercel project and redeploy so the token is injected.
- The motion layer is now idempotent and no longer rewrites React-owned heading or particle markup, preventing first-load and locale-switch layout crashes.
- Arabic hero typography is loaded after the premium stylesheet, with extra line height and glyph padding so words such as «أصيل» are not clipped.


## Cross-device admin login
- `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and the same `ADMIN_SESSION_SECRET` must be configured in the Vercel **Production** environment and the site must be redeployed.
- Password changes are now encrypted with AES-256-GCM and saved to the shared Vercel Blob store, so the new password works on every device and every serverless instance.
- Each device still receives its own secure session cookie and must sign in once; this is expected security behavior.
- Keep `BLOB_READ_WRITE_TOKEN` connected. Without shared storage, runtime password changes cannot be synchronized across devices.


## Fixed admin credentials
At the owner’s explicit request, this build uses a fixed admin username and a server-side scrypt password hash, so no admin credential environment variables are required. Username: `Bouzid`. Password: `Bouzid2026`. The password is not stored in plaintext in browser code. This is convenient but weaker than unique environment-managed credentials; change back to secret-managed authentication before handling sensitive customer or payment data.

## Complete image replacement and mobile release
- Admin **Products**: open any product, upload a replacement product image, then publish changes.
- Admin **Offers**: replace each bundle/offer image directly in the offer row.
- Admin **Media**: replace hero poster/video/card, story, nature, CTA, and every other global media slot.
- Admin **Settings**: replace the master logo; it updates header, footer, mark, and favicon references.
- Uploaded files are persisted in Vercel Blob. Supported: JPG, PNG, WebP, AVIF, GIF, SVG, MP4, WebM; maximum 4 MB per upload.
- The storefront and admin now include viewport containment, narrow-phone layouts down to 320–340 px, safe-area bottom navigation, responsive image/card grids, and additional Arabic RTL heading and form fixes.
