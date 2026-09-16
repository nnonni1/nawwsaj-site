import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import "./brand.css";
const arabic = localFont({ src: [{ path: "../public/fonts/plex-arabic-400.woff2", weight: "400" }, { path: "../public/fonts/plex-arabic-600.woff2", weight: "600" }, { path: "../public/fonts/plex-arabic-700.woff2", weight: "700" }], display: "swap", variable: "--font-arabic" });
const mono = localFont({ src: "../public/fonts/plex-mono-400.woff2", weight: "400", display: "swap", variable: "--font-technical" });
const title = "Nawwsaj Innovation Lab | تطوير MVP والذكاء الاصطناعي وIoT في الرياض";
const description = "معمل ابتكار تقني في الرياض يطوّر النماذج الأولية وMVP وحلول AI Automation وIoT والأنظمة المضمنة، من الفكرة إلى نموذج يعمل وقابل للاختبار.";
export const metadata:Metadata={metadataBase:new URL("https://www.nawwsaj.com"),title:{default:title,template:"%s | Nawwsaj Innovation Lab"},description,applicationName:"Nawwsaj Innovation Lab",alternates:{canonical:"/"},keywords:["Nawwsaj Innovation Lab","تطوير MVP","تطوير النماذج الأولية","Innovation Lab Saudi Arabia","AI Automation Saudi Arabia","IoT Development Saudi Arabia","Embedded Systems Saudi Arabia","Rapid Prototyping","تطوير منتجات تقنية","Riyadh technology innovation"],robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},openGraph:{title,description,url:"/",siteName:"Nawwsaj Innovation Lab",type:"website",locale:"ar_SA",images:[{url:"/og.png",width:1536,height:1024,alt:"Nawwsaj Innovation Lab — معمل ابتكار وتقنيات عميقة"}]},twitter:{card:"summary_large_image",title,description,images:["/og.png"]},icons:{icon:"/logo.png",shortcut:"/logo.png",apple:"/logo.png"},category:"technology"};
export const viewport:Viewport={themeColor:"#05070c",colorScheme:"dark"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl" className={`${arabic.variable} ${mono.variable}`} suppressHydrationWarning><body>{children}</body></html>}
