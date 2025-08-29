export default function Questions() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Required Information</h1>
      <p className="text-neutral-700">We’ll keep the formatting tidy and legal-style. Fill these and we’ll generate a draft.</p>

      <div className="grid gap-4">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Your name / company" />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Counterparty name" />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Jurisdiction (e.g., England & Wales)" />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Effective date" />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Term (e.g., 12 months)" />
      </div>

      <div className="flex gap-3">
        <a href="/app/editor" className="rounded-xl bg-[var(--primary)] text-white px-5 py-2">Generate draft</a>
        <a href="/app/prompt" className="rounded-xl border px-5 py-2">Back</a>
      </div>
    </div>
  );
}
