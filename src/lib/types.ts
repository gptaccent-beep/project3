export type Locale = "ar" | "en" | "fr"
export type Translation = Record<string, any>
export type Section = { id:string; type:string; visible:boolean; order:number }
export type Product = { id:string; active:boolean; stock:string; price:number; unit:string; images:string[]; translations:Record<Locale,{name:string;short:string;description:string;badge:string;notes:string[]}> }
export type SiteContent = { branding:Record<string,string>; seo:Record<Locale,{title:string;description:string}>; sections:Section[]; copy:Record<Locale,Translation>; products:Product[]; bundles:any[]; promotions:any[]; media:Record<string,string> }
