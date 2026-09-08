/**
 * Instagram + Facebook links.
 * Both URLs come from the admin panel (Settings → Contact details). If a field
 * has not been filled in yet the icon still shows, using the default page
 * below, so the buttons are always visible on the site.
 */

const DEFAULTS = {
  instagram: "https://instagram.com/bouzid.honey",
  facebook: "https://facebook.com/bouzid.honey",
}

export type SocialUrls = { instagram?: string; facebook?: string }

const LABELS: Record<string, { follow: string; instagram: string; facebook: string }> = {
  ar: { follow: "تابعنا", instagram: "انستغرام", facebook: "فيسبوك" },
  en: { follow: "Follow us", instagram: "Instagram", facebook: "Facebook" },
  fr: { follow: "Suivez-nous", instagram: "Instagram", facebook: "Facebook" },
}

/** Accepts "bouzid.honey", "@bouzid.honey" or a full URL and always returns a URL. */
function normalize(value: string, base: string) {
  const raw = value.trim()
  if (!raw) return ""
  if (/^https?:\/\//i.test(raw)) return raw
  return base + raw.replace(/^@/, "").replace(/^\/+/, "")
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M15.5 3h-2.7A4.6 4.6 0 0 0 8.2 7.6V10H6.1v3.2h2.1V21h3.3v-7.8h2.5l.4-3.2h-2.9V7.9c0-.7.5-1.2 1.2-1.2h1.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function SocialLinks({
  social,
  locale = "ar",
  variant = "contact",
}: {
  social?: SocialUrls
  locale?: string
  variant?: "contact" | "footer"
}) {
  const l = LABELS[locale] || LABELS.ar
  const instagram =
    normalize(social?.instagram || "", "https://instagram.com/") || DEFAULTS.instagram
  const facebook = normalize(social?.facebook || "", "https://facebook.com/") || DEFAULTS.facebook

  return (
    <div className={variant === "footer" ? "social-row social-row-footer" : "social-row"}>
      {variant === "contact" && <span className="social-label">{l.follow}</span>}
      <div className="social-icons">
        {instagram && (
          <a
            className="social-icon"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.instagram}
            title={l.instagram}
          >
            <InstagramIcon />
            <b>{l.instagram}</b>
          </a>
        )}
        {facebook && (
          <a
            className="social-icon"
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.facebook}
            title={l.facebook}
          >
            <FacebookIcon />
            <b>{l.facebook}</b>
          </a>
        )}
      </div>
    </div>
  )
}
