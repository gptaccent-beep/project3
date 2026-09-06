export type NatureStat = { value: string; count: number; suffix: string; label: string }

const DEFAULT_STATS: NatureStat[] = [
  { value: "12", count: 12, suffix: " ha", label: "Meadow replanted" },
  { value: "30", count: 30, suffix: "%", label: "Hives left unharvested" },
  { value: "2", count: 2, suffix: "%", label: "Revenue to pollinator research" },
]

/** Immersive parallax bee/ecosystem section with animated counters. */
export default function BeeNature({
  eyebrow = "The ecosystem",
  title = "No bees, no harvest.",
  accent = "No us.",
  body = "A third of everything on your table depends on pollinators. Our apiaries are placed to restore wild forage corridors, not to drain them - and every jar funds the next hectare of wildflower meadow we put back.",
  image = "/assets/bees-pollination.webp",
  stats = DEFAULT_STATS,
}: {
  eyebrow?: string
  title?: string
  accent?: string
  body?: string
  image?: string
  stats?: NatureStat[]
}) {
  return (
    <section className="nature" id="nature" aria-labelledby="nature-title">
      <div className="nature-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" data-parallax="0.14" loading="lazy" width={1600} height={1000} />
      </div>
      <div className="wrap">
        <div className="nature-panel glass reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="nature-title" style={{ marginTop: 16 }}>
            {title} <span className="italic-gold">{accent}</span>
          </h2>
          <p className="lede" style={{ marginTop: 18 }}>
            {body}
          </p>
          <ul className="nature-stats">
            {stats.map((s) => (
              <li key={s.label}>
                <b data-count={s.count} data-suffix={s.suffix}>
                  {s.value}
                  {s.suffix}
                </b>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
