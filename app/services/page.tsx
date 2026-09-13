import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createWhatsAppUrl, generalWhatsAppMessage, isWhatsAppReady, services } from "@/content/services";
import ServiceRequest from "./service-request";

export const metadata: Metadata = {
  title: "خدمات نوسج | تقييم المشاريع والأوتوميشن وبناء MVP",
  description: "خدمات نوسج لتقييم وتطوير المشاريع، بناء حلول الأتمتة، وتحويل الأفكار إلى نماذج أولية قابلة للاختبار.",
  alternates: { canonical: "https://www.nawwsaj.com/services" },
  robots: { index: true, follow: true },
  openGraph: { title: "خدمات نوسج | تقييم المشاريع والأوتوميشن وبناء MVP", description: "خدمات نوسج لتقييم وتطوير المشاريع، بناء حلول الأتمتة، وتحويل الأفكار إلى نماذج أولية قابلة للاختبار.", url: "https://www.nawwsaj.com/services", type: "website" },
};

function WhatsAppButton({ message, children }: { message: string; children: React.ReactNode }) {
  const href = createWhatsAppUrl(message);
  if (!href) return <span className="service-button is-disabled" role="link" aria-disabled="true" title="سيتم تفعيل واتساب بعد إضافة الرقم الرسمي">{children}<b aria-hidden="true">↖</b></span>;
  return <a className="service-button" href={href} target="_blank" rel="noopener noreferrer">{children}<b aria-hidden="true">↖</b></a>;
}

export default function ServicesPage() {
  return <main className="services-page" dir="rtl">
    <header className="services-header"><Link className="brand" href="/" aria-label="العودة إلى الصفحة الرئيسية"><span className="brand-mark" aria-hidden="true">N</span><span>Nawwsaj</span></Link><nav aria-label="التنقل الرئيسي"><Link href="/">الرئيسية</Link><Link href="/picks">المختارات</Link><a href="#faq">الأسئلة</a></nav></header>
    <section className="services-hero"><p className="section-label">خدمات نوسج / SERVICES</p><h1>نحوّل فكرتك إلى خطوة عملية</h1><p className="services-lead">خدمات عملية لأصحاب الأفكار والمشاريع، تبدأ بفهم الاحتياج وتحديد النطاق قبل التنفيذ.</p><p className="services-review-note">تُراجع جميع الطلبات قبل قبولها، ويُحدد السعر والمدة حسب نطاق العمل. إرسال الطلب لا يعني بدء التنفيذ أو قبوله تلقائيًا.</p></section>
    <section className="services-list" aria-label="خدمات نوسج">{services.map((service) => <article className="service-card" key={service.number}><div className="service-visual" style={{ position: "relative" }}><Image src={service.image} alt={service.imageAlt} fill priority={service.number === "01"} sizes="(max-width: 980px) 100vw, 33vw" /></div><div className="service-card-top"><span>{service.number}</span><strong>{service.price}</strong></div><h2>{service.title}</h2>{service.duration && <p className="service-duration">المدة: {service.duration}</p>}<p className="service-description">{service.description}</p><strong className="service-includes-label">{service.includesLabel}</strong><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul><p className="service-note">{service.note}</p><ServiceRequest serviceId={service.id} serviceTitle={service.title} /></article>)}</section>
    {!isWhatsAppReady && <p className="whatsapp-pending" role="status">سيتم تفعيل أزرار واتساب بعد إضافة الرقم الرسمي.</p>}
    <section className="services-process"><p className="section-label">الخطوات / PROCESS</p><h2>كيف تبدأ؟</h2><ol><li><span>01</span><p>اختر الخدمة المناسبة وأرسل تفاصيل الطلب عبر واتساب.</p></li><li><span>02</span><p>نراجع الاحتياج ونحدد النطاق والسعر والمدة.</p></li><li><span>03</span><p>بعد الموافقة والدفع، نحدد موعد الجلسة أو نبدأ التنفيذ.</p></li></ol></section>
    <section className="services-faq" id="faq"><p className="section-label">الأسئلة / FAQ</p><h2>أسئلة مختصرة</h2><div className="services-faq-grid"><article><h3>هل إرسال الطلب يعني قبوله؟</h3><p>لا. تتم مراجعة الطلب والتأكد من ملاءمته وإمكانية تنفيذه قبل القبول.</p></article><article><h3>كيف يتم الدفع؟</h3><p>بعد الاتفاق على الخدمة والنطاق، يُرسل للعميل رابط دفع أو فاتورة إلكترونية.</p></article><article><h3>هل الأسعار ثابتة؟</h3><p>سعر جلسة التقييم ثابت، أما خدمات الأوتوميشن وبناء MVP فتُسعّر حسب النطاق.</p></article><article><h3>هل تقدمون تنفيذًا كاملًا لكل الأفكار؟</h3><p>لا. تُقبل المشاريع المناسبة لقدرات المعمل والوقت المتاح فقط.</p></article></div></section>
    <section className="services-cta"><p className="section-label">تواصل / CONTACT</p><h2>لديك فكرة أو عملية تحتاج إلى تطوير؟</h2><p>أرسل التفاصيل الأساسية، وسنحدد معك الخطوة الأنسب قبل البدء.</p><WhatsAppButton message={generalWhatsAppMessage}>تواصل عبر واتساب</WhatsAppButton></section>
    <footer className="services-footer"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">N</span><span>Nawwsaj</span></Link><span>© 2026 Nawwsaj Lab</span><Link href="/">الرئيسية</Link></footer>
  </main>;
}
