import {NextResponse} from "next/server"
import {cookies} from "next/headers"
import {changePassword,valid} from "@/lib/auth"
export async function POST(req:Request){if(!valid((await cookies()).get("bouzid_admin")?.value))return NextResponse.json({error:"unauthorized"},{status:401});const body=await req.json();const current=typeof body.currentPassword==="string"?body.currentPassword:"",next=typeof body.newPassword==="string"?body.newPassword:"";let result;try{result=await changePassword(current,next)}catch(e){return NextResponse.json({error:e instanceof Error&&e.message==="STORAGE_NOT_CONFIGURED"?"storage_not_configured":"change_failed"},{status:503})}if(!result.ok)return NextResponse.json({error:result.error},{status:400});return NextResponse.json({ok:true})}
