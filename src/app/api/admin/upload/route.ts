import {NextResponse} from "next/server"
import {cookies} from "next/headers"
import {valid} from "@/lib/auth"
import {put} from "@vercel/blob"
import fs from "node:fs/promises"
import path from "node:path"

export const runtime="nodejs"
const MAX_FILE_SIZE=4*1024*1024
const allowed=new Set(["image/jpeg","image/png","image/webp","image/avif","image/gif","image/svg+xml","video/mp4","video/webm"])

export async function POST(req:Request){
 if(!valid((await cookies()).get("bouzid_admin")?.value))return NextResponse.json({error:"Unauthorized"},{status:401})
 const form=await req.formData(),file=form.get("file")
 if(!(file instanceof File))return NextResponse.json({error:"File required"},{status:400})
 if(!allowed.has(file.type))return NextResponse.json({error:"Use JPG, PNG, WebP, AVIF, GIF, SVG, MP4 or WebM"},{status:400})
 if(file.size>MAX_FILE_SIZE)return NextResponse.json({error:"Maximum file size is 4 MB"},{status:413})
 const clean=file.name.replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-")||"media"
 const pathname=`bouzid/uploads/${Date.now()}-${clean}`
 if(process.env.BLOB_READ_WRITE_TOKEN){
  const blob=await put(pathname,file,{access:"public",addRandomSuffix:false,token:process.env.BLOB_READ_WRITE_TOKEN,contentType:file.type})
  return NextResponse.json({url:blob.url})
 }
 if(process.env.VERCEL)return NextResponse.json({error:"BLOB_READ_WRITE_TOKEN is missing"},{status:503})
 const safe=pathname.split("/").pop()!,dir=path.join(process.cwd(),"public","uploads")
 await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,safe),Buffer.from(await file.arrayBuffer()))
 return NextResponse.json({url:`/uploads/${safe}`})
}
