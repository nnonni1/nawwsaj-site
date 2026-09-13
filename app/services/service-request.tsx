"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { createWhatsAppUrl, isWhatsAppReady } from "@/content/services";

export type ServiceId = "project" | "automation" | "mvp";
type Field = { name: string; label: string; required: boolean; multiline?: boolean; inputMode?: "tel" };

const sharedFields: Field[] = [
  { name: "name", label: "الاسم", required: true },
  { name: "contact", label: "رقم التواصل", required: true, inputMode: "tel" },
];

const formFields: Record<ServiceId, Field[]> = {
  project: [...sharedFields,
    { name: "projectSummary", label: "وصف مختصر للمشروع", required: true, multiline: true },
    { name: "currentStage", label: "المرحلة الحالية", required: true },
    { name: "helpPoint", label: "أهم نقطة أحتاج مساعدة فيها", required: true, multiline: true },
    { name: "suitableTimes", label: "الأوقات المناسبة للجلسة", required: false },
  ],
  automation: [...sharedFields,
    { name: "currentProcess", label: "وصف العملية الحالية", required: true, multiline: true },
    { name: "automationGoal", label: "ما الذي تريد أتمتته؟", required: true, multiline: true },
    { name: "currentTools", label: "الأدوات المستخدمة حاليًا", required: false },
    { name: "desiredResult", label: "النتيجة المطلوبة", required: true, multiline: true },
    { name: "budget", label: "الميزانية التقريبية", required: false },
    { name: "timeline", label: "الموعد المتوقع", required: false },
  ],
  mvp: [...sharedFields,
    { name: "idea", label: "وصف الفكرة", required: true, multiline: true },
    { name: "problem", label: "المشكلة التي تحلها", required: true, multiline: true },
    { name: "targetUser", label: "المستخدم المستهدف", required: true },
    { name: "currentStage", label: "المرحلة الحالية", required: true },
    { name: "existingFiles", label: "هل توجد تصاميم أو ملفات سابقة؟", required: false },
    { name: "budget", label: "الميزانية التقريبية", required: false },
    { name: "timeline", label: "الموعد المتوقع", required: false },
  ],
};

export function buildWhatsAppMessage(serviceTitle: string, fields: Field[], values: Record<string, string>) {
  const details = fields.map((field) => `${field.label}: ${values[field.name]?.trim() || "—"}`).join("\n");
  return `السلام عليكم، أرغب في طلب خدمة من نوسج.\n\nالخدمة: ${serviceTitle}\n\n${details}`;
}

export default function ServiceRequest({ serviceId, serviceTitle }: { serviceId: ServiceId; serviceTitle: string }) {
  const fields = formFields[serviceId];
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reviewed, setReviewed] = useState(false);

  function closeModal() {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input, textarea, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors: Record<string, string> = {};
    for (const field of fields) if (field.required && !values[field.name]?.trim()) nextErrors[field.name] = `يرجى تعبئة حقل ${field.label}.`;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      window.setTimeout(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(), 0);
      return;
    }
    setStep("confirm");
  }

  function continueToWhatsApp() {
    const url = createWhatsAppUrl(buildWhatsAppMessage(serviceTitle, fields, values));
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    setReviewed(true);
    closeModal();
  }

  return <>
    <button ref={triggerRef} className="service-button service-start" type="button" onClick={() => { setStep("form"); setIsOpen(true); }}>ابدأ الخدمة <b aria-hidden="true">↖</b></button>
    {reviewed && <p className="service-return-note" role="status">شكرًا لتواصلك مع نوسج. تتم مراجعة الطلبات والرد عليها عبر واتساب.</p>}
    {isOpen && <div className="service-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
      <section ref={dialogRef} className="service-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="service-modal-head"><div><p className="section-label">طلب خدمة / SERVICE REQUEST</p><h2 id={titleId}>{step === "form" ? serviceTitle : "تم تجهيز طلبك"}</h2></div><button ref={closeRef} className="modal-close" type="button" onClick={closeModal} aria-label="إغلاق نافذة طلب الخدمة">×</button></div>
        {step === "form" ? <form className="service-form" onSubmit={submitForm} noValidate>
          <p className="form-required-note"><span aria-hidden="true">*</span> الحقول المطلوبة</p>
          {Object.keys(errors).length > 0 && <p className="form-error-summary" role="alert">يرجى مراجعة الحقول المطلوبة الموضحة أدناه.</p>}
          <div className="service-fields">{fields.map((field) => {
            const fieldId = `${titleId}-${field.name}`;
            const errorId = `${fieldId}-error`;
            const common = { id: fieldId, name: field.name, value: values[field.name] || "", required: field.required, "aria-invalid": Boolean(errors[field.name]), "aria-describedby": errors[field.name] ? errorId : undefined, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setValues((current) => ({ ...current, [field.name]: event.target.value })); if (errors[field.name]) setErrors((current) => ({ ...current, [field.name]: "" })); } };
            return <div className={`service-field${field.multiline ? " is-wide" : ""}`} key={field.name}><label htmlFor={fieldId}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>{field.multiline ? <textarea {...common} rows={4} /> : <input {...common} inputMode={field.inputMode} />}{errors[field.name] && <span className="field-error" id={errorId}>{errors[field.name]}</span>}</div>;
          })}</div>
          <div className="modal-actions"><button className="service-button" type="submit">إرسال الطلب عبر واتساب <b aria-hidden="true">↖</b></button><button className="modal-secondary" type="button" onClick={closeModal}>إلغاء</button></div>
        </form> : <div className="service-confirmation"><p>سيتم الآن فتح واتساب لإرسال التفاصيل. سنراجع طلبك ونتواصل معك لتأكيد إمكانية التنفيذ والخطوة التالية.</p>{!isWhatsAppReady && <p className="form-error-summary" role="status">سيُفعّل الانتقال إلى واتساب بعد إضافة رقم نوسج الرسمي.</p>}<div className="modal-actions"><button className="service-button" type="button" onClick={continueToWhatsApp} disabled={!isWhatsAppReady}>متابعة إلى واتساب <b aria-hidden="true">↖</b></button><button className="modal-secondary" type="button" onClick={() => setStep("form")}>العودة إلى النموذج</button></div></div>}
      </section>
    </div>}
  </>;
}
