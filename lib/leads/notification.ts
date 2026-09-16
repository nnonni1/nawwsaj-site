import type { Lead } from "./types.ts";

const NOTIFICATION_RECIPIENT = "afnan.aldohime@gmail.com";
const DEFAULT_FROM = "Nawwsaj Lab <onboarding@resend.dev>";

type FetchLike = typeof fetch;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

function detail(label: string, value: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:10px 0;color:#64748b;width:150px;vertical-align:top">${label}</td><td style="padding:10px 0;color:#0f172a;vertical-align:top">${escapeHtml(value)}</td></tr>`;
}

export function buildLeadNotificationEmail(lead: Lead) {
  const subject = `طلب جديد عبر Nawwsaj Lab — ${lead.requestedService}`;
  const html = `<!doctype html><html dir="rtl" lang="ar"><body style="margin:0;background:#f4f7f9;font-family:Arial,Tahoma,sans-serif"><div style="max-width:640px;margin:0 auto;padding:32px 18px"><div style="background:#07111c;border-top:4px solid #27d7ff;padding:28px;color:#edfaff"><div style="font-size:12px;letter-spacing:2px;color:#77dff5">NAWWSAJ INNOVATION LAB</div><h1 style="font-size:24px;margin:14px 0 0">طلب مشروع جديد</h1></div><div style="background:#fff;padding:24px 28px"><table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.7">${detail("الاسم", lead.name)}${detail("وسيلة التواصل", lead.contact)}${detail("الخدمة المطلوبة", lead.requestedService)}${detail("نوع المشروع", lead.projectType)}${detail("مرحلة المشروع", lead.stage)}${detail("وصف مختصر", lead.description)}${detail("الميزانية", lead.budget)}${detail("الجدول الزمني", lead.timeline)}${detail("وقت الطلب", lead.createdAt)}${detail("مصدر الطلب", lead.source)}</table></div><p style="margin:16px 0 0;color:#64748b;font-size:12px;text-align:center">إشعار آلي من nawwsaj.com</p></div></body></html>`;
  return { subject, html };
}

export async function sendLeadNotification(lead: Lead, fetcher: FetchLike = fetch) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false as const, reason: "not_configured" as const };

  const { subject, html } = buildLeadNotificationEmail(lead);
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `lead-notification-${lead.id}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
      to: [NOTIFICATION_RECIPIENT],
      subject,
      html,
    }),
  });

  if (!response.ok) throw new Error("Lead notification request failed.");
  return { sent: true as const };
}
