export type Product = {
  name: string
  badge?: string
  image: string
  alt: string
  notes: string[]
  price: string
  unit: string
  href?: string
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    name: "Wild Meadow Reserve",
    badge: "Signature",
    image: "/assets/products-collection.webp",
    alt: "Amber jars of BOUZID wild meadow honey with fresh honeycomb",
    notes: ["Caramel", "Wild thyme", "Long finish"],
    price: "\u20ac24",
    unit: "500 g jar",
  },
  {
    name: "Mountain Blossom Trio",
    badge: "Gift set",
    image: "/assets/hero-honey-jar.webp",
    alt: "BOUZID honey jar with a dipper, lit by warm golden light",
    notes: ["Orange blossom", "Chestnut", "Rosemary"],
    price: "\u20ac58",
    unit: "3 \u00d7 250 g",
  },
  {
    name: "Honeycomb, Cut Fresh",
    badge: "Limited",
    image: "/assets/bees-pollination.webp",
    alt: "Honeybees gathering nectar on a purple wildflower",
    notes: ["Raw comb", "Floral wax", "Cut to order"],
    price: "\u20ac31",
    unit: "350 g box",
  },
]

/** Premium product grid: 3D pointer-tilt cards, image zoom, floating shadows. */
export default function Products({
  eyebrow = "The collection",
  title = "Three harvests, three characters",
  body = "Every jar is traceable to a single apiary and a single bloom window. We bottle what the season gives - never blended, never stretched.",
  products = DEFAULT_PRODUCTS,
}: {
  eyebrow?: string
  title?: string
  body?: string
  products?: Product[]
}) {
  return (
    <section className="section section-dark comb-bg" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow reveal">{eyebrow}</p>
          <h2 id="products-title" className="reveal" data-delay="90">
            {title}
          </h2>
          <p className="lede reveal" data-delay="160">
            {body}
          </p>
        </div>

        <div className="product-grid">
          {products.map((p, i) => (
            <article key={p.name} className="card-3d glass lift reveal" data-delay={60 + i * 100}>
              <div className="card-media">
                {p.badge ? <span className="badge">{p.badge}</span> : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.alt} loading="lazy" width={1200} height={800} />
              </div>
              <div className="card-body">
                <h3>{p.name}</h3>
                <ul className="card-notes">
                  {p.notes.map((n) => (
                    <li key={n} className="note">
                      {n}
                    </li>
                  ))}
                </ul>
                <div className="card-foot">
                  <p className="price">
                    {p.price}
                    <small>{p.unit}</small>
                  </p>
                  <a className="link-gold" href={p.href ?? "#shop"}>
                    Add to basket <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
