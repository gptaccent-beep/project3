# Hero order, title and social links

## 1. Picture first on phones and tablets

Up to 1099 px wide, the big jar picture is now the first thing in the hero and
the text block (eyebrow, title, description, buttons, the 4 figures) comes
underneath it. Above 1100 px nothing changed: text on one side, picture on the
other, exactly as before.

This is done with explicit grid rows, not source order, so it can never flip
back:

- `.hero-grid > .jar-stage` -> `grid-row: 1`
- `.hero-grid > .hero-copy` -> `grid-row: 2`

The picture is also given a real presence instead of a thin strip: a 4/5 frame
that crops the photo nicely. On short phones (height under 720 px) it becomes
1/1 so it does not swallow the whole screen. On tablets it is capped at 520 px
wide and centred, with the text centred under it.

## 2. Top margin (the red line)

`.hero-grid` top padding is now `clamp(118px, 27vw, 148px)` **plus**
`env(safe-area-inset-top)`. That clears the fixed header, the FR/EN/AR pills and
the iPhone notch / dynamic island on every phone. Measured gap between the
bottom of the header and the top of the picture: 118 px at 390 px and 430 px
wide, 148 px on tablets.

## 3. The big title on exactly 2 lines

The gold italic accent is forced onto its own line
(`.hero-copy .h1 .italic-gold { display: block }`), so the title reads:

```
ذهب الطبيعة
كنز أصيل
```

The font size shrinks to fit rather than wrapping to a third line, with an extra
step down below 380 px. Verified as 2 lines in Arabic and English at 390, 430,
820, 1440 px.

## 4. Instagram and Facebook

Both appear in **two places**: the contact section above the footer (light pill
buttons with the label "Follow us / تابعنا") and the footer's Contact column
(dark pills). Labels are translated for ar / en / fr, links open in a new tab
with `rel="noopener noreferrer"`, and the touch target is 44-47 px tall.

### Editing them in the admin panel

**Settings -> Contact details** now has an Instagram field and a Facebook field,
right under Email and Phone. Fill them in and press *Publish changes*.

You can paste any of these and it works:

- `https://instagram.com/bouzid.honey`
- `bouzid.honey`
- `@bouzid.honey`

**Leave a field empty and that icon does not appear at all** - no broken link.
Both fields start empty, so the icons stay hidden until you fill them in.

Stored in `data/site.json` as `settings.contact.instagram` and
`settings.contact.facebook`.

## Files

| File | Change |
| --- | --- |
| `src/app/hero-social.css` | new - hero order, top margin, 2-line title, social styling |
| `src/app/layout.tsx` | loads `hero-social.css` last |
| `src/components/site/SocialLinks.tsx` | new - the two icons, URL normalising, translated labels |
| `src/components/site/ContactSection.tsx` | renders the social block in the contact grid |
| `src/components/site/SiteFooter.tsx` | renders the social row in the Contact column |
| `src/components/site/Storefront.tsx` | passes the URLs to the footer |
| `src/app/[locale]/product/[id]/page.tsx` | passes the URLs to the footer |
| `src/app/admin/AdminApp.tsx` | the two new admin fields + ar/en labels |
| `src/lib/types.ts`, `data/site.json` | the two new settings |

## Deploy

Deploy the folder that contains `package.json`, then in Vercel redeploy with the
build cache cleared and check in a private window.
