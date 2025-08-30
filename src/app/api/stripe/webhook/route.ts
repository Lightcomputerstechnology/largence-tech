import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import dayjs from "dayjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("No webhook secret", { status: 500 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId: string | undefined = session.client_reference_id;
    const plan: string | undefined = session.metadata?.plan;
    const type: string | undefined = session.metadata?.type;
    if (!userId) return new Response("ok", { status: 200 });

    // Subscriptions → set plan
    if (plan === "monthly" || plan === "annual") {
      await supabaseAdmin.from("profiles").upsert({ id: userId, plan }, { onConflict: "id" });
    }

    // PAYG → increment monthly credit by 1
    if (type === "payg") {
      const monthKey = dayjs().format("YYYY-MM");
      const { data: row } = await supabaseAdmin
        .from("payg_credits")
        .select("id, remaining")
        .eq("user_id", userId)
        .eq("month_key", monthKey)
        .maybeSingle();

      if (!row) {
        await supabaseAdmin.from("payg_credits").insert({ user_id: userId, month_key: monthKey, remaining: 1 });
      } else {
        await supabaseAdmin.from("payg_credits").update({ remaining: (row.remaining ?? 0) + 1 }).eq("id", row.id);
      }
    }
  }

  return new Response("ok", { status: 200 });
        }
