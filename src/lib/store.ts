import fs from "node:fs"
import path from "node:path"
import type { Locale, SiteContent } from "./types"
const DB = path.join(process.cwd(), "data", "site.json")
export function readContent(): SiteContent { return JSON.parse(fs.readFileSync(DB,"utf8")) }
export function writeContent(data:SiteContent){ const temp=DB+".tmp"; fs.writeFileSync(temp,JSON.stringify(data,null,2)); fs.renameSync(temp,DB) }
export function localeOf(value?:string):Locale { return value === "en" || value === "fr" ? value : "ar" }
export function localize<T extends Record<string,any>>(translations:Record<string,T>, locale:Locale):T { return {...(translations.ar||{}),...(translations[locale]||{})} as T }
