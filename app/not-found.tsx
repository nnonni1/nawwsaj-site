import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "الصفحة غير موجودة", robots: { index: false, follow: true } };

export default function NotFound() {
  return <main className="not-found" dir="rtl"><div><p className="section-label">ERROR / 404</p><strong aria-hidden="true">404</strong><h1>هذه الصفحة غير موجودة.</h1><p>يمكنك العودة إلى Nawwsaj Innovation Lab أو استعراض الخدمات الحالية.</p><div className="actions"><Link className="button primary" href="/">العودة للرئيسية</Link><Link className="button secondary" href="/services">استعرض الخدمات</Link></div></div></main>;
}
