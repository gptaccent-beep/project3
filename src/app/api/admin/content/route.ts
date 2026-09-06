import {NextResponse} from "next/server"
import {cookies} from "next/headers"
import {valid} from "@/lib/auth"
import {readContent,writeContent} from "@/lib/store"
export const runtime="nodejs"
async function allowed(){return valid((await cookies()).get("bouzid_admin")?.value)}
export async function GET(){if(!await allowed())return NextResponse.json({error:"unauthorized"},{status:401});return NextResponse.json(await readContent())}
export async function PUT(req:Request){if(!await allowed())return NextResponse.json({error:"unauthorized"},{status:401});try{const data=await req.json();await writeContent(data);return NextResponse.json({ok:true,updatedAt:new Date().toISOString()})}catch(e){const code=e instanceof Error&&e.message==="STORAGE_NOT_CONFIGURED"?"storage_not_configured":"save_failed";return NextResponse.json({error:code},{status:503})}}
