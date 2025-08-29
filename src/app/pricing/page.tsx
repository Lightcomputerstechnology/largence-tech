'use client';
import { useState } from "react";

export default function Pricing() {
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-neutral-700">
          Start free. Upgrade when you need more documents. Formatting stays professional and tidy.
        </p>
      </header>

      <div className="flex items-center gap-3">
        <button
          className={`rounded-xl border px-3 py-2 ${plan==='monthly' ? 'bg-[var(--primary)] text-white' : ''}`}
          onClick={() => setPlan('monthly')}
        >
          Monthly
        </button>
        <button
          className={`rounded-xl border px-3 py-2 ${plan==='annual' ? 'bg-[var(--primary)] text-white' : ''}`}
          onClick={() => setPlan('annual')}
        >
          Annual
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Free */}
        <div className="rounded-xl border p-6 space-y-3">
          <h3 className="font-semibold text-lg">Free</h3>
          <ul className="text-sm text-neutral-700 list-disc pl-5 space-y-1">
            <li>3 documents each month</li>
            <li>Clean, tidy formatting</li>
            <li>PDF / DOCX export (basic)</li>
          </ul>
          <a className="inline-block mt-3 rounded-xl border px-4 py-2" href="/sign-up">Get started</a>
        </div>

        {/* Pro */}
        <div className="rounded-xl border p-6 space-y-3">
          <h3 className="font-semibold text-lg">Pro ({plan})</h3>
          <p className="text-sm text-neutral-700">
            {plan === 'monthly' ? "$10/month · 30 documents / month" : "$100/year · 30 documents / month"}
          </p>
          <ul className="text-sm text-neutral-700 list-disc pl-5 space-y-1">
            <li>After 30, pay $2.50 per document</li>
            <li>Formatting kept tidy and consistent</li>
            <li>Everything in Free</li>
          </ul>
          {/* Stripe hookup comes later; button exists now */}
          <form method="POST" action="/api/stripe/create-checkout-session">
            <input type="hidden" name="plan" value={plan} />
            <button className="mt-3 rounded-xl bg-[var(--primary)] text-white px-4 py-2">Upgrade</button>
          </form>
        </div>

        {/* Pay-as-you-go note */}
        <div className="rounded-xl border p-6 space-y-3">
          <h3 className="font-semibold text-lg">Pay-as-you-go</h3>
          <ul className="text-sm text-neutral-700 list-disc pl-5 space-y-1">
            <li>$2.50 per document generation session</li>
            <li>Applies after free (3) or after Pro quota (30)</li>
          </ul>
          <p className="text-xs text-neutral-500">
            Annual plan still caps at 30 documents per month; unused docs do not roll over (refreshes monthly).
          </p>
        </div>
      </div>

      <div className="rounded-xl border p-4 bg-[var(--ring)]/60">
        <strong>Premium (Coming Soon):</strong> AI suggestions after draft (from high to low priority). Pricing TBD.
      </div>
    </div>
  );
            }
