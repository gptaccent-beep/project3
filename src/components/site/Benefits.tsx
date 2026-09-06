import type { ReactNode } from "react"

const ICONS: Record<string, ReactNode> = {
  natural: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 21c5-2 8-6 8-11V5l-8-2-8 2v5c0 5 3 9 8 11z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  nutrients: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3v18M5 8l7 4 7-4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  sustainable: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 20c0-7 5-12 12-13-1 8-5 12-12 13z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 20c3-3 5-5 8-6.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  traditional: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 4.6v9.2L12 22l-8-6.2V6.6z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v10M8 9.5v5M16 9.5v5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
}

export type Benefit = { icon: keyof typeof ICONS; title: string; body: string }

const DEFAULT_BENEFITS: Benefit[] = [
  {
    icon: "natural",
    title: "100% natural",
    body: "Raw, unpasteurised and unfiltered. One ingredient on the label, and it is honey.",
  },
  {
    icon: "nutrients",
    title: "Rich in nutrients",
    body: "Living enzymes, pollen and antioxidants survive because we never heat above hive temperature.",
  },
  {
    icon: "sustainable",
    title: "Sustainable production",
    body: "Bees keep their winter stores. We harvest the surplus only, and replant 12 hectares of forage.",
  },
  {
    icon: "traditional",
    title: "Traditional harvesting",
    body: "Hand-lifted frames, gravity settling, wooden hives built in the same workshop since 1974.",
  },
]

/** Animated benefit cards with staggered reveals and glass hover lift. */
export default function Benefits({
  eyebrow = "Why BOUZID",
  title = "Craft you can taste, proof you can read",
  benefits = DEFAULT_BENEFITS,
}: {
  eyebrow?: string
  title?: string
  benefits?: Benefit[]
}) {
  return (
    <section className="section section-dark comb-bg" id="benefits" aria-labelledby="benefits-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow reveal">{eyebrow}</p>
          <h2 id="benefits-title" className="reveal" data-delay="90">
            {title}
          </h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((b, i) => (
            <article key={b.title} className="benefit glass lift reveal" data-delay={60 + i * 80}>
              <div className="benefit-icon" aria-hidden="true">
                {ICONS[b.icon]}
              </div>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
