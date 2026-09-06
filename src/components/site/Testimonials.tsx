export type Review = {
  quote: string
  name: string
  meta: string
  initials: string
  rating?: number
}

const DEFAULT_REVIEWS: Review[] = [
  {
    quote: "The first spoon tasted like a summer field. I have not bought supermarket honey since.",
    name: "Sofia L.",
    meta: "Lyon, France",
    initials: "SL",
  },
  {
    quote:
      "We serve the comb on the cheese board. Guests always ask where it comes from - that is the whole review.",
    name: "Marc K.",
    meta: "Chef, Brussels",
    initials: "MK",
  },
  {
    quote: "Batch number on the lid, apiary on the website. Finally a honey brand that shows its work.",
    name: "Amine H.",
    meta: "Casablanca, Morocco",
    initials: "AH",
  },
]

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="stars" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} style={{ ["--s" as string]: i } as React.CSSProperties} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z" />
        </svg>
      ))}
    </div>
  )
}

/** Snap slider driven by public/motion.js (data-slide buttons). Keyboard scrollable. */
export default function Testimonials({
  eyebrow = "Loved by 2,140 households",
  title = "What the jar leaves behind",
  reviews = DEFAULT_REVIEWS,
}: {
  eyebrow?: string
  title?: string
  reviews?: Review[]
}) {
  return (
    <section className="section section-light" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow reveal">{eyebrow}</p>
          <h2 id="reviews-title" className="reveal" data-delay="90">
            {title}
          </h2>
        </div>

        <div className="slides reveal" tabIndex={0} role="region" aria-label="Customer reviews, scrollable">
          {reviews.map((r) => (
            <article key={r.name} className="slide glass-light">
              <Stars rating={r.rating ?? 5} />
              <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
              <div className="who">
                <span className="avatar" aria-hidden="true">
                  {r.initials}
                </span>
                <span>
                  <b>{r.name}</b>
                  <i>{r.meta}</i>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="slider-nav">
          <button type="button" data-slide="prev" aria-label="Previous reviews">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
          <button type="button" data-slide="next" aria-label="Next reviews">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
