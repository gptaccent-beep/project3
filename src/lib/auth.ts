import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import {list,put} from "@vercel/blob"
const SECURITY_FILE=path.join(process.cwd(),"data","admin-security.json"),SECURITY_BLOB="bouzid/admin-security.enc.json"
type Security={passwordHash?:string};type Encrypted={iv:string;tag:string;data:string}
function readLocal():Security{try{return JSON.parse(fs.readFileSync(SECURITY_FILE,"utf8"))}catch{return {}}}
function writeLocal(value:Security){const temp=SECURITY_FILE+".tmp";fs.writeFileSync(temp,JSON.stringify(value,null,2));fs.renameSync(temp,SECURITY_FILE)}
function encryptionKey(){const secret=process.env.ADMIN_SESSION_SECRET||"";if(secret.length<32)throw new Error("SESSION_SECRET_NOT_CONFIGURED");return crypto.createHash("sha256").update(secret).digest()}
function encrypt(value:string):Encrypted{const iv=crypto.randomBytes(12),cipher=crypto.createCipheriv("aes-256-gcm",encryptionKey(),iv),data=Buffer.concat([cipher.update(value,"utf8"),cipher.final()]);return{iv:iv.toString("hex"),tag:cipher.getAuthTag().toString("hex"),data:data.toString("hex")}}
function decrypt(value:Encrypted){const decipher=crypto.createDecipheriv("aes-256-gcm",encryptionKey(),Buffer.from(value.iv,"hex"));decipher.setAuthTag(Buffer.from(value.tag,"hex"));return Buffer.concat([decipher.update(Buffer.from(value.data,"hex")),decipher.final()]).toString("utf8")}
async function blobHash(){if(!process.env.BLOB_READ_WRITE_TOKEN)return "";try{const result=await list({prefix:SECURITY_BLOB,limit:10,token:process.env.BLOB_READ_WRITE_TOKEN});const blob=result.blobs.find(x=>x.pathname===SECURITY_BLOB);if(!blob)return "";const r=await fetch(blob.url,{cache:"no-store"});if(!r.ok)return "";return decrypt(await r.json())}catch(e){console.error("Shared credential read failed",e instanceof Error?e.message:"unknown");return ""}}
async function configuredHash(){const shared=await blobHash();if(shared)return shared;if(!process.env.VERCEL){const local=readLocal().passwordHash;if(local)return local}return process.env.ADMIN_PASSWORD_HASH||""}
export function hashPassword(password:string){const salt=crypto.randomBytes(16),hash=crypto.scryptSync(password,salt,64);return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`}
export function verifyPassword(password:string,encoded:string){try{const [kind,saltHex,hashHex]=encoded.split(":");if(kind!=="scrypt"||!saltHex||!hashHex)return false;const expected=Buffer.from(hashHex,"hex"),actual=crypto.scryptSync(password,Buffer.from(saltHex,"hex"),expected.length);return crypto.timingSafeEqual(expected,actual)}catch{return false}}
function safeTextEqual(a:string,b:string){const left=Buffer.from(a),right=Buffer.from(b);return left.length===right.length&&crypto.timingSafeEqual(left,right)}
export async function credentials(user:string,pass:string){const configuredUser=process.env.ADMIN_USERNAME||"",hash=await configuredHash();return Boolean(configuredUser&&hash&&safeTextEqual(user,configuredUser)&&verifyPassword(pass,hash))}
export async function changePassword(current:string,next:string){if(next.length<12)return{ok:false,error:"weak"};const currentHash=await configuredHash();if(!verifyPassword(current,currentHash))return{ok:false,error:"current"};const nextHash=hashPassword(next);if(process.env.BLOB_READ_WRITE_TOKEN){await put(SECURITY_BLOB,JSON.stringify(encrypt(nextHash)),{access:"public",addRandomSuffix:false,allowOverwrite:true,contentType:"application/json",cacheControlMaxAge:60,token:process.env.BLOB_READ_WRITE_TOKEN});return{ok:true}}if(process.env.VERCEL)throw new Error("STORAGE_NOT_CONFIGURED");writeLocal({passwordHash:nextHash});return{ok:true}}
const sessionSecret=()=>process.env.ADMIN_SESSION_SECRET||""
export function token(){const secret=sessionSecret();if(secret.length<32)return"";return crypto.createHmac("sha256",secret).update("bouzid-admin-session-v2").digest("hex")}
export function valid(value?:string){const expected=token();if(!value||!expected)return false;try{return crypto.timingSafeEqual(Buffer.from(value),Buffer.from(expected))}catch{return false}}
const attempts=new Map<string,{count:number;reset:number}>()
export function loginStatus(key:string){const now=Date.now(),x=attempts.get(key);if(!x||x.reset<=now){attempts.delete(key);return{allowed:true,remaining:5}}return{allowed:x.count<5,remaining:Math.max(0,5-x.count),retryAfter:Math.ceil((x.reset-now)/1000)}}
export function recordFailure(key:string){const now=Date.now(),x=attempts.get(key);attempts.set(key,!x||x.reset<=now?{count:1,reset:now+15*60_000}:{...x,count:x.count+1})}
export function clearFailures(key:string){attempts.delete(key)}
