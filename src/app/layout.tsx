import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://bouzid.com"),
  title: {
    default: "BOUZID | Raw single-origin honey, harvested by hand",
    template: "%s | BOUZID",
  },
  description:
    "BOUZID is raw, cold-extracted, single-origin honey from wild mountain meadows. Never heated, never blended, lab-tested for purity and shipped within 48 hours.",
  keywords: [
    "raw honey",
    "single origin honey",
    "organic honey",
    "cold extracted honey",
    "BOUZID",
  ],
  openGraph: {
    type: "website",
    siteName: "BOUZID",
    title: "BOUZID | Raw single-origin honey, harvested by hand",
    description:
      "Raw, cold-extracted, single-origin honey from wild mountain meadows. Never heated, never blended.",
    images: [{ url: "/assets/hero-honey-jar.jpg", width: 1536, height: 864, alt: "BOUZID raw honey jar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOUZID | Raw single-origin honey",
    description: "Raw, cold-extracted honey from wild mountain meadows.",
    images: ["/assets/hero-honey-jar.jpg"],
  },
  icons: { icon: "/assets/bouzid-logo.svg" },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#2a1f1a",
  width: "device-width",
  initialScale: 1,
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: "BOUZID",
  description:
    "Raw, cold-extracted, single-origin honey from wild mountain meadows.",
  logo: "https://bouzid.com/assets/bouzid-logo.svg",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2140",
    bestRating: "5",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Karla:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
