import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سهيل | مشروع يُبنى داخل Nawwsaj Lab",
  description: "منظومة اتصال ميداني للبيئات ذات الاتصال الضعيف أو المنقطع، قيد التطوير والاختبار داخل Nawwsaj Lab.",
  alternates: { canonical: "https://www.nawwsaj.com/projects/suhail" },
};

export default function SuhailPage() {
  return <main className="project-placeholder" dir="rtl"><div className="project-placeholder-shell"><p className="section-label">BUILT INSIDE NAWWSAJ LAB</p><div className="suhail-node" aria-hidden="true">S</div><h1>Suhail <span>| سهيل</span></h1><p>منظومة اتصال ميداني مصممة للعمل في البيئات ذات الاتصال الضعيف أو المنقطع. رحلة البناء والتوثيق ستتوفر هنا قريبًا.</p><div className="project-tags"><span>LoRa</span><span>Edge systems</span><span>Embedded hardware</span><span>Local communication</span><span>Monitoring</span></div><Link className="button secondary" href="/">العودة إلى المعمل <b aria-hidden="true">↙</b></Link></div></main>;
}
