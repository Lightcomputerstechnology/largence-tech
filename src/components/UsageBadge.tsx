import { getUsage } from "@/lib/usage";

export default async function UsageBadge() {
  const { user, plan, used, limit } = await getUsage();
  if (!user) return null;

  const remaining = Math.max(0, limit - used);
  const planLabel = plan === "free" ? "Free" : plan === "monthly" ? "Pro (Monthly)" : "Pro (Annual)";

  return (
    <div className="rounded-xl border px-3 py-2 text-sm inline-flex items-center gap-3">
      <span className="font-medium">{planLabel}</span>
      <span className="text-neutral-600">This month:</span>
      <span className="font-semibold">{used}/{limit}</span>
      {remaining === 0 && (
        <form method="POST" action="/api/stripe/create-payg-session" className="inline">
          <button className="ml-2 rounded-lg bg-[var(--primary)] text-white px-3 py-1">
            Pay $2.50 for 1 doc
          </button>
        </form>
      )}
    </div>
  );
}
