import { randomUUID } from "node:crypto";
import { createBusinessEvent } from "../business-events.ts";
import type { Lead, LeadRepository } from "./types.ts";
import { validateLeadPayload } from "./validation.ts";

type LeadServiceDependencies = {
  createId?: () => string;
  now?: () => string;
};

export async function createLead(
  payload: unknown,
  repository: LeadRepository,
  dependencies: LeadServiceDependencies = {},
) {
  const validation = validateLeadPayload(payload);
  if (!validation.success) return validation;

  const lead: Lead = {
    ...validation.data,
    id: (dependencies.createId ?? randomUUID)(),
    createdAt: (dependencies.now ?? (() => new Date().toISOString()))(),
    status: "new",
  };
  const event = createBusinessEvent(
    "lead_created",
    lead.source,
    {
      leadId: lead.id,
      requestedService: lead.requestedService,
      projectType: lead.projectType,
      stage: lead.stage,
      status: lead.status,
    },
    lead.createdAt,
  );

  await repository.createWithEvent(lead, event);
  return { success: true as const, lead };
}
