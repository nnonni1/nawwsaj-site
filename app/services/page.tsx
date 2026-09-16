import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createWhatsAppUrl, generalWhatsAppMessage, isWhatsAppReady, services } from "@/content/services";
import ServiceRequest from "./service-request";

export const metadata: Metadata = {
  title: "خدمات تطوير MVP والذكاء الاصطناعي وIoT",
  description: "خدمات Nawwsaj Innovation Lab في الرياض لتطوير MVP والنماذج الأولية، AI Automation، وإنترنت الأشياء والأنظمة المضمنة عبر نطاق واضح واختبار عملي.",
  alternates: { canonical: "/services" },
  robots: { index: true, follow: true },
  openGraph: { title: "خدمات تطوير MVP والذكاء الاصطناعي وIoT | Nawwsaj", description: "تطوير منتجات تقنية ونماذج أولية وحلول أتمتة وأنظمة متصلة داخل معمل ابتكار في الرياض.", url: "/services", type: "website", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "خدمات Nawwsaj Innovation Lab" }] },
  twitter: { card: "summary_large_image", title: "خدمات Nawwsaj Innovation Lab", description: "تطوير MVP وAI Automation وIoT في الرياض.", images: ["/og.png"] },
};

function WhatsAppButton({ message, children }: { message: string; children: React.ReactNode }) {
  const href = createWhatsAppUrl(message);
  if (!href) return <span className="service-button is-disabled" role="link" aria-disabled="true" title="سيتم تفعيل واتساب بعد إضافة الرقم الرسمي">{children}<b aria-hidden="true">↖</b></span>;
  return <a className="service-button" href={href} target="_blank" rel="noopener noreferrer">{children}<b aria-hidden="true">↖</b></a>;
}

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://www.nawwsaj.com/" }, { "@type": "ListItem", position: 2, name: "الخدمات", item: "https://www.nawwsaj.com/services" }] },
      ...services.map((service) => ({ "@type": "Service", name: service.title, description: service.description, provider: { "@type": "Organization", name: "Nawwsaj Innovation Lab", url: "https://www.nawwsaj.com/" }, areaServed: { "@type": "Country", name: "Saudi Arabia" }, url: `https://www.nawwsaj.com/services#service-${service.id}` })),
    ],
  };
  return <main className="services-page" dir="rtl">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header className="services-header"><Link className="brand" href="/" aria-label="العودة إلى الصفحة الرئيسية"><span className="brand-mark" aria-hidden="true">N</span><span>Nawwsaj</span></Link><nav aria-label="التنقل الرئيسي"><Link href="/">الرئيسية</Link><Link href="/picks">المختارات</Link><a href="#faq">الأسئلة</a></nav></header>
    <section className="services-hero"><p className="section-label">خدمات نوسج / ENGINEERING SERVICES</p><h1>نبني الخطوة التي تثبت الفكرة.</h1><p className="services-lead">من تطوير MVP والنماذج الأولية إلى AI Automation والأنظمة المتصلة، نبدأ بفهم الاحتياج وتحديد نطاق يمكن بناؤه واختباره.</p><p className="services-review-note">تُراجع جميع الطلبات قبل قبولها، ويُحدد السعر والمدة حسب نطاق العمل. إرسال الطلب لا يعني بدء التنفيذ أو قبوله تلقائيًا.</p><div className="services-disciplines" aria-label="مجالات العمل"><span>Rapid Prototyping</span><span>AI Automation</span><span>IoT Development</span><span>Embedded Systems</span></div></section>
    <section className="services-list" aria-label="خدمات نوسج">{services.map((service) => <article className="service-card" id={`service-${service.id}`} key={service.number}><div className="service-visual" style={{ position: "relative" }}><Image src={service.image} alt={service.imageAlt} fill priority={service.number === "01"} sizes="(max-width: 980px) 100vw, 33vw" /></div><div className="service-card-top"><span>{service.number}</span><strong>{service.price}</strong></div><h2>{service.title}</h2>{service.duration && <p className="service-duration">المدة: {service.duration}</p>}<p className="service-description">{service.description}</p><strong className="service-includes-label">{service.includesLabel}</strong><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul><p className="service-note">{service.note}</p><ServiceRequest serviceId={service.id} serviceTitle={service.title} /></article>)}</section>
    {!isWhatsAppReady && <p className="whatsapp-pending" role="status">سيتم تفعيل أزرار واتساب بعد إضافة الرقم الرسمي.</p>}
    <section className="services-process"><p className="section-label">الخطوات / PROCESS</p><h2>من الاحتياج إلى نطاق قابل للتنفيذ</h2><ol><li><span>01</span><h3>نفهم السياق</h3><p>ترسل تفاصيل المشروع أو العملية والنتيجة التي تريد الوصول إليها.</p></li><li><span>02</span><h3>نحدد النطاق</h3><p>نراجع الاحتياج ونحدد الأولويات والتقنيات والسعر والمدة المتوقعة.</p></li><li><span>03</span><h3>نبدأ بوضوح</h3><p>بعد الاتفاق، نحدد الجلسة أو مرحلة البناء والاختبار ومخرجاتها.</p></li></ol></section>
    <section className="services-faq" id="faq"><p className="section-label">الأسئلة / FAQ</p><h2>أسئلة مختصرة</h2><div className="services-faq-grid"><article><h3>هل إرسال الطلب يعني قبوله؟</h3><p>لا. تتم مراجعة الطلب والتأكد من ملاءمته وإمكانية تنفيذه قبل القبول.</p></article><article><h3>كيف يتم الدفع؟</h3><p>بعد الاتفاق على الخدمة والنطاق، يُرسل للعميل رابط دفع أو فاتورة إلكترونية.</p></article><article><h3>هل الأسعار ثابتة؟</h3><p>سعر جلسة التقييم ثابت، أما خدمات الأوتوميشن وبناء MVP فتُسعّر حسب النطاق.</p></article><article><h3>هل تقدمون تنفيذًا كاملًا لكل الأفكار؟</h3><p>لا. تُقبل المشاريع المناسبة لقدرات المعمل والوقت المتاح فقط.</p></article></div></section>
    <section className="services-cta"><p className="section-label">تواصل / CONTACT</p><h2>لديك فكرة أو عملية تحتاج إلى تطوير؟</h2><p>أرسل التفاصيل الأساسية، وسنحدد معك الخطوة الأنسب قبل البدء.</p><WhatsAppButton message={generalWhatsAppMessage}>تواصل عبر واتساب</WhatsAppButton></section>
    <footer className="services-footer"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">N</span><span>Nawwsaj</span></Link><span>© 2026 Nawwsaj Lab</span><Link href="/">الرئيسية</Link></footer>
  </main>;
}
