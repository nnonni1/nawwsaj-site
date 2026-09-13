"use client";

import { FormEvent, useState } from "react";
import { trackBusinessEvent } from "@/lib/business-events";

type LeadForm = { name: string; contact: string; projectType: string; idea: string; stage: string; service: string; budget: string; timeline: string; website: string };
type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm: LeadForm = { name: "", contact: "", projectType: "", idea: "", stage: "", service: "", budget: "", timeline: "", website: "" };
const requiredFields: Array<keyof LeadForm> = ["name", "contact", "projectType", "idea", "stage", "service"];
const labels: Record<keyof LeadForm, string> = { name: "الاسم", contact: "البريد أو وسيلة التواصل", projectType: "نوع المشروع", idea: "وصف مختصر للفكرة", stage: "المرحلة الحالية", service: "الخدمة المطلوبة", budget: "الميزانية المتوقعة", timeline: "الجدول الزمني", website: "الموقع الإلكتروني" };

export default function HomeLeadForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadForm | "form", string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function update(field: keyof LeadForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "submitting") setStatus("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const formElement = event.currentTarget;
    const nextErrors: Partial<Record<keyof LeadForm, string>> = {};
    for (const field of requiredFields) if (!form[field].trim()) nextErrors[field] = `يرجى تعبئة حقل ${labels[field]}.`;
    if (form.idea.trim() && form.idea.trim().length < 10) nextErrors.idea = "اكتب وصفًا أوضح للفكرة (10 أحرف على الأقل).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      window.setTimeout(() => formElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, contact: form.contact, projectType: form.projectType, description: form.idea, stage: form.stage, requestedService: form.service, budget: form.budget, timeline: form.timeline, website: form.website }),
      });
      const result = await response.json().catch(() => null) as { type?: string; errors?: Record<string, string>; message?: string } | null;
      if (!response.ok) {
        if (result?.type === "validation" && result.errors) {
          const mapped = { ...result.errors, idea: result.errors.description, service: result.errors.requestedService };
          setErrors(mapped);
          setStatus("idle");
          window.setTimeout(() => formElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
          return;
        }
        setErrors({ form: result?.message || "تعذر حفظ الطلب حاليًا. حاول مرة أخرى لاحقًا." });
        setStatus("error");
        return;
      }

      trackBusinessEvent("lead_created", "home_service_form", { service: form.service, stage: form.stage });
      setForm(initialForm);
      setErrors({});
      setStatus("success");
    } catch {
      setErrors({ form: "تعذر الاتصال بالخدمة. تحقق من اتصالك وحاول مرة أخرى." });
      setStatus("error");
    }
  }

  const fieldProps = (field: keyof LeadForm) => ({
    id: `lead-${field}`, value: form[field], required: requiredFields.includes(field), disabled: status === "submitting", "aria-invalid": Boolean(errors[field]), "aria-describedby": errors[field] ? `lead-${field}-error` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(field, event.target.value),
  });

  return <form className="lab-lead-form" onSubmit={submit} noValidate aria-busy={status === "submitting"}>
    <div className="lead-form-grid">
      <LeadField label="الاسم" error={errors.name} required><input {...fieldProps("name")} autoComplete="name" /></LeadField>
      <LeadField label="البريد أو وسيلة التواصل" error={errors.contact} required><input {...fieldProps("contact")} autoComplete="email" /></LeadField>
      <LeadField label="نوع المشروع" error={errors.projectType} required><input {...fieldProps("projectType")} placeholder="مثال: منصة، جهاز، أداة داخلية" /></LeadField>
      <LeadField label="المرحلة الحالية" error={errors.stage} required><select {...fieldProps("stage")}><option value="">اختر المرحلة</option><option>فكرة</option><option>Prototype</option><option>MVP</option><option>مشروع قائم يحتاج تطوير</option></select></LeadField>
      <LeadField label="الخدمة المطلوبة" error={errors.service} required><select {...fieldProps("service")}><option value="">اختر الخدمة</option><option>MVP / Prototype</option><option>AI & Automation</option><option>IoT / Embedded</option><option>غير متأكد</option></select></LeadField>
      <LeadField label="الميزانية المتوقعة" error={errors.budget}><input {...fieldProps("budget")} /></LeadField>
      <LeadField label="وصف مختصر للفكرة" error={errors.idea} required wide><textarea {...fieldProps("idea")} rows={4} /></LeadField>
      <LeadField label="الجدول الزمني" error={errors.timeline} wide><input {...fieldProps("timeline")} /></LeadField>
      <div className="lead-honeypot" aria-hidden="true"><label htmlFor="lead-website">الموقع الإلكتروني</label><input {...fieldProps("website")} tabIndex={-1} autoComplete="off" /></div>
    </div>
    {Object.keys(errors).some((key) => key !== "form") && <p className="form-error-summary" role="alert">يرجى مراجعة الحقول الموضحة.</p>}
    {status === "error" && <div className="lead-error" role="alert"><strong>لم يتم إرسال الطلب.</strong><p>{errors.form}</p></div>}
    {status === "success" && <div className="lead-ready" role="status"><strong>وصلتنا فكرتك.</strong><p>سنراجع التفاصيل ونتواصل معك قريبًا.</p></div>}
    <button className="button primary lead-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "جارٍ إرسال الطلب..." : "أرسل طلب المشروع"}<b aria-hidden="true">↖</b></button>
  </form>;
}

function LeadField({ label, error, required, wide, children }: { label: string; error?: string; required?: boolean; wide?: boolean; children: React.ReactNode }) {
  const child = children as React.ReactElement<{ id?: string }>;
  const id = child.props.id;
  return <div className={`lead-field${wide ? " is-wide" : ""}`}><label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>{children}{error && <span className="field-error" id={`${id}-error`}>{error}</span>}</div>;
}
