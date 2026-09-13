import type { BusinessEvent } from "../business-events.ts";

export const leadStages = ["فكرة", "Prototype", "MVP", "مشروع قائم يحتاج تطوير"] as const;
export const requestedServices = ["MVP / Prototype", "AI & Automation", "IoT / Embedded", "غير متأكد"] as const;

export type LeadStage = (typeof leadStages)[number];
export type RequestedService = (typeof requestedServices)[number];

export type LeadInput = {
  name: string;
  contact: string;
  projectType: string;
  description: string;
  stage: LeadStage;
  requestedService: RequestedService;
  budget: string | null;
  timeline: string | null;
  source: string;
};

export type Lead = LeadInput & {
  id: string;
  createdAt: string;
  status: "new";
};

export interface LeadRepository {
  createWithEvent(lead: Lead, event: BusinessEvent): Promise<void>;
}
