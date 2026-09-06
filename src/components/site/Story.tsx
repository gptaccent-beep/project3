export type Step = { num: string; title: string; body: string }

const DEFAULT_STEPS: Step[] = [
  {
    num: "Step 01",
    title: "The bloom",
    body: "In April the meadows open. Our hives travel to altitude, following thyme, clover and wild lavender rather than monoculture fields.",
  },
  {
    num: "Step 02",
    title: "The forage",
    body: "A single worker visits up to 1,500 flowers a day. It takes the lifetime work of twelve bees to fill one teaspoon of what you taste.",
  },
  {
    num: "Step 03",
    title: "The ripening",
    body: "Nectar is fanned in the comb until moisture drops below 18%. We wait for the bees to cap it themselves - never a day early.",
  },
  {
    num: "Step 04",
    title: "The harvest",
    body: "Frames are lifted by hand at dawn, cold-extracted, and left to settle by gravity. No heat, no pressure, no fine filtration.",
  },
  {
    num: "Step 05",
    title: "The jar",
    body: "Poured into glass within 48 hours, batch-numbered and lab-tested. Scan the lid to meet the apiary your honey came from.",
  },
]

/** Interactive "flower to honey" timeline: steps open on scroll, hover or focus. */
export default function Story({
  eyebrow = "Our story",
  title = "The journey from flower to honey",
  body = "Five steps, one season, zero shortcuts. Follow a single drop from the first bloom of spring to the wax seal on your jar.",
  image = "/assets/bees-pollination.webp",
  steps = DEFAULT_STEPS,
}: {
  eyebrow?: string
  title?: string
  body?: string
  image?: string
  steps?: Step[]
}) {
  return (
    <section className="section section-light" id="story" aria-labelledby="story-title">
      <div className="wrap story">
        <div className="story-visual img-reveal reveal-scale">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Close-up of honeybees working a wildflower in summer light"
            loading="lazy"
            width={1200}
            height={1600}
          />
        </div>

        <div>
          <div className="section-head">
            <p className="eyebrow reveal">{eyebrow}</p>
            <h2 id="story-title" className="reveal" data-delay="90">
              {title}
            </h2>
            <p className="lede reveal" data-delay="150">
              {body}
            </p>
          </div>

          <div className="timeline">
            <i className="timeline-progress" aria-hidden="true" />
            {steps.map((s) => (
              <article key={s.title} className="step" tabIndex={0}>
                <p className="step-num">{s.num}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
