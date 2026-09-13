import assert from "node:assert/strict";
import test from "node:test";
import { createLead } from "../lib/leads/service.ts";
import { validateLeadPayload } from "../lib/leads/validation.ts";
import type { BusinessEvent } from "../lib/business-events.ts";
import type { Lead, LeadRepository } from "../lib/leads/types.ts";

const validPayload = { name: "اختبار", contact: "test@example.com", projectType: "منصة", description: "فكرة تقنية واضحة قابلة للاختبار", stage: "فكرة", requestedService: "MVP / Prototype", budget: "", timeline: "شهران" };

test("validates a complete lead payload", () => assert.equal(validateLeadPayload(validPayload).success, true));
test("rejects an invalid lead payload", () => {
  const result = validateLeadPayload({ name: "" });
  assert.equal(result.success, false);
  if (!result.success) assert.ok(result.errors.contact);
});
test("persists a valid lead and its lead_created business event", async () => {
  let stored: { lead: Lead; event: BusinessEvent } | undefined;
  const repository: LeadRepository = { async createWithEvent(lead, event) { stored = { lead, event }; } };
  const result = await createLead(validPayload, repository, { createId: () => "11111111-1111-4111-8111-111111111111", now: () => "2026-09-13T12:00:00.000Z" });
  assert.equal(result.success, true);
  assert.equal(stored?.lead.status, "new");
  assert.equal(stored?.event.type, "lead_created");
  assert.equal(stored?.event.metadata.requestedService, "MVP / Prototype");
  assert.equal("contact" in (stored?.event.metadata ?? {}), false);
});
test("does not call persistence for an invalid submission", async () => {
  let called = false;
  const repository: LeadRepository = { async createWithEvent() { called = true; } };
  const result = await createLead({}, repository);
  assert.equal(result.success, false);
  assert.equal(called, false);
});
