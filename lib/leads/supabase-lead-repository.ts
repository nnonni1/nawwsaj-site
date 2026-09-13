import type { BusinessEvent } from "../business-events.ts";
import type { Lead, LeadRepository } from "./types.ts";

export class LeadRepositoryConfigurationError extends Error {}

export class SupabaseLeadRepository implements LeadRepository {
  async createWithEvent(lead: Lead, event: BusinessEvent): Promise<void> {
    const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
      throw new LeadRepositoryConfigurationError("Lead storage is not configured.");
    }

    const response = await fetch(`${url}/rest/v1/rpc/create_lead_with_event`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_lead: {
          id: lead.id,
          name: lead.name,
          contact: lead.contact,
          project_type: lead.projectType,
          description: lead.description,
          stage: lead.stage,
          requested_service: lead.requestedService,
          budget: lead.budget,
          timeline: lead.timeline,
          created_at: lead.createdAt,
          source: lead.source,
          status: lead.status,
        },
        p_event: event,
      }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Lead storage request failed.");
  }
}
