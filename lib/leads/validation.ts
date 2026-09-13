import { leadStages, requestedServices, type LeadInput } from "./types.ts";

export type LeadValidationResult =
  | { success: true; data: LeadInput }
  | { success: false; errors: Record<string, string> };

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export function validateLeadPayload(payload: unknown): LeadValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { success: false, errors: { form: "بيانات الطلب غير صالحة." } };
  }

  const raw = payload as Record<string, unknown>;
  if (text(raw.website)) {
    return { success: false, errors: { form: "تعذر إرسال الطلب." } };
  }

  const values = {
    name: text(raw.name),
    contact: text(raw.contact),
    projectType: text(raw.projectType),
    description: text(raw.description),
    stage: text(raw.stage),
    requestedService: text(raw.requestedService),
    budget: text(raw.budget),
    timeline: text(raw.timeline),
  };
  const errors: Record<string, string> = {};

  const required: Array<keyof typeof values> = [
    "name",
    "contact",
    "projectType",
    "description",
    "stage",
    "requestedService",
  ];
  for (const field of required) {
    if (!values[field]) errors[field] = "هذا الحقل مطلوب.";
  }

  if (values.name.length > 120) errors.name = "الاسم أطول من الحد المسموح.";
  if (values.contact && (values.contact.length < 5 || values.contact.length > 160)) {
    errors.contact = "أدخل وسيلة تواصل صحيحة.";
  }
  if (values.projectType.length > 160) errors.projectType = "نوع المشروع أطول من الحد المسموح.";
  if (values.description && values.description.length < 10) {
    errors.description = "اكتب وصفًا أوضح للفكرة (10 أحرف على الأقل).";
  }
  if (values.description.length > 4000) errors.description = "الوصف أطول من الحد المسموح.";
  if (!leadStages.includes(values.stage as (typeof leadStages)[number])) {
    errors.stage = "اختر مرحلة صحيحة.";
  }
  if (!requestedServices.includes(values.requestedService as (typeof requestedServices)[number])) {
    errors.requestedService = "اختر خدمة صحيحة.";
  }
  if (values.budget.length > 160) errors.budget = "الميزانية أطول من الحد المسموح.";
  if (values.timeline.length > 160) errors.timeline = "المدة أطول من الحد المسموح.";

  if (Object.keys(errors).length) return { success: false, errors };

  return {
    success: true,
    data: {
      name: values.name,
      contact: values.contact,
      projectType: values.projectType,
      description: values.description,
      stage: values.stage as LeadInput["stage"],
      requestedService: values.requestedService as LeadInput["requestedService"],
      budget: values.budget || null,
      timeline: values.timeline || null,
      source: "website_home",
    },
  };
}
