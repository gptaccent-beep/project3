export type Locale = "ar" | "en" | "fr"
export type Translation = Record<string, any>
export type Section = { id:string; type:string; visible:boolean; order:number }
export type ProductRecord = { id:string; active:boolean; stock:string; price:number; unit:string; category:string; images:string[]; translations:Record<Locale,{name:string;short:string;description:string;badge:string;notes:string[]}> }
export type Category = {id:string;translations:Record<Locale,string>}
export type SiteContent = { branding:Record<string,string>; seo:Record<Locale,{title:string;description:string}>; sections:Section[]; copy:Record<Locale,Translation>; products:ProductRecord[]; categories:Category[]; bundles:any[]; promotions:any[]; media:Record<string,string>; settings:{whatsappNumber:string;currency:string;deliveryNote:Record<Locale,string>;contact:{email:string;phone:string;address:Record<Locale,string>;hours:Record<Locale,string>;instagram?:string;facebook?:string}} }
