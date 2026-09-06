"use client"
import { useRouter } from "next/navigation"
export default function LanguageSwitcher({locale}:{locale:string}){const router=useRouter();function change(next:string){document.cookie=`bouzid_locale=${next};path=/;max-age=31536000;samesite=lax`;router.push(`/${next}`)}return <div className="language-switcher" aria-label="Language">{["ar","en","fr"].map(l=><button key={l} className={locale===l?"active":""} onClick={()=>change(l)}>{l.toUpperCase()}</button>)}</div>}
