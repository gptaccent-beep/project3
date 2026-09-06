"use client"
import {useEffect} from "react"
import {usePathname} from "next/navigation"
export default function Motion(){const pathname=usePathname();useEffect(()=>{const w=window as unknown as{BouzidMotion?:{boot:()=>void}};const run=()=>requestAnimationFrame(()=>w.BouzidMotion?.boot());if(w.BouzidMotion){run();return}let script=document.querySelector('script[data-bouzid-motion]') as HTMLScriptElement|null;if(!script){script=document.createElement("script");script.src="/motion.js";script.defer=true;script.dataset.bouzidMotion="true";document.body.appendChild(script)}script.addEventListener("load",run,{once:true})},[pathname]);return null}
