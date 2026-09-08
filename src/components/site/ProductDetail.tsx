"use client"
import { FormEvent, useMemo, useState } from "react"
import Bees from "./Bees"

export type DetailProduct = {
  id: string
  name: string
  short?: string
  badge?: string
  description: string
  notes: string[]
  price: number
  unit: string
  stock: string
  images: string[]
  category: string
}

export type RelatedProduct = { id: string; name: string; image: string; price: number }

type Labels = Record<string, string>

/** Extra wording the product page needs that is not in the shared copy deck. */
const UI = {
  ar: {
    back: "العودة إلى المتجر",
    orderTitle: "إتمام الطلب",
    orderIntro: "املأ بياناتك وسيصل الطلب إلينا مباشرة على واتساب. الدفع عند التسليم.",
    fullName: "الاسم الكامل",
    namePlaceholder: "مثال: محمد العلوي",
    notesLabel: "ملاحظة إضافية (اختياري)",
    notesPlaceholder: "الوقت المناسب للتوصيل، تعليمات خاصة…",
    total: "المجموع",
    unitPrice: "سعر الوحدة",
    weight: "الوزن",
    categoryLabel: "الفئة",
    availability: "التوفر",
    tasting: "مذاق المنتج",
    details: "تفاصيل المنتج",
    related: "منتجات أخرى قد تعجبك",
    outOfStock: "هذا المنتج غير متوفر حاليًا. تواصل معنا لمعرفة موعد الدفعة القادمة.",
    galleryHint: "اختر صورة",
    decrease: "إنقاص الكمية",
    increase: "زيادة الكمية",
  },
  en: {
    back: "Back to the shop",
    orderTitle: "Complete your order",
    orderIntro: "Fill in your details and the order reaches us straight on WhatsApp. Pay on delivery.",
    fullName: "Full name",
    namePlaceholder: "e.g. Mohamed Alaoui",
    notesLabel: "Extra note (optional)",
    notesPlaceholder: "Best delivery time, special instructions…",
    total: "Total",
    unitPrice: "Unit price",
    weight: "Weight",
    categoryLabel: "Category",
    availability: "Availability",
    tasting: "Tasting notes",
    details: "Product details",
    related: "You may also like",
    outOfStock: "This jar is out of stock right now. Message us and we will tell you when the next batch lands.",
    galleryHint: "Choose an image",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
  },
  fr: {
    back: "Retour à la boutique",
    orderTitle: "Finaliser la commande",
    orderIntro: "Renseignez vos informations et la commande nous arrive directement sur WhatsApp. Paiement à la livraison.",
    fullName: "Nom complet",
    namePlaceholder: "ex. Mohamed Alaoui",
    notesLabel: "Note supplémentaire (optionnel)",
    notesPlaceholder: "Heure de livraison, instructions particulières…",
    total: "Total",
    unitPrice: "Prix unitaire",
    weight: "Poids",
    categoryLabel: "Catégorie",
    availability: "Disponibilité",
    tasting: "Notes de dégustation",
    details: "Détails du produit",
    related: "Vous aimerez aussi",
    outOfStock: "Ce pot est en rupture de stock. Écrivez-nous pour connaître la prochaine récolte.",
    galleryHint: "Choisir une image",
    decrease: "Diminuer la quantité",
    increase: "Augmenter la quantité",
  },
} as const

