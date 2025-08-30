import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { createServerSupabase } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const FREE_LIMIT = 3;
const PRO_LIMIT = 30;

function monthWindow() {
  return { start: dayjs().startOf("month").toISOString(), end: dayjs().endOf("month").toISOString() };
}
function monthKey() { return dayjs().format("YYYY-MM"); }

export async function POST(req: Request) {
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return NextResponse.redirect("/sign-in", { status: 303 });

  // Ensure profile
  const { data: profile } = await supabaseAdmin.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (!profile) {
    await supabaseAdmin.from("profiles").insert({ id: user.id, email: user.email, plan: "free" });
  }
  const currentPlan = profile?.plan || "free";
  const limit = currentPlan === "free" ? FREE_LIMIT : PRO_LIMIT;

  // Count drafts this month
  const { start, end } = monthWindow();
  const { count, error: countErr } = await supabaseAdmin
    .from("drafts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", start)
    .lte("created_at", end);
  if (countErr) return NextResponse.json({ error: "Count failed" }, { status: 500 });

  let allowed = (count ?? 0) < limit;
  let consumedCredit = false;

  // If over quota, check PAYG credits
  if (!allowed) {
    const mk = monthKey();
    const { data: row } = await supabaseAdmin
      .from("payg_credits")
      .select("id, remaining")
      .eq("user_id", user.id)
      .eq("month_key", mk)
      .maybeSingle();

    if (row && (row.remaining ?? 0) > 0) {
      // consume 1 credit
      await supabaseAdmin.from("payg_credits").update({ remaining: row.remaining - 1 }).eq("id", row.id);
      allowed = true;
      consumedCredit = true;
    }
  }

  if (!allowed) {
    return NextResponse.json({
      error: "Quota exceeded",
      message: currentPlan === "free"
        ? "You’ve used 3 free documents this month. Upgrade or pay per document."
        : "You’ve used 30 documents this month. Pay per document to continue."
    }, { status: 402 });
  }

  const form = await req.formData();
  const title = String(form.get("title") || "Untitled");
  const content = String(form.get("content") || "Draft content will appear here...");

  const { data: created, error: insertError } = await supabaseAdmin
    .from("drafts")
    .insert({ user_id: user.id, title, content })
    .select()
    .single();
  if (insertError) return NextResponse.json({ error: "Create failed" }, { status: 500 });

  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = `${base}/app/editor?id=${created.id}${consumedCredit ? "&used_credit=1" : ""}`;
  return NextResponse.redirect(url, { status: 303 });
    }
