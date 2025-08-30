import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerSupabase } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return NextResponse.redirect("/sign-in", { status: 303 });

  const form = await req.formData();
  const plan = String(form.get("plan") || "monthly"); // 'monthly' | 'annual'
  const priceId = plan === "annual" ? process.env.STRIPE_PRICE_ANNUAL : process.env.STRIPE_PRICE_MONTHLY;
  if (!priceId) return NextResponse.json({ error: "Stripe price ID not configured" }, { status: 500 });

  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: user.email || undefined,
    client_reference_id: user.id,
    success_url: `${origin}/app?success=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    metadata: { plan },
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
