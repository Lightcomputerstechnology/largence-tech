import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { createServerSupabase } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const FREE_LIMIT = 3;
const PRO_LIMIT = 30;

function monthWindow() {
  const start = dayjs().startOf("month").toISOString();
  const end = dayjs().endOf("month").toISOString();
  return { start, end };
}

export async function POST(req: Request) {
  // 1) Get the logged-in user (via cookies)
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2) Ensure profile exists (create if missing)
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    // create a default profile
    const { error: insertErr } = await supabaseAdmin
      .from("profiles")
      .insert({ id: user.id, email: user.email, plan: "free" });
    if (insertErr) {
      return NextResponse.json({ error: "Profile create failed" }, { status: 500 });
    }
  }

  // 3) Determine plan + limit
  const currentPlan = profile?.plan || "free";
  const limit = currentPlan === "free" ? FREE_LIMIT : PRO_LIMIT;

  // 4) Count this month’s drafts
  const { start, end } = monthWindow();
  const { data: countData, error: countErr } = await supabaseAdmin
    .from("drafts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", start)
    .lte("created_at", end);

  if (countErr) {
    return NextResponse.json({ error: "Count failed" }, { status: 500 });
  }

  const used = countData ? countData.length ?? 0 : 0; // head:true means no rows, but count is in headers; SDK still reports count
  if ((countData as any)?.count !== undefined) {
    // Some SDK versions expose count separately
  }

  // 5) Enforce quota
  if (used >= limit) {
    // Pay-per-use would go here ($2.50/doc) — for now, return 402-style
    return NextResponse.json({
      error: "Quota exceeded",
      message: currentPlan === "free"
        ? "You’ve used 3 free documents this month. Upgrade or pay per document."
        : "You’ve used 30 documents this month. Pay per document to continue."
    }, { status: 402 });
  }

  // 6) Create draft (stub content for now)
  const form = await req.formData();
  const title = String(form.get("title") || "Untitled");
  const content = String(form.get("content") || "Draft content will appear here...");

  const { data: created, error: insertError } = await supabaseAdmin
    .from("drafts")
    .insert({
      user_id: user.id,
      title,
      content
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: created.id });
               }
