'use client';
import { useSearchParams } from "next/navigation";

export default function PromptPage() {
  const sp = useSearchParams();
  const template = sp.get("template") || "NDA";

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Describe your {template}</h1>
      <p className="text-neutral-700">Give us the basics. Keep it simple, tidy language—this helps formatting later.</p>
      <textarea
        className="w-full rounded-xl border px-3 py-2 min-h-[160px]"
        placeholder="Describe the parties, scope, term/dates, payment terms, and any special clauses."
      />
      <div className="flex gap-3">
        <a href="/app/questions" className="rounded-xl bg-[var(--primary)] text-white px-5 py-2">Continue</a>
        <a href="/app" className="rounded-xl border px-5 py-2">Back</a>
      </div>
    </div>
  );
}
