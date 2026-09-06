import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
const SECURITY_FILE=path.join(process.cwd(),"data","admin-security.json")
type Security={passwordHash?:string}
function readSecurity():Security{try{return JSON.parse(fs.readFileSync(SECURITY_FILE,"utf8"))}catch{return {}}}
function writeSecurity(value:Security){const temp=SECURITY_FILE+".tmp";fs.writeFileSync(temp,JSON.stringify(value,null,2));fs.renameSync(temp,SECURITY_FILE)}
export function hashPassword(password:string){const salt=crypto.randomBytes(16);const hash=crypto.scryptSync(password,salt,64);return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`}
export function verifyPassword(password:string,encoded:string){try{const [kind,saltHex,hashHex]=encoded.split(":");if(kind!=="scrypt"||!saltHex||!hashHex)return false;const expected=Buffer.from(hashHex,"hex"),actual=crypto.scryptSync(password,Buffer.from(saltHex,"hex"),expected.length);return crypto.timingSafeEqual(expected,actual)}catch{return false}}
function configuredHash(){return readSecurity().passwordHash||process.env.ADMIN_PASSWORD_HASH||""}
function safeTextEqual(a:string,b:string){const left=Buffer.from(a),right=Buffer.from(b);return left.length===right.length&&crypto.timingSafeEqual(left,right)}
export function credentials(user:string,pass:string){const configuredUser=process.env.ADMIN_USERNAME||"",hash=configuredHash();return Boolean(configuredUser&&hash&&safeTextEqual(user,configuredUser)&&verifyPassword(pass,hash))}
export function changePassword(current:string,next:string){if(next.length<12)return {ok:false,error:"weak"};if(!verifyPassword(current,configuredHash()))return {ok:false,error:"current"};writeSecurity({passwordHash:hashPassword(next)});return {ok:true}}
const sessionSecret=()=>process.env.ADMIN_SESSION_SECRET||""
export function token(){const secret=sessionSecret();if(!secret)return "";return crypto.createHmac("sha256",secret).update("bouzid-admin-session-v2").digest("hex")}
export function valid(value?:string){const expected=token();if(!value||!expected)return false;try{return crypto.timingSafeEqual(Buffer.from(value),Buffer.from(expected))}catch{return false}}
const attempts=new Map<string,{count:number;reset:number}>()
export function loginStatus(key:string){const now=Date.now(),x=attempts.get(key);if(!x||x.reset<=now){attempts.delete(key);return {allowed:true,remaining:5}}return {allowed:x.count<5,remaining:Math.max(0,5-x.count),retryAfter:Math.ceil((x.reset-now)/1000)}}
export function recordFailure(key:string){const now=Date.now(),x=attempts.get(key);attempts.set(key,!x||x.reset<=now?{count:1,reset:now+15*60_000}:{...x,count:x.count+1})}
export function clearFailures(key:string){attempts.delete(key)}
