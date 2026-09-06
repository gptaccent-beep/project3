import {notFound} from "next/navigation"
import type {Metadata} from "next"
import Storefront from "@/components/site/Storefront"
import {readContent,localeOf} from "@/lib/store"
export const dynamic="force-dynamic"
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale:raw}=await params;if(!["ar","en","fr"].includes(raw))return{};const data=readContent(),locale=localeOf(raw);return{title:data.seo[locale].title,description:data.seo[locale].description,alternates:{canonical:`/${locale}`,languages:{ar:"/ar",en:"/en",fr:"/fr"}},icons:{icon:data.branding.logo||data.branding.favicon},openGraph:{title:data.seo[locale].title,description:data.seo[locale].description,images:[data.media.heroPoster]}}}
export default async function LocaleHome({params}:{params:Promise<{locale:string}>}){const {locale:raw}=await params;if(!["ar","en","fr"].includes(raw))notFound();const locale=localeOf(raw);return <Storefront data={readContent()} locale={locale}/>}
