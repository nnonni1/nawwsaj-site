export type BusinessEventType =
  | "lead_created"
  | "service_request_created"
  | "resource_downloaded"
  | "waitlist_joined"
  | "contact_request_created"
  | "cta_clicked";

export type BusinessEvent = {
  type: BusinessEventType;
  timestamp: string;
  source: string;
  metadata: Record<string, string | number | boolean | null>;
};

export const BUSINESS_EVENT_NAME = "nawwsaj:business-event";

export function createBusinessEvent(
  type: BusinessEventType,
  source: string,
  metadata: BusinessEvent["metadata"] = {},
  timestamp = new Date().toISOString(),
): BusinessEvent {
  return { type, timestamp, source, metadata };
}

/**
 * Client-side event boundary for future Nawwsaj OS/API integration.
 * It intentionally sends nothing and persists nothing today.
 */
export function trackBusinessEvent(
  type: BusinessEventType,
  source: string,
  metadata: BusinessEvent["metadata"] = {},
) {
  if (typeof window === "undefined") return;

  const event = createBusinessEvent(type, source, metadata);

  window.dispatchEvent(new CustomEvent<BusinessEvent>(BUSINESS_EVENT_NAME, { detail: event }));
}
