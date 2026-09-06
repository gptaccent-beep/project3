import {NextResponse} from "next/server"
import {cookies} from "next/headers"
import {valid} from "@/lib/auth"
import {readContent,writeContent} from "@/lib/store"
async function allowed(){return valid((await cookies()).get("bouzid_admin")?.value)}
export async function GET(){if(!await allowed())return NextResponse.json({error:"Unauthorized"},{status:401});return NextResponse.json(readContent())}
export async function PUT(req:Request){if(!await allowed())return NextResponse.json({error:"Unauthorized"},{status:401});const data=await req.json();writeContent(data);return NextResponse.json({ok:true,updatedAt:new Date().toISOString()})}
