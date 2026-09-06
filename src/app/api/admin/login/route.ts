import {NextResponse} from "next/server"
import {credentials,token} from "@/lib/auth"
export async function POST(req:Request){const {username,password}=await req.json();if(!credentials(username,password))return NextResponse.json({error:"Invalid credentials"},{status:401});const res=NextResponse.json({ok:true});res.cookies.set("bouzid_admin",token(),{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",maxAge:60*60*8,path:"/"});return res}
export async function DELETE(){const res=NextResponse.json({ok:true});res.cookies.set("bouzid_admin","",{maxAge:0,path:"/"});return res}
