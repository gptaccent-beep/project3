import crypto from "node:crypto"
const secret=()=>process.env.ADMIN_SESSION_SECRET||"change-this-secret"
export function credentials(user:string,pass:string){return user===(process.env.ADMIN_USERNAME||"Bouzid")&&pass===(process.env.ADMIN_PASSWORD||"admin")}
export function token(){return crypto.createHmac("sha256",secret()).update("bouzid-admin").digest("hex")}
export function valid(value?:string){if(!value)return false;try{return crypto.timingSafeEqual(Buffer.from(value),Buffer.from(token()))}catch{return false}}
