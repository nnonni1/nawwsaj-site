import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { picks } from "@/content/picks";

const picksTitle = "مختارات نوسج | أفضل أجهزة للبرمجة والذكاء الاصطناعي والعمل";
const picksDescription = "مختارات أجهزة للبرمجة، التجارة الإلكترونية، الذكاء الاصطناعي المحلي، صناعة المحتوى و3D. مقارنة عملية بين Mini PC، لابتوبات، شاشات وكاميرات مختارة بعناية.";
const picksUrl = "https://www.nawwsaj.com/picks";
const faqItems = [
  {
    question: "هل Mini PC مناسب للبرمجة؟",
    answer: "نعم، أجهزة Mini PC الحديثة بذاكرة 32GB ومعالج Ryzen 7 أو Core i9 مناسبة جدًا للبرمجة، Docker، الخوادم المحلية وتعدد المهام.",
  },
  {
    question: "هل أحتاج RTX لتشغيل الذكاء الاصطناعي محليًا؟",
    answer: "ليس دائمًا. النماذج الصغيرة يمكن تشغيلها على CPU وRAM، لكن RTX يصبح مهمًا عند تشغيل نماذج أكبر، توليد الصور، CUDA والرندر.",
  },
  {
    question: "هل 32GB RAM مهمة للبرمجة؟",
    answer: "ليست ضرورية لكل شخص، لكنها مفيدة جدًا إذا كنت تستخدم Docker، VMs، أدوات تطوير متعددة، متصفحًا ثقيلًا أو نماذج AI محلية.",
  },
  {
    question: "QHD أم 4K للبرمجة؟",
    answer: "QHD على شاشة 27 بوصة عادة يقدم توازنًا ممتازًا بين وضوح النصوص، مساحة العمل والأداء بدون الحاجة إلى GPU قوي.",
  },
];

export const metadata: Metadata = {
  title: { absolute: picksTitle },
  description: picksDescription,
  alternates: { canonical: picksUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: picksTitle,
    description: picksDescription,
    url: picksUrl,
    type: "website",
    siteName: "Nawwsaj",
    locale: "ar_SA",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "مختارات نوسج للأجهزة التقنية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: picksTitle,
    description: picksDescription,
    images: ["/og.png"],
  },
};

export default function PicksPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مختارات نوسج",
    itemListElement: picks.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.tagline,
        image: `https://www.nawwsaj.com${product.imageUrl}`,
        url: product.affiliateUrl,
      },
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="picks-page" dir="rtl" lang="ar">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header className="picks-header">
        <Link className="brand" href="/">
          <span className="brand-mark">N</span>
          <span>Nawwsaj</span>
        </Link>
        <nav aria-label="التنقل">
          <Link href="/go">روابط نوسج</Link>
          <Link href="/">الموقع الرئيسي</Link>
        </nav>
      </header>

      <section className="picks-intro">
        <p className="section-label">NAWWSAJ PICKS / 01</p>
        <h1>مختارات نوسج</h1>
        <p className="picks-lead">
          دليل عملي يضم أفضل أجهزة للبرمجة، وMini PC للبرمجة وتشغيل AI Agents، ولابتوبات
          للتجارة الإلكترونية والـ3D وAI، وشاشات QHD مختارة للعمل وصناعة المحتوى. بعض المنتجات
          جُرّبت فعليًا في نوسج، وبعضها تم اختياره بناءً على المواصفات والقيمة مقابل السعر.
        </p>
      </section>

      <section className="picks-grid" aria-label="المنتجات المختارة">
        {picks.map((product, index) => (
          <article className="pick-card" key={product.name}>
            <div className="pick-image">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} — ${product.tagline}`}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              ) : (
                <div
                  className="image-placeholder"
                  aria-label={`لا تتوفر صورة موثوقة لـ ${product.name}`}
                >
                  <span>N</span>
                  <small>PRODUCT IMAGE</small>
                </div>
              )}
            </div>
            <div className="pick-topline">
              <span>
                {String(index + 1).padStart(2, "0")} / {product.category}
              </span>
              <strong className={product.tried ? "tried-badge" : "pick-badge"}>
                {product.badge}
              </strong>
            </div>
            <h2 dir="auto">{product.name}</h2>
            <h3 className="pick-tagline">{product.tagline}</h3>
            <div className="pick-description">
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <strong className="pick-list-label">{product.listLabel}</strong>
            <ul className="pick-highlights">
              {product.highlights.map((highlight) => (
                <li key={highlight} dir="auto">
                  {highlight}
                </li>
              ))}
            </ul>
            {product.note && <p className="pick-note">{product.note}</p>}
            {product.specs.length > 0 && (
              <div className="pick-specs">
                <strong>المواصفات:</strong>
                <ul>
                {product.specs.map((spec) => (
                  <li key={spec} dir="auto">
                    {spec}
                  </li>
                ))}
                </ul>
              </div>
            )}
            <a
              className="pick-link"
              href={product.affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
            >
              عرض المنتج <span aria-hidden="true">↖</span>
            </a>
          </article>
        ))}
      </section>

      <section className="picks-faq" aria-labelledby="picks-faq-title">
        <p className="section-label">FAQ / 04</p>
        <h2 id="picks-faq-title">أسئلة شائعة</h2>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="affiliate-note picks-disclosure" aria-label="إفصاح التسويق بالعمولة">
        قد تحتوي هذه الصفحة على روابط تسويق بالعمولة. قد نحصل على عمولة عند الشراء من خلال بعض
        الروابط دون تكلفة إضافية عليك.
      </aside>

      <footer className="picks-footer">
        <Link className="brand" href="/">
          <span className="brand-mark">N</span>
          <span>Nawwsaj</span>
        </Link>
        <span>© 2026 Nawwsaj</span>
        <Link href="/go">روابط نوسج</Link>
      </footer>
    </main>
  );
}
