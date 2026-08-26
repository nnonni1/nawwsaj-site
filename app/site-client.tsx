"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Language, siteContent } from "@/content/site";

const seo = {
  en: { title: "Nawwsaj OS | Intelligent Operating System for Innovation Environments", description: "Nawwsaj OS connects AI agents, devices, automation, and interactive tools in one innovation workspace." },
  ar: { title: "Nawwsaj OS | نظام تشغيل ذكي للبيئات الابتكارية", description: "يجمع Nawwsaj OS وكلاء الذكاء الاصطناعي والأجهزة المتصلة والأتمتة والأدوات التفاعلية ضمن بيئة ابتكارية واحدة." },
};

function readSavedLanguage(): Language | null {
  try {
    const saved = window.localStorage?.getItem("nawwsaj-language");
    if (saved === "en" || saved === "ar") return saved;
  } catch { /* Privacy modes may disable storage. */ }
  const savedCookie = document.cookie.match(/(?:^|; )nawwsaj-language=(en|ar)/)?.[1];
  return savedCookie === "en" || savedCookie === "ar" ? savedCookie : null;
}

function saveLanguage(language: Language) {
  try { window.localStorage?.setItem("nawwsaj-language", language); } catch { /* Cookie fallback below. */ }
  document.cookie = `nawwsaj-language=${language}; path=/; max-age=31536000; SameSite=Lax`;
}

