import crypto from "node:crypto"
const ADMIN_USERNAME="Bouzid"
const ADMIN_PASSWORD_HASH="scrypt:7795a67f25aaec346b56ee31fd986b05:b16bdad7c157649c3b1416469ac5d73d0ed8aceb074da6f622edd1065bc887b8c0c78c198f39d9d0c980b4ed7d15cbd2cf8611a9b75e41c18a8b34988452b866"
function verifyPassword(password:string,encoded:string){try{const [kind,saltHex,hashHex]=encoded.split(":");if(kind!=="scrypt"||!saltHex||!hashHex)return false;const expected=Buffer.from(hashHex,"hex"),actual=crypto.scryptSync(password,Buffer.from(saltHex,"hex"),expected.length);return crypto.timingSafeEqual(expected,actual)}catch{return false}}
function safeTextEqual(a:string,b:string){const left=Buffer.from(a),right=Buffer.from(b);return left.length===right.length&&crypto.timingSafeEqual(left,right)}
export async function credentials(user:string,pass:string){return safeTextEqual(user,ADMIN_USERNAME)&&verifyPassword(pass,ADMIN_PASSWORD_HASH)}
export async function changePassword(_current:string,_next:string){return{ok:false,error:"fixed_credentials"}}
export function token(){return crypto.createHmac("sha256",ADMIN_PASSWORD_HASH).update("bouzid-fixed-admin-session-v1").digest("hex")}
export function valid(value?:string){const expected=token();if(!value)return false;try{return crypto.timingSafeEqual(Buffer.from(value),Buffer.from(expected))}catch{return false}}
const attempts=new Map<string,{count:number;reset:number}>()
export function loginStatus(key:string){const now=Date.now(),x=attempts.get(key);if(!x||x.reset<=now){attempts.delete(key);return{allowed:true,remaining:5}}return{allowed:x.count<5,remaining:Math.max(0,5-x.count),retryAfter:Math.ceil((x.reset-now)/1000)}}
export function recordFailure(key:string){const now=Date.now(),x=attempts.get(key);attempts.set(key,!x||x.reset<=now?{count:1,reset:now+15*60_000}:{...x,count:x.count+1})}
export function clearFailures(key:string){attempts.delete(key)}
