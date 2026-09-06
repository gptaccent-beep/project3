/** Fixed glass navigation. `is-stuck` / `is-open` states handled by public/motion.js. */
export default function SiteHeader({
  links = [
    { href: "#products", label: "Collection" },
    { href: "#story", label: "Our story" },
    { href: "#benefits", label: "Why BOUZID" },
    { href: "#nature", label: "The bees" },
    { href: "#reviews", label: "Reviews" },
  ],
  cta = "Shop honey",
  logo = "/assets/bouzid-wordmark.svg",
}: {
  links?: { href: string; label: string }[]
  cta?: string
  logo?: string
}) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="nav-logo" href="#main" aria-label="BOUZID home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="BOUZID" width={152} height={34} />
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-gold nav-cta" href="#shop">
          <span>{cta}</span>
        </a>
        <button className="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
    </header>
  )
}
