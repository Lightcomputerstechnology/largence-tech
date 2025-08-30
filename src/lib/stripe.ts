import Stripe from "stripe";

/**
 * Lazy getter so we don't throw at import time during Next.js build.
 * We only validate the key when a request actually hits the route.
 */
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  return new Stripe(key, { apiVersion: "2024-06-20" });
}
