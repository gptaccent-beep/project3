export default function SiteFooter() {
  const columns = [
    {
      title: "Shop",
      links: [
        { href: "#products", label: "Wild Meadow Reserve" },
        { href: "#products", label: "Mountain Blossom Trio" },
        { href: "#products", label: "Honeycomb, Cut Fresh" },
        { href: "#shop", label: "Gift boxes" },
      ],
    },
    {
      title: "House",
      links: [
        { href: "#story", label: "Our story" },
        { href: "#nature", label: "Bee programme" },
        { href: "#benefits", label: "Quality & testing" },
        { href: "#reviews", label: "Reviews" },
      ],
    },
    {
      title: "Contact",
      links: [
        { href: "mailto:hello@bouzid.com", label: "hello@bouzid.com" },
        { href: "#shop", label: "Shipping & returns" },
        { href: "#shop", label: "Wholesale" },
      ],
    },
  ]

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/bouzid-logo.svg" alt="BOUZID" width={200} height={53} />
            <p className="lede" style={{ marginTop: 16, fontSize: 14 }}>
              Family beekeepers since 1974. Raw honey, harvested by hand, traceable to the hive.
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-base">
          <span>&copy; {new Date().getFullYear()} BOUZID. All rights reserved.</span>
          <span>Raw &middot; Unfiltered &middot; Unpasteurised</span>
        </div>
      </div>
    </footer>
  )
}
