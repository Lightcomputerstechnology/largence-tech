export default function PricingGrid() {
  return (
    <section className="my-16 space-y-8">
      <header className="text-center space-y-3">
        <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
        <p className="text-neutral-600">Start free. Upgrade when you need more documents.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Free plan */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-lg">Free</h3>
          <ul className="text-sm text-neutral-700 space-y-2">
            <li>3 documents / month</li>
            <li>PDF & DOCX export</li>
            <li>Tidy formatting</li>
          </ul>
          <a href="/sign-up" className="btn btn-primary w-full text-center">Get Started</a>
        </div>

        {/* Pay-as-you-go */}
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-lg">Pay-as-you-go</h3>
          <p className="text-sm text-neutral-700">$2.50 per document after free quota</p>
          <a href="/pricing" className="btn border w-full text-center">Buy Docs</a>
        </div>

        {/* Pro Monthly */}
        <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-[#1EBE8E] to-[#13A275] space-y-4">
          <h3 className="font-semibold text-lg">Pro (Monthly)</h3>
          <p>$10 / month · 30 docs</p>
          <ul className="text-sm space-y-2">
            <li>After 30, $2.50 per doc</li>
            <li>Everything in Free</li>
            <li>Priority support</li>
          </ul>
          <form method="POST" action="/api/stripe/create-checkout-session">
            <input type="hidden" name="plan" value="monthly" />
            <button className="btn bg-white text-[#1EBE8E] w-full font-semibold">Upgrade</button>
          </form>
        </div>

        {/* Pro Annual */}
        <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-[#E11900] to-[#A30F00] space-y-4">
          <h3 className="font-semibold text-lg">Pro (Annual)</h3>
          <p>$100 / year · 30 docs / month</p>
          <ul className="text-sm space-y-2">
            <li>After 30, $2.50 per doc</li>
            <li>Everything in Free</li>
            <li>Priority support</li>
          </ul>
          <form method="POST" action="/api/stripe/create-checkout-session">
            <input type="hidden" name="plan" value="annual" />
            <button className="btn bg-white text-brand w-full font-semibold">Upgrade</button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-600">
        Premium (coming soon): AI suggestions with priority edits.
      </div>
    </section>
  );
      }
