/** Final conversion section: "Bring nature's gold into your home." */
export default function FinalCta({
  eyebrow = "Free delivery over \u20ac60",
  title = "Bring nature's gold",
  accent = "into your home.",
  body = "This season's harvest is limited to 4,000 jars. Reserve yours, and we ship within 48 hours in protective glass-safe packaging.",
  ctaPrimary = "Shop the collection",
  ctaSecondary = "Visit the apiary",
  image = "/assets/products-collection.webp",
}: {
  eyebrow?: string
  title?: string
  accent?: string
  body?: string
  ctaPrimary?: string
  ctaSecondary?: string
  image?: string
}) {
  return (
    <section className="cta" id="shop" aria-labelledby="cta-title">
      <span className="cta-orb" style={{ width: 420, height: 420, top: -120, left: -90 }} aria-hidden="true" />
      <span
        className="cta-orb"
        style={{ width: 340, height: 340, bottom: -140, right: -60, animationDelay: "-4s" }}
        aria-hidden="true"
      />
      <div className="wrap">
        <div className="cta-inner glass-gold reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="cta-title" style={{ marginTop: 16 }}>
              {title} <span className="italic-gold">{accent}</span>
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              {body}
            </p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#products">
                <span>{ctaPrimary}</span>
              </a>
              <a className="btn btn-ghost" href="#story">
                <span>{ctaSecondary}</span>
              </a>
            </div>
          </div>
          <div className="cta-media img-reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Three jars of BOUZID honey arranged on a warm wooden surface"
              loading="lazy"
              width={1200}
              height={960}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
