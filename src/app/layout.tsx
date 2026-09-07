import type { ReactNode } from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import "./visual-premium.css"
import "./locale-fixes.css"
import "./admin/admin.css"
import "./mobile-hardening.css"
import "./contact-flow.css"
import "./performance-stability.css"
import "./render-stability.css"
import "./admin/mobile-admin.css"
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://bouzid.com"),icons:{icon:"/assets/bouzid-logo.svg"},robots:{index:true,follow:true}}
export default async function RootLayout({children}:{children:ReactNode}){const h=await headers();const locale=h.get("x-bouzid-locale")||"ar";return <html lang={locale} dir={locale==="ar"?"rtl":"ltr"} suppressHydrationWarning><head><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><meta name="theme-color" content="#24140a"/><link rel="preload" href="/assets/noto-arabic.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body>{children}</body></html>}