export default function SiteClient() {
  const [language, setLanguage] = useState<Language>("en");
  const [storageReady, setStorageReady] = useState(false);
  const t = siteContent[language];
  const arrow = language === "ar" ? "↖" : "↗";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = readSavedLanguage();
      if (saved) setLanguage(saved);
      setStorageReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    document.documentElement.lang = language;
    document.documentElement.dir = t.dir;
    const applyMetadata = () => {
      document.title = seo[language].title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", seo[language].description);
    };
    applyMetadata();
    const metadataTimer = window.setTimeout(applyMetadata, 100);
    saveLanguage(language);
    return () => window.clearTimeout(metadataTimer);
  }, [language, storageReady, t.dir]);

  return (
    <main id="top" className={`site-shell ${language === "ar" ? "is-rtl" : ""}`} dir={t.dir} data-lang={language}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Nawwsaj"><span className="brand-mark">N</span><span>Nawwsaj</span></a>
        <nav aria-label={language === "ar" ? "التنقل الرئيسي" : "Main navigation"}>{t.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={language === "ar" ? "اختيار اللغة" : "Language selector"}>
            <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"} aria-label="Switch to English">EN</button><span>|</span>
            <button type="button" onClick={() => setLanguage("ar")} aria-pressed={language === "ar"} aria-label="التبديل إلى العربية">AR</button>
          </div>
          <a className="header-cta" href={t.contact.primaryHref}>{t.headerCta}</a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="signal"><span />{t.statusLine}</p>
          <h1 id="hero-title">Nawwsaj <span>OS</span></h1>
          <h2>{t.hero.headline}</h2><p>{t.hero.supporting}</p>
          <div className="actions"><a className="button primary" href="#product">{t.hero.primary}<b>{arrow}</b></a><a className="button secondary" href="#lab">{t.hero.secondary}<b>{arrow}</b></a></div>
        </div>
        <div className="hero-visual"><Image src="/nawwsaj-os-hero.png" width={1536} height={1024} priority alt={language === "ar" ? "Nawwsaj OS — نظام تشغيل ذكي للبيئات الابتكارية" : "Nawwsaj OS — intelligent operating system for innovation environments"} /></div>
        <div className="hero-foot">{t.hero.foot.map((item, index) => <span key={item}>{index > 0 && <i />} {item}</span>)}</div>
      </section>

      <section className="section intro-section" id="product"><div><p className="section-label">{t.intro.label}</p><h2>{t.intro.title}</h2></div><div className="intro-copy"><p>{t.intro.copy}</p><div className="process">{t.intro.process.map((item, i) => <span key={item}><b>{String(i + 1).padStart(2, "0")}</b>{item}{i < t.intro.process.length - 1 && <em>{language === "ar" ? "←" : "→"}</em>}</span>)}</div><p>{t.intro.goal}</p></div></section>

      <section className="section core-section"><p className="section-label">{t.core.label}</p><h2>{t.core.titleA}<br /><span>{t.core.titleB}</span></h2><div className="feature-grid">{t.core.items.map((item, i) => <article className="feature-card" key={item.title}><span className="feature-number">0{i + 1}</span><span className="feature-icon" aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>

      <section className="section interface-section"><div className="media-heading"><div><p className="section-label">{t.spatial.label}</p><h2 dir="auto">{t.spatial.title}</h2></div><p>{t.spatial.description}</p></div><a className="product-frame" href="/nawwsaj-spatial-home.png" target="_blank"><span>{t.spatial.open}</span><Image src="/nawwsaj-spatial-home.png" width={1904} height={848} alt={t.spatial.title} /></a></section>

      <section className="section workbench-section"><div className="workbench-copy"><p className="section-label">{t.workbench.label}</p><h2 dir="auto">{t.workbench.title}</h2><p className="lead">{t.workbench.description}</p><p>{t.workbench.supporting}</p><span className="dev-tag">{t.workbench.status}</span></div><div className="workbench-media"><Image src="/interactive-workbench.png" width={1882} height={870} alt={t.workbench.title} /></div></section>

      <section className="section environment-section"><div className="environment-intro"><p className="section-label">{t.environment.label}</p><h2>{t.environment.title}</h2><p>{t.environment.intro}</p></div><div className="system-diagram" aria-label={t.environment.title}>{t.environment.diagram.map((node, i) => <div className="diagram-step" key={node}><div className={`system-node ${i === 1 ? "active" : ""}`} dir="auto">{node}</div>{i < t.environment.diagram.length - 1 && <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>}</div>)}</div><div className="environment-grid">{t.environment.features.map((item, i) => <article key={item.title}><span>0{i + 1}</span><h3 dir="auto">{item.title}</h3><p>{item.description}</p>{"examples" in item && <ul>{item.examples.map((x) => <li key={x}>{x}</li>)}</ul>}</article>)}</div><blockquote>{t.environment.statement}</blockquote></section>

      <section className="section use-section"><div className="use-copy"><p className="section-label">{t.uses.label}</p><h2>{t.uses.title}</h2><p>{t.uses.intro}</p></div><ul className="use-list">{t.uses.items.map((item) => <li key={item}><span>◇</span>{item}</li>)}</ul></section>

      <section className="section lab-section" id="lab"><div className="lab-copy"><div><p className="section-label">{t.lab.label}</p><h2>{t.lab.title}</h2></div><p>{t.lab.copy}</p></div><div className="lab-gallery media-only"><figure><Image src="/nawwsaj-spatial-home.png" width={1904} height={848} alt={t.lab.captionA} /><figcaption>{t.lab.captionA}</figcaption></figure><figure><Image src="/interactive-workbench.png" width={1882} height={870} alt={t.lab.captionB} /><figcaption>{t.lab.captionB}</figcaption></figure></div></section>

      <section className="section builds-section"><div className="section-title-row"><div><p className="section-label">{t.builds.label}</p><h2>{t.builds.title}</h2></div><p>{t.builds.intro}</p></div><div className="build-list">{t.builds.items.map((item, i) => <article key={item.title}><span>0{i + 1}</span><div><h3 dir="auto">{item.title}</h3><p>{item.description}</p></div>{"status" in item && <strong>{item.status}</strong>}</article>)}</div></section>

      <section className="section builder-section"><article className="builder-card"><p className="section-label">{t.builder.label}</p><h2>{t.builder.title}</h2><div className="builder-copy"><p>{t.builder.primary}</p><p>{t.builder.secondary}</p></div></article><article className="achievement-card"><p className="section-label">{t.achievements.title}</p><div className="achievements">{t.achievements.items.map((item) => <div key={`${item.place}-${item.event}`}><strong>{item.place}</strong><span dir="auto">{item.event}</span></div>)}</div><p>{t.achievements.note}</p></article></section>

      <section className="section status-section"><div className="status-pulse" aria-hidden="true"><span /></div><div><p className="section-label">{t.current.label}</p><h2>{t.current.main}<br /><span>{t.current.secondary}</span></h2><p>{t.current.description}</p></div></section>
      <section className="section vision-section"><p className="section-label">{t.vision.label}</p><h2>{t.vision.statement}</h2></section>
      <section className="section contact-section" id="contact"><p className="section-label">{t.contact.label}</p><h2>{t.contact.titleA}<br /><span>{t.contact.titleB}</span></h2><p>{t.contact.supporting}</p><div className="actions"><a className="button primary" href={t.contact.primaryHref}>{t.contact.primaryCta}<b>{arrow}</b></a><a className="button secondary" href={t.contact.secondaryHref}>{t.contact.secondaryCta}<b>{arrow}</b></a></div><div className="contact-meta"><a href={`mailto:${t.contact.generalEmail}`}>{t.contact.generalEmail}</a><a href={`mailto:${t.contact.partnershipsEmail}`}>{t.contact.partnershipsEmail}</a><a href="https://nawwsaj.com">{t.contact.website}</a></div></section>
      <footer><a className="brand" href="#top"><span className="brand-mark">N</span><span>Nawwsaj</span></a><span>{t.footer.copyright} · <a href="/picks">{language === "ar" ? "مختارات نوّسج" : "Nawwsaj Picks"}</a></span><a href="#top">{t.footer.back}</a></footer>
    </main>
  );
}
