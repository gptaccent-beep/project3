import type { CSSProperties } from "react"

/**
 * BOUZID - cinematic hero.
 *
 * Preserves the original admin/i18n contract:
 *  - `content` fields: image, cardImage, logo (+ new: video, poster)
 *  - `pick(content, base, locale, fallback)` for titleFr/En/Ar + accentFr/En/Ar
 *  - dict.hero.* keys: eyebrow, title, titleAccent, body, ctaPrimary,
 *    ctaSecondary, badge1..badge4
 */

export type HeroContent = {
  image?: string | null
  cardImage?: string | null
  logo?: string | null
  video?: string | null
  poster?: string | null
  titleFr?: string | null
  titleEn?: string | null
  titleAr?: string | null
  accentFr?: string | null
  accentEn?: string | null
  accentAr?: string | null
} & Record<string, unknown>

type Dict = Record<string, Record<string, string>>

function pick(
  content: HeroContent | null | undefined,
  base: string,
  locale: string,
  fallback: string,
): string {
  const suffix = locale === "fr" ? "Fr" : locale === "ar" ? "Ar" : "En"
  const value = content?.[`${base}${suffix}`]
  return typeof value === "string" && value.trim() ? value : fallback
}

const DEFAULTS = {
  video: "/assets/hero-loop.mp4",
  videoWebm: "/assets/hero-loop.webm",
  poster: "/assets/hero-poster.jpg",
  cardImage: "/assets/hero-jar-portrait.webp",
}

export default function Hero({
  content,
  dict,
  locale = "en",
}: {
  content?: HeroContent | null
  dict?: Dict
  locale?: string
}) {
  const t = dict?.hero ?? {}
  const title = pick(content, "title", locale, t.title ?? "Nature's Golden")
  const accent = pick(content, "accent", locale, t.titleAccent ?? "Treasure")
  const poster = content?.poster || DEFAULTS.poster
  const video = content?.video || DEFAULTS.video
  const cardImage = content?.cardImage || DEFAULTS.cardImage

  const badges = [
    { value: "50", count: 50, suffix: "+", label: t.badge1 ?? "Years of beekeeping" },
    { value: "120", count: 120, suffix: " hives", label: t.badge2 ?? "Wild meadow apiaries" },
    { value: "4.9", count: 4.9, suffix: "/5", label: t.badge3 ?? "2,140 reviews" },
    { value: "100", count: 100, suffix: "%", label: t.badge4 ?? "Lab-tested purity" },
  ]

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Cinematic background: 9s seamless honey montage, poster used for LCP */}
      <div className="hero-media">
        <video autoPlay muted loop playsInline poster={poster} aria-hidden="true">
          <source src={DEFAULTS.videoWebm} type="video/webm" />
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="hero-veil" />
      <div className="rays" aria-hidden="true" />
      <div className="particles" aria-hidden="true">
        <Bee style={{ left: "12%", top: "26%" }} />
        <Bee style={{ left: "74%", top: "64%", animationDuration: "18s", animationDelay: "-6s" }} warm />
      </div>
      <div className="hero-hem" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow reveal">{t.eyebrow ?? "Raw \u00b7 Unfiltered \u00b7 Since 1974"}</p>

          <h1 className="h1 split" id="hero-title">
            {title} <span className="italic-gold">{accent}</span>
          </h1>

          <p className="lede reveal" data-delay="180">
            {t.body ??
              "Harvested by hand from wild mountain meadows, poured cold into glass within hours. Nothing added, nothing heated - just the whole living taste of the season."}
          </p>

          <div className="hero-actions reveal" data-delay="300">
            <a className="btn btn-gold" href="#shop">
              <span>{t.ctaPrimary ?? "Taste the collection"}</span>
            </a>
            <a className="btn btn-ghost" href="#story">
              <span>{t.ctaSecondary ?? "Flower to jar"}</span>
            </a>
          </div>

          <ul className="trust reveal" data-delay="420">
            {badges.map((b) => (
              <li key={b.label}>
                <b data-count={b.count} data-suffix={b.suffix}>
                  {b.value}
                  {b.suffix}
                </b>
                <span>{b.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="jar-stage glass reveal-scale" data-delay="200">
          <div className="jar-glow" aria-hidden="true" />
          <div className="jar-frame img-reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cardImage}
              width={928}
              height={1152}
              alt="A jar of BOUZID raw honey with a dipper drizzling golden honey"
            />
            <div className="drips" aria-hidden="true">
              <i className="drip" style={{ left: "28%", animationDelay: "-1.2s" }} />
              <i className="drip" style={{ left: "52%", animationDelay: "-2.9s" }} />
              <i className="drip" style={{ left: "71%", animationDelay: "-4.1s" }} />
            </div>
          </div>
          <div className="jar-chip">
            <span className="jar-chip-text">
              <strong>Wild Meadow Reserve</strong>
              <em>Harvest 2026 &middot; 500 g</em>
            </span>
            <span className="badge badge-leaf">Organic</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}

function Bee({ style, warm }: { style?: CSSProperties; warm?: boolean }) {
  return (
    <svg className="bee" style={style} viewBox="0 0 40 28" fill="none" aria-hidden="true">
      <ellipse className="wing" cx="17" cy="9" rx="7" ry="4" fill="#f6efe6" opacity=".55" />
      <ellipse cx="22" cy="16" rx="9" ry="6" fill={warm ? "#e79b72" : "#d4794e"} />
      <path d="M18 11c1 3 1 7 0 10M23 10c1 4 1 8 0 12" stroke="#2a1f1a" strokeWidth="2" />
      <circle cx="31" cy="14" r="3.4" fill="#2a1f1a" />
    </svg>
  )
}
