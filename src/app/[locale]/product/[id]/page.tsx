import { notFound } from "next/navigation"
import type { Metadata } from "next"
import SiteHeader from "@/components/site/SiteHeader"
import SiteFooter from "@/components/site/SiteFooter"
import LanguageSwitcher from "@/components/site/LanguageSwitcher"
import ProductDetail from "@/components/site/ProductDetail"
import Motion from "@/components/site/Motion"
import { readContent, localeOf, localize } from "@/lib/store"

export const dynamic = "force-dynamic"

const LOCALES = ["ar", "en", "fr"]
const NAV_LINKS = ["#products", "#story", "#benefits", "#nature", "#reviews"]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale: raw, id } = await params
  if (!LOCALES.includes(raw)) return {}
  const data = await readContent()
  const locale = localeOf(raw)
  const record = data.products.find((p) => p.id === id && p.active)
  if (!record) return {}
  const copy = localize(record.translations, locale)
  return {
    title: `${copy.name} · BOUZID`,
    description: copy.description,
    alternates: {
      canonical: `/${locale}/product/${id}`,
      languages: { ar: `/ar/product/${id}`, en: `/en/product/${id}`, fr: `/fr/product/${id}` },
    },
    icons: { icon: data.branding.logo || data.branding.favicon },
    openGraph: { title: copy.name, description: copy.description, images: record.images.slice(0, 1) },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale: raw, id } = await params
  if (!LOCALES.includes(raw)) notFound()

  const data = await readContent()
  const locale = localeOf(raw)
  const t = data.copy[locale] || data.copy.ar

  const record = data.products.find((p) => p.id === id && p.active)
  if (!record) notFound()

  const copy = localize(record.translations, locale)
  const categoryName =
    data.categories.find((c) => c.id === record.category)?.translations[locale] ||
    data.categories.find((c) => c.id === record.category)?.translations.ar ||
    ""

  // Same category first, then anything else, so the row is never empty.
  const pool = data.products.filter((p) => p.active && p.id !== record.id)
  const related = [...pool.filter((p) => p.category === record.category), ...pool.filter((p) => p.category !== record.category)]
    .slice(0, 3)
    .map((p) => {
      const c = localize(p.translations, locale)
      return { id: p.id, name: c.name, image: p.images[0], price: p.price }
    })

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <SiteHeader
        links={t.nav.map((label: string, i: number) => ({ label, href: `/${locale}${NAV_LINKS[i]}` }))}
        cta={t.shop}
        logo={data.branding.logo}
        localeControl={<LanguageSwitcher locale={locale} />}
      />
      <main id="main">
        <ProductDetail
          product={{
            id: record.id,
            name: copy.name,
            short: copy.short,
            badge: copy.badge,
            description: copy.description,
            notes: copy.notes || [],
            price: record.price,
            unit: record.unit,
            stock: record.stock,
            images: record.images,
            category: categoryName,
          }}
          related={related}
          locale={locale}
          whatsappNumber={data.settings.whatsappNumber}
          labels={t}
          deliveryNote={data.settings.deliveryNote[locale]}
        />
      </main>
      <SiteFooter
        body={t.footerBody}
        copyright={t.copyright}
        purity={t.purity}
        social={{ instagram: data.settings.contact?.instagram, facebook: data.settings.contact?.facebook }}
        locale={locale}
      />
      <Motion />
    </>
  )
}