export default function ProductDetail({
  product,
  related,
  locale,
  whatsappNumber,
  labels,
  deliveryNote,
}: {
  product: DetailProduct
  related: RelatedProduct[]
  locale: "ar" | "en" | "fr"
  whatsappNumber: string
  labels: Labels
  deliveryNote?: string
}) {
  const ui = UI[locale] ?? UI.ar
  const images = product.images.length ? product.images : ["/assets/products-collection.webp"]
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [note, setNote] = useState("")

  const soldOut = product.stock === "out_of_stock"
  const money = (n: number) => (locale === "ar" ? `${n} د.م.` : `${n} MAD`)
  const total = useMemo(() => product.price * Math.max(1, qty), [product.price, qty])

  function submit(e: FormEvent) {
    e.preventDefault()
    const lines: Record<string, string> = {
      ar: `مرحبًا بوزيد، أريد طلب:\nالمنتج: ${product.name}\nالوزن: ${product.unit}\nالكمية: ${qty}\nالمجموع: ${total} د.م.\nالاسم: ${name}\nالهاتف: ${phone}\nمكان التوصيل: ${location}${note ? `\nملاحظة: ${note}` : ""}`,
      en: `Hello BOUZID, I would like to order:\nProduct: ${product.name}\nWeight: ${product.unit}\nQuantity: ${qty}\nTotal: ${total} MAD\nName: ${name}\nPhone: ${phone}\nDelivery location: ${location}${note ? `\nNote: ${note}` : ""}`,
      fr: `Bonjour BOUZID, je souhaite commander :\nProduit : ${product.name}\nPoids : ${product.unit}\nQuantité : ${qty}\nTotal : ${total} MAD\nNom : ${name}\nTéléphone : ${phone}\nLieu de livraison : ${location}${note ? `\nNote : ${note}` : ""}`,
    }
    const text = encodeURIComponent(lines[locale] || lines.ar)
    const waUrl = "https://wa.me/" + whatsappNumber.replace(/\D/g, "") + "?text=" + text
    window.open(waUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="pd" aria-labelledby="pd-title">
      <div className="wrap">
        <a className="pd-back" href={`/${locale}#products`}>
          <span aria-hidden="true">←</span>
          {ui.back}
        </a>

        <div className="pd-layout">
          {/* ---------- big pictures ---------- */}
          <div className="pd-gallery">
            <div className="pd-stage">
              {product.badge && <span className="pd-badge">{product.badge}</span>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[active]}
                alt={product.name}
                width={1400}
                height={1750}
                // First image is the largest thing on screen, so load it eagerly
                loading={active === 0 ? "eager" : "lazy"}
              />
              <Bees variant="compact" />
            </div>

            {images.length > 1 && (
              <div className="pd-thumbs" role="group" aria-label={ui.galleryHint}>
                {images.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    className="pd-thumb"
                    aria-current={i === active}
                    aria-label={`${ui.galleryHint} ${i + 1}`}
                    onClick={() => setActive(i)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" width={160} height={160} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- information ---------- */}
          <div className="pd-info">
            <p className="eyebrow">{product.short || product.category}</p>
            <h1 className="pd-title" id="pd-title">
              {product.name}
            </h1>

            <div className="pd-meta">
              <span className={`stock-dot ${product.stock}`}>{labels[`stock_${product.stock}`]}</span>
              {deliveryNote && <span>✓ {deliveryNote}</span>}
            </div>

            <p className="pd-price">
              {money(product.price)}
              <small>/ {product.unit}</small>
            </p>

            <p className="pd-desc">{product.description}</p>

            {product.notes.length > 0 && (
              <>
                <p className="eyebrow">{ui.tasting}</p>
                <ul className="pd-notes">
                  {product.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </>
            )}

            <p className="eyebrow">{ui.details}</p>
            <ul className="pd-specs">
              <li>
                <span>{ui.weight}</span>
                <span>{product.unit}</span>
              </li>
              <li>
                <span>{ui.categoryLabel}</span>
                <span>{product.category}</span>
              </li>
              <li>
                <span>{ui.unitPrice}</span>
                <span>{money(product.price)}</span>
              </li>
              <li>
                <span>{ui.availability}</span>
                <span>{labels[`stock_${product.stock}`]}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- order panel, below the product ---------- */}
        <div className="pd-order" id="order">
          <p className="eyebrow">WHATSAPP</p>
          <h2>{ui.orderTitle}</h2>
          <p className="pd-order-intro">{ui.orderIntro}</p>

          <form className="pd-form" onSubmit={submit}>
            {soldOut && <p className="pd-oos">{ui.outOfStock}</p>}

            <div className="pd-field">
              {labels.quantity || "Quantity"}
              <div className="pd-qty">
                <button type="button" onClick={() => setQty((v) => Math.max(1, v - 1))} disabled={qty <= 1} aria-label={ui.decrease}>
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={99}
                  inputMode="numeric"
                  value={qty}
                  onChange={(e) => setQty(Math.min(99, Math.max(1, Number(e.target.value) || 1)))}
                  aria-label={labels.quantity || "Quantity"}
                  required
                />
                <button type="button" onClick={() => setQty((v) => Math.min(99, v + 1))} disabled={qty >= 99} aria-label={ui.increase}>
                  +
                </button>
              </div>
            </div>

            <label className="pd-field">
              {ui.fullName}
              <input value={name} placeholder={ui.namePlaceholder} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label className="pd-field">
              {labels.buyerPhone || "Phone"}
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                placeholder={labels.phonePlaceholder}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <label className="pd-field">
              {labels.location || "Delivery location"}
              <input
                value={location}
                placeholder={labels.locationPlaceholder}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </label>

            <label className="pd-field pd-field-wide">
              {ui.notesLabel}
              <textarea value={note} placeholder={ui.notesPlaceholder} onChange={(e) => setNote(e.target.value)} rows={3} />
            </label>

            <div className="pd-total">
              <span>
                {ui.total} · {qty} × {money(product.price)}
              </span>
              <b>{money(total)}</b>
            </div>

            <button className="pd-submit" disabled={soldOut}>
              {labels.sendOrder || "Send the order"}
              <span aria-hidden="true">↗</span>
            </button>

            {deliveryNote && <p className="pd-note">{deliveryNote}</p>}
          </form>
        </div>

        {/* ---------- related ---------- */}
        {related.length > 0 && (
          <div className="pd-related">
            <h2>{ui.related}</h2>
            <div className="pd-related-grid">
              {related.map((r) => (
                <a className="pd-related-card" key={r.id} href={`/${locale}/product/${r.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.name} loading="lazy" width={600} height={450} />
                  <div>
                    <b>{r.name}</b>
                    <em>{money(r.price)}</em>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
