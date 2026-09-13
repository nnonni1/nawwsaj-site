import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("positions Nawwsaj as an innovation lab with three focused services", async () => {
  const [home, content, layout] = await Promise.all([
    source("app/site-client.tsx"),
    source("content/home.ts"),
    source("app/layout.tsx"),
  ]);

  assert.match(home, /من الفكرة إلى/);
  assert.match(home, /Nawwsaj Innovation Lab/);
  assert.match(home, /Suhail/);
  assert.match(home, /HomeLeadForm/);
  assert.equal((content.match(/cta: "/g) ?? []).length, 3);
  assert.match(layout, /Nawwsaj Innovation Lab \| من الفكرة إلى نموذج يعمل/);
  assert.match(layout, /lang="ar"/);
  assert.match(layout, /dir="rtl"/);
});

test("keeps browser events local while supporting server-side event creation", async () => {
  const events = await source("lib/business-events.ts");

  for (const type of ["lead_created", "service_request_created", "resource_downloaded", "waitlist_joined", "contact_request_created"]) {
    assert.match(events, new RegExp(type));
  }

  assert.match(events, /timestamp = new Date\(\)\.toISOString\(\)/);
  assert.match(events, /window\.dispatchEvent/);
  assert.doesNotMatch(events, /fetch\(|XMLHttpRequest|sendBeacon/);
});

test("keeps Suhail and service routes present", async () => {
  const [suhail, services] = await Promise.all([
    source("app/projects/suhail/page.tsx"),
    source("app/services/page.tsx"),
  ]);

  assert.match(suhail, /LoRa/);
  assert.match(suhail, /Edge systems/);
  assert.match(services, /ServiceRequest/);
});
