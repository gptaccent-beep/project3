import fs from "node:fs"
import path from "node:path"
import {list,put} from "@vercel/blob"
import type {Locale,SiteContent} from "./types"
const DB=path.join(process.cwd(),"data","site.json"),BLOB_PATH="bouzid/site.json"
function bundled():SiteContent{return JSON.parse(fs.readFileSync(DB,"utf8"))}
export async function readContent():Promise<SiteContent>{
 if(process.env.BLOB_READ_WRITE_TOKEN){try{const result=await list({prefix:BLOB_PATH,limit:10,token:process.env.BLOB_READ_WRITE_TOKEN});const blob=result.blobs.find(x=>x.pathname===BLOB_PATH);if(blob){const r=await fetch(blob.url,{cache:"no-store"});if(r.ok)return await r.json()}}catch(e){console.error("Content storage read failed",e instanceof Error?e.message:"unknown")}}
 return bundled()
}
export async function writeContent(data:SiteContent){
 const body=JSON.stringify(data,null,2)
 if(process.env.BLOB_READ_WRITE_TOKEN){await put(BLOB_PATH,body,{access:"public",addRandomSuffix:false,allowOverwrite:true,contentType:"application/json",cacheControlMaxAge:60,token:process.env.BLOB_READ_WRITE_TOKEN});return}
 if(process.env.VERCEL)throw new Error("STORAGE_NOT_CONFIGURED")
 const temp=DB+".tmp";fs.writeFileSync(temp,body);fs.renameSync(temp,DB)
}
export function localeOf(value?:string):Locale{return value==="en"||value==="fr"?value:"ar"}
export function localize<T extends Record<string,any>>(translations:Record<string,T>,locale:Locale):T{return {...(translations.ar||{}),...(translations[locale]||{})} as T}
