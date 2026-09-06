import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import "./globals.css"
import "./visual-premium.css"
import "./admin/admin.css"
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://bouzid.com"),icons:{icon:"/assets/bouzid-logo.svg"},robots:{index:true,follow:true}}
export const viewport:Viewport={themeColor:"#24140a",width:"device-width",initialScale:1}
export default async function RootLayout({children}:{children:ReactNode}){const h=await headers();const locale=h.get("x-bouzid-locale")||"ar";return <html lang={locale} dir={locale==="ar"?"rtl":"ltr"}><body>{children}</body></html>}
