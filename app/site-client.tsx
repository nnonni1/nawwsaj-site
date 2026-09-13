"use client";

import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { trackBusinessEvent } from "@/lib/business-events";
import HomeLeadForm from "./home-lead-form";

function trackCta(label: string, source: string) {
  trackBusinessEvent("cta_clicked", source, { label });
}

export default function SiteClient() {
  return <main className="lab-home" dir="rtl" id="top">
    <header className="lab-header">
      <Link className="brand" href="#top" aria-label="Nawwsaj Innovation Lab — أعلى الصفحة"><span className="brand-mark" aria-hidden="true">N</span><span>Nawwsaj <small>INNOVATION LAB</small></span></Link>
      <nav aria-label="التنقل الرئيسي">{homeContent.nav.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav>
      <a className="header-cta" href="#start" onClick={() => trackCta("ابدأ مشروعك", "header")}>ابدأ مشروعك</a>
    </header>

    <section className="lab-hero" aria-labelledby="home-title">
      <div className="lab-hero-grid" aria-hidden="true" />
      <div className="lab-hero-copy"><p className="signal"><span /> NAWWSAJ INNOVATION LAB</p><h1 id="home-title">من الفكرة إلى<br /><span>نموذج يعمل.</span></h1><p>نصمم ونبني ونختبر نماذج تقنية قابلة للتجربة — من MVP وأنظمة AI والأتمتة إلى IoT والنماذج المضمنة.</p><div className="actions"><a className="button primary" href="#start" onClick={() => trackCta("ابدأ مشروعك", "hero")}>ابدأ مشروعك <b aria-hidden="true">↖</b></a><a className="button secondary" href="#lab" onClick={() => trackCta("استكشف المعمل", "hero")}>استكشف المعمل <b aria-hidden="true">↓</b></a></div><div className="lab-method" aria-label="منهج العمل"><span>DESIGN</span><i>→</i><span>BUILD</span><i>→</i><span>TEST</span><i>→</i><span>ITERATE</span></div></div>
      <div className="lab-hero-visual"><Image src="/interactive-workbench.png" alt="مساحة العمل التفاعلية داخل Nawwsaj Innovation Lab" fill priority sizes="(max-width: 900px) 100vw, 48vw" /><span>PHYSICAL × DIGITAL</span></div>
    </section>

    <section className="lab-section lab-services" id="services">
      <div className="lab-section-heading"><div><p className="section-label">01 / WHAT WE BUILD</p><h2>ماذا يمكننا أن نبني معك؟</h2></div><p>ثلاثة مسارات عملية، تبدأ بفهم المشكلة وتنتهي بنموذج يمكن تجربته وتطويره.</p></div>
      <div className="lab-service-grid">{homeContent.services.map((service) => <article className="lab-service-card" key={service.number}><div className="lab-card-index"><span>{service.number}</span><small>{service.eyebrow}</small></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><Link href="/services" onClick={() => trackCta(service.cta, `service_${service.number}`)}>{service.cta}<b aria-hidden="true">↖</b></Link></article>)}</div>
    </section>

    <section className="lab-section lab-process" id="process"><p className="section-label">02 / HOW WE WORK</p><h2>نصمم. نبني. نختبر.</h2><ol>{homeContent.process.map((step) => <li key={step.number}><span>{step.number}</span><small>{step.en}</small><h3>{step.ar}</h3><p>{step.text}</p></li>)}</ol></section>

    <section className="lab-section lab-inside" id="lab">
      <div className="lab-inside-copy"><p className="section-label">03 / INSIDE NAWWSAJ LAB</p><h2>معمل حقيقي للتجريب والبناء.</h2><p>لا نتوقف عند تقديم الأفكار. داخل Nawwsaj Lab تجتمع البرمجيات، الإلكترونيات، الذكاء الاصطناعي والواجهات التفاعلية لبناء نماذج واختبارها عمليًا.</p><div className="lab-capabilities">{homeContent.labCapabilities.map((item) => <span key={item}>{item}</span>)}</div></div>
      <figure className="lab-inside-media"><Image src="/nawwsaj-os-hero.png" alt="Nawwsaj OS المستخدم لتنظيم بيئة المعمل" fill sizes="(max-width: 900px) 100vw, 52vw" /><figcaption><strong>Nawwsaj OS</strong><span>نظام داخلي يساعد على تشغيل المعمل وتنظيم الأدوات والوكلاء وتوثيق المشاريع — وليس محور الخدمة التي نبيعها.</span></figcaption></figure>
    </section>

    <section className="lab-section lab-project" id="projects">
      <div className="suhail-visual" aria-hidden="true"><div className="suhail-node">S</div><i /><i /><i /><span>FIELD COMMUNICATION / EDGE SYSTEM</span></div>
      <div className="suhail-copy"><p className="section-label">04 / BUILT INSIDE NAWWSAJ LAB</p><h2>Suhail <span>| سهيل</span></h2><p>منظومة اتصال ميداني مصممة للعمل في البيئات ذات الاتصال الضعيف أو المنقطع، ويتم تطويرها واختبارها داخل Nawwsaj Lab.</p><ul><li>LoRa</li><li>Edge systems</li><li>Embedded hardware</li><li>Local communication</li><li>Monitoring</li></ul><Link className="button secondary" href="/projects/suhail" onClick={() => trackCta("تابع رحلة بناء سهيل", "featured_project")}>تابع رحلة بناء سهيل <b aria-hidden="true">↖</b></Link></div>
    </section>

    <section className="lab-section lab-future" id="resources">
      <div className="future-card"><p className="section-label">05 / RESOURCES</p><h2>أدوات تساعدك تبدأ</h2><p>ملفات وقوالب وأدلة عملية نطوّرها من تجارب المعمل. أول مورد قيد الإعداد.</p><div className="future-status"><span>COMING SOON</span><small>Free downloads · Templates · Guides · Paid files</small></div></div>
      <div className="future-card"><p className="section-label">06 / LEARN WITH NAWWSAJ</p><h2>تعلّم معنا</h2><p>نوثّق ما نبنيه داخل المعمل، وبعض المشاريع ستتحول لاحقًا إلى تجارب تعليمية ودورات عملية.</p><span className="button secondary" aria-disabled="true">قائمة الانتظار — قريبًا</span></div>
    </section>

    <section className="lab-section lab-start" id="start">
      <div className="lab-start-copy"><p className="section-label">07 / START A PROJECT</p><h2>عندك فكرة تقنية؟</h2><p>خلنا نحوّلها إلى شيء يمكن اختباره.</p><a href="mailto:info@nawwsaj.com?subject=Nawwsaj%20Project%20Inquiry" onClick={() => trackBusinessEvent("contact_request_created", "home_final_cta", { channel: "email" })}>تفضّل التواصل بالبريد؟ <span>info@nawwsaj.com</span></a></div><HomeLeadForm />
    </section>

    <footer className="lab-footer"><Link className="brand" href="#top"><span className="brand-mark" aria-hidden="true">N</span><span>Nawwsaj</span></Link><span>© 2026 Nawwsaj Innovation Lab</span><div><Link href="/services">الخدمات</Link><Link href="/picks">مختارات نوسج</Link><a href="mailto:info@nawwsaj.com">تواصل معنا</a></div></footer>
  </main>;
}
