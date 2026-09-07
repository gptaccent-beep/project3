import type { ReactNode } from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import "./visual-premium.css"
import "./locale-fixes.css"
import "./admin/admin.css"
import "./mobile-hardening.css"
import "./mobile-device-fallback.css"
import "./contact-flow.css"
import "./admin/mobile-admin.css"
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://bouzid.com"),icons:{icon:"/assets/bouzid-logo.svg"},robots:{index:true,follow:true}}
export default async function RootLayout({children}:{children:ReactNode}){const h=await headers();const locale=h.get("x-bouzid-locale")||"ar";return <html lang={locale} dir={locale==="ar"?"rtl":"ltr"} suppressHydrationWarning><head><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><meta name="theme-color" content="#24140a"/><script dangerouslySetInnerHTML={{__html:`try{if(Math.min(screen.width,screen.height)<=768||/Android|iPhone|iPad|Mobi/i.test(navigator.userAgent)){document.documentElement.classList.add('mobile-device')}}catch(e){}`}}/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"/></head><body>{children}</body></html>}
