import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads/service";
import {
  LeadRepositoryConfigurationError,
  SupabaseLeadRepository,
} from "@/lib/leads/supabase-lead-repository";
import { sendLeadNotification } from "@/lib/leads/notification";

export const runtime = "nodejs";

const repository = new SupabaseLeadRepository();

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ ok: false, type: "validation", message: "حجم الطلب كبير جدًا." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, type: "validation", message: "بيانات الطلب غير صالحة." }, { status: 400 });
  }

  try {
    const result = await createLead(payload, repository);
    if (!result.success) {
      return NextResponse.json({ ok: false, type: "validation", errors: result.errors }, { status: 422 });
    }

    try {
      await sendLeadNotification(result.lead);
    } catch {
      // The lead is already stored. Keep the response successful and avoid logging lead data.
      console.error("Lead notification email failed.");
    }

    return NextResponse.json(
      { ok: true, id: result.lead.id, createdAt: result.lead.createdAt },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof LeadRepositoryConfigurationError) {
      return NextResponse.json(
        { ok: false, type: "server", message: "خدمة استقبال الطلبات غير مهيأة بعد." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { ok: false, type: "server", message: "تعذر حفظ الطلب حاليًا. حاول مرة أخرى لاحقًا." },
      { status: 500 },
    );
  }
}
