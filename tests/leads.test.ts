import assert from "node:assert/strict";
import test from "node:test";
import { createLead } from "../lib/leads/service.ts";
import { validateLeadPayload } from "../lib/leads/validation.ts";
import type { BusinessEvent } from "../lib/business-events.ts";
import type { Lead, LeadRepository } from "../lib/leads/types.ts";
import { buildLeadNotificationEmail, sendLeadNotification } from "../lib/leads/notification.ts";

const validPayload = { name: "اختبار", contact: "test@example.com", projectType: "منصة", description: "فكرة تقنية واضحة قابلة للاختبار", stage: "فكرة" as const, requestedService: "MVP / Prototype" as const, budget: "", timeline: "شهران", source: "home_service_form" };

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

test("builds a safe lead notification and sends it after configuration", async () => {
  const lead: Lead = { ...validPayload, budget: null, source: "home_service_form", id: "11111111-1111-4111-8111-111111111111", createdAt: "2026-09-13T12:00:00.000Z", status: "new" };
  const email = buildLeadNotificationEmail({ ...lead, name: "<script>اختبار</script>" });
  assert.match(email.subject, /MVP \/ Prototype/);
  assert.doesNotMatch(email.html, /<script>/);

  const previousKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "re_test";
  let request: RequestInit | undefined;
  const result = await sendLeadNotification(lead, async (_input, init) => {
    request = init;
    return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
  });
  if (previousKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = previousKey;
  assert.equal(result.sent, true);
  assert.match(String(request?.body), /afnan\.aldohime@gmail\.com/);
  assert.equal((request?.headers as Record<string, string>)["Idempotency-Key"], `lead-notification-${lead.id}`);
});

test("skips email notification when Resend is not configured", async () => {
  const previousKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  const lead: Lead = { ...validPayload, budget: null, source: "home_service_form", id: "11111111-1111-4111-8111-111111111111", createdAt: "2026-09-13T12:00:00.000Z", status: "new" };
  const result = await sendLeadNotification(lead, async () => { throw new Error("fetch should not run"); });
  if (previousKey !== undefined) process.env.RESEND_API_KEY = previousKey;
  assert.deepEqual(result, { sent: false, reason: "not_configured" });
});
