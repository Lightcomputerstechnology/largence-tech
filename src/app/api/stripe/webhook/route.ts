import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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
    const session = event.data.object as any; // Stripe.Checkout.Session
    const plan: string | undefined = session.metadata?.plan;
    const userId: string | undefined = session.client_reference_id;

    if (userId && (plan === "monthly" || plan === "annual")) {
      await supabaseAdmin
        .from("profiles")
        .upsert({ id: userId, plan }, { onConflict: "id" });
    }
  }

  // (Optional) handle cancellation/renewal via customer.subscription.* events later

  return new Response("ok", { status: 200 });
      }
