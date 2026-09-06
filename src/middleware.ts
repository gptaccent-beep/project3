import { NextRequest, NextResponse } from "next/server"
const locales=["ar","en","fr"]
export function middleware(req:NextRequest){
 const {pathname}=req.nextUrl
 if(pathname==="/0"){ const u=req.nextUrl.clone(); u.pathname="/admin"; return NextResponse.redirect(u) }
 if(pathname==="/"){ const saved=req.cookies.get("bouzid_locale")?.value; const locale=locales.includes(saved||"")?saved:"ar"; const u=req.nextUrl.clone(); u.pathname=`/${locale}`; return NextResponse.redirect(u) }
 const locale=locales.find(l=>pathname===`/${l}`||pathname.startsWith(`/${l}/`))||"ar"
 const headers=new Headers(req.headers); headers.set("x-bouzid-locale",locale)
 return NextResponse.next({request:{headers}})
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|assets|uploads|api).*)"]}
