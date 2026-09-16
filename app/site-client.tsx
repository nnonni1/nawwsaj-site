"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { homeContent } from "@/content/home";
import { trackBusinessEvent } from "@/lib/business-events";
import HomeLeadForm from "./home-lead-form";

function trackCta(label: string, source: string) {
  trackBusinessEvent("cta_clicked", source, { label });
}

const serviceSignals = [
  { code: "PRODUCT / 01", title: "MVP", sub: "FORM → FUNCTION", nodes: ["SCOPE", "UX", "BUILD", "TEST"] },
  { code: "INTELLIGENCE / 02", title: "AI", sub: "INPUT → DECISION", nodes: ["DATA", "AGENT", "FLOW", "OUTPUT"] },
  { code: "PHYSICAL / 03", title: "IoT", sub: "SENSE → CONNECT", nodes: ["SENSOR", "EDGE", "SIGNAL", "DEVICE"] },
] as const;

export default function SiteClient() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(0);

  function followPointer(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    rootRef.current?.style.setProperty("--pointer-x", `${event.clientX}px`);
    rootRef.current?.style.setProperty("--pointer-y", `${event.clientY}px`);
  }

  return <main ref={rootRef} className="signal-site" dir="rtl" id="top" onPointerMove={followPointer}>
    <a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a>
    <div className="pointer-aura" aria-hidden="true" />

    <header className="signal-header">
      <Link className="signal-brand" href="#top" aria-label="Nawwsaj Innovation Lab — أعلى الصفحة"><span className="signal-brand-mark" aria-hidden="true"><i />N</span><span>Nawwsaj <small>INNOVATION LAB</small></span></Link>
      <nav aria-label="التنقل الرئيسي">{homeContent.nav.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav>
      <a className="signal-header-cta" href="#start" onClick={() => trackCta("ابدأ مشروعك", "header")}>ابدأ مشروعك <span aria-hidden="true">↖</span></a>
    </header>

    <section className="signal-hero" aria-labelledby="home-title" id="main-content">
      <div className="hero-atmosphere" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-copy"><p className="signal-kicker"><span /> RIYADH / LAB SIGNAL 24.7136° N</p><h1 id="home-title" aria-label="من الفكرة إلى نموذج يعمل."><span>من الفكرة</span><span>إلى نموذج</span><em>يعمل.</em></h1><div className="hero-lower"><p>معمل ابتكار وتقنيات عميقة في الرياض. نصمم ونبني ونختبر منتجات تقنية تجمع بين البرمجيات، الذكاء الاصطناعي، الإلكترونيات والأنظمة المتصلة.</p><div className="signal-actions"><a className="signal-button is-primary" href="#start" onClick={() => trackCta("ابدأ مشروعك", "hero")}>ابدأ مشروعك <b aria-hidden="true">↖</b></a><a className="signal-button is-ghost" href="#lab" onClick={() => trackCta("استكشف المعمل", "hero")}>استكشف المعمل <b aria-hidden="true">↓</b></a></div></div></div>
      <div className="lab-core" id="hero-core" aria-hidden="true"><div className="core-halo" /><div className="core-ring ring-a" /><div className="core-ring ring-b" /><div className="core-ring ring-c" /><div className="core-ring ring-d" /><div className="core-axis axis-x" /><div className="core-axis axis-y" /><div className="core-planet"><div className="planet-mesh mesh-a" /><div className="planet-mesh mesh-b" /><div className="planet-mesh mesh-c" /><div className="planet-label"><strong>Nawwsaj</strong><small>ENTER THE LAB</small></div></div><span className="core-node node-one">AI</span><span className="core-node node-two">EDGE</span><span className="core-node node-three">IoT</span><span className="core-node node-four">MVP</span></div>
      <div className="hero-telemetry" aria-hidden="true"><span>DESIGN</span><i /><span>BUILD</span><i /><span>TEST</span><i /><span>ITERATE</span></div><div className="scroll-cue" aria-hidden="true"><span>SCROLL TO ENTER</span><i /></div>
    </section>

    <section className="signal-services" id="services" aria-labelledby="services-title">
      <div className="section-orbit-label" aria-hidden="true">01—03 / BUILD MODULES</div>
      <div className="service-story"><div className="service-heading"><p className="signal-kicker">WHAT WE BUILD</p><h2 id="services-title">ماذا يمكننا<br /><span>أن نبني معك؟</span></h2><p>ثلاثة مسارات عملية، تبدأ بفهم المشكلة وتنتهي بنموذج يمكن تجربته وتطويره.</p></div><div className="service-visual-stage" data-active={activeService} aria-hidden="true"><div className="module-schematic"><div className="schematic-orbit" /><div className="schematic-core">{serviceSignals[activeService].title}<small>{serviceSignals[activeService].sub}</small></div>{serviceSignals[activeService].nodes.map((node, index) => <span className={`schematic-node schematic-node-${index + 1}`} key={node}>{node}</span>)}</div><div className="stage-readout"><span>{serviceSignals[activeService].code}</span><b>ACTIVE MODULE</b></div></div></div>
      <div className="service-modules">{homeContent.services.map((service, index) => <article className={activeService === index ? "is-active" : ""} key={service.number} onMouseEnter={() => setActiveService(index)}><button type="button" onClick={() => setActiveService(index)} aria-expanded={activeService === index} aria-controls={`service-panel-${index}`}><span>{service.number}</span><small>{service.eyebrow}</small><h3>{service.title}</h3><i aria-hidden="true">{activeService === index ? "—" : "+"}</i></button><div className="service-module-body" id={`service-panel-${index}`} aria-hidden={activeService !== index}><p>{service.description}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><Link href="/services" onClick={() => trackCta(service.cta, `service_${service.number}`)} tabIndex={activeService === index ? 0 : -1}>{service.cta}<b aria-hidden="true">↖</b></Link></div></article>)}</div>
    </section>

    <section className="signal-process" id="process" aria-labelledby="process-title"><div className="process-sticky"><p className="signal-kicker">THE BUILD SEQUENCE / 02</p><h2 id="process-title">نصمم. نبني.<br />نختبر.</h2></div><ol>{homeContent.process.map((step, index) => <li key={step.number}><div className="process-pulse" aria-hidden="true"><span>{step.number}</span><i /></div><small>{step.en}</small><h3>{step.ar}</h3><p>{step.text}</p><b aria-hidden="true">0{index + 1}</b></li>)}</ol></section>

    <section className="lab-ecosystem" id="lab" aria-labelledby="lab-title"><div className="ecosystem-copy"><p className="signal-kicker">INSIDE NAWWSAJ LAB / 03</p><h2 id="lab-title">بيئة بناء،<br /><span>لا مساحة عروض.</span></h2><p>داخل Nawwsaj Lab تجتمع البرمجيات، الإلكترونيات، الذكاء الاصطناعي والواجهات التفاعلية لبناء النماذج واختبارها عمليًا. ويعمل Nawwsaj OS كطبقة تشغيل داخلية لتنظيم الأدوات والوكلاء وتوثيق التجارب، وليس كمنتج مكتبي للبيع.</p></div><div className="ecosystem-map"><div className="map-lines" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div><div className="map-core"><span>N</span><small>NAWWSAJ LAB</small></div><ul>{homeContent.labCapabilities.map((item, index) => <li className={`map-node map-node-${index + 1}`} key={item}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b><i aria-hidden="true" /></li>)}</ul></div></section>

    <section className="os-chamber" aria-labelledby="os-title"><div className="os-copy"><p className="signal-kicker">INTERNAL OPERATING LAYER / 04</p><h2 id="os-title">Nawwsaj OS</h2><p>نظام داخلي يساعد على تشغيل المعمل وتنظيم الأدوات والوكلاء وتوثيق المشاريع — وليس محور الخدمة التي نبيعها.</p><div className="os-status"><span><i /> LAB ONLINE</span><span>AGENTS / READY</span><span>TOOLS / CONNECTED</span></div></div><div className="os-composition" aria-label="تصور لطبقات Nawwsaj OS داخل المعمل"><div className="os-plane plane-back" aria-hidden="true"><span>SYSTEM MAP</span><i /><i /><i /></div><figure className="os-plane plane-screen"><Image src="/nawwsaj-os-hero.png" alt="واجهة Nawwsaj OS المستخدمة داخليًا في تشغيل المعمل" fill sizes="(max-width: 800px) 92vw, 54vw" /><figcaption>LIVE LAB INTERFACE / INTERNAL</figcaption></figure><div className="os-plane plane-front" aria-hidden="true"><span>BUILD QUEUE</span><b>03</b><small>ACTIVE SYSTEMS</small></div></div></section>

    <section className="suhail-field" id="projects" aria-labelledby="suhail-title"><div className="terrain" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="field-network" aria-hidden="true"><span className="field-node field-a">TX</span><span className="field-node field-b">S</span><span className="field-node field-c">RX</span><i className="wave wave-a" /><i className="wave wave-b" /><i className="wave wave-c" /></div><div className="suhail-field-copy"><p className="signal-kicker">BUILT &amp; TESTED INSIDE NAWWSAJ LAB</p><h2 id="suhail-title">Suhail <span>| سهيل</span></h2><p>منظومة اتصال ميداني مصممة للعمل في البيئات ذات الاتصال الضعيف أو المنقطع، ويتم تطويرها واختبارها داخل Nawwsaj Lab.</p><ul><li>LoRa</li><li>Edge Systems</li><li>Embedded Hardware</li><li>Local communication</li><li>Monitoring</li></ul><Link className="signal-button is-ghost" href="/projects/suhail" onClick={() => trackCta("تابع رحلة بناء سهيل", "featured_project")}>تابع رحلة بناء سهيل <b aria-hidden="true">↖</b></Link></div></section>

    <section className="signal-future" id="resources"><div><p className="signal-kicker">LAB OUTPUT / 05</p><h2>أدوات تساعدك تبدأ</h2></div><div className="future-track"><article><span>01 / RESOURCES</span><h3>أدوات تساعدك تبدأ</h3><p>ملفات وقوالب وأدلة عملية نطوّرها من تجارب المعمل. أول مورد قيد الإعداد.</p><small>IN DEVELOPMENT</small></article><article><span>02 / LEARN</span><h3>تعلّم معنا</h3><p>نوثّق ما نبنيه داخل المعمل، وبعض المشاريع ستتحول لاحقًا إلى تجارب تعليمية ودورات عملية.</p><small>COMING SOON</small></article></div></section>

    <section className="signal-start" id="start" aria-labelledby="start-title"><div className="start-signal" aria-hidden="true"><i /><i /><i /><span>YOUR SIGNAL</span></div><div className="start-copy"><p className="signal-kicker">START A PROJECT / 06</p><h2 id="start-title">عندك فكرة<br /><span>تقنية؟</span></h2><p>خلنا نحوّلها إلى شيء يمكن اختباره.</p><a href="mailto:info@nawwsaj.com?subject=Nawwsaj%20Project%20Inquiry" onClick={() => trackBusinessEvent("contact_request_created", "home_final_cta", { channel: "email" })}>تفضّل التواصل بالبريد؟ <span>info@nawwsaj.com</span></a></div><HomeLeadForm /></section>

    <footer className="signal-footer"><Link className="signal-brand" href="#top"><span className="signal-brand-mark" aria-hidden="true"><i />N</span><span>Nawwsaj</span></Link><span>© 2026 NAWWSAJ INNOVATION LAB</span><div><Link href="/services">الخدمات</Link><Link href="/picks">مختارات نوسج</Link><a href="mailto:info@nawwsaj.com">تواصل</a></div></footer>
  </main>;
}
