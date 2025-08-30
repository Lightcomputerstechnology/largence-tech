import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerSupabase } from "@/lib/supabaseServer";

export async function POST() {
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return NextResponse.redirect("/sign-in", { status: 303 });

  const priceId = process.env.STRIPE_PRICE_PAYG;
  if (!priceId) return NextResponse.json({ error: "STRIPE_PRICE_PAYG not configured" }, { status: 500 });

  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: user.email || undefined,
    client_reference_id: user.id,
    success_url: `${origin}/app?payg_success=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    metadata: { type: "payg" },
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
