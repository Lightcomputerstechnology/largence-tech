export default function Questions() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Required Information</h1>
      <p className="text-neutral-700">
        We’ll keep the formatting tidy and legal-style. Fill these and we’ll generate a draft.
      </p>

      <form className="grid gap-4" method="POST" action="/api/drafts">
        <input className="w-full rounded-xl border px-3 py-2" name="title" placeholder="Document title (e.g., NDA)" />
        <input className="w-full rounded-xl border px-3 py-2" name="party_a" placeholder="Your name / company" />
        <input className="w-full rounded-xl border px-3 py-2" name="party_b" placeholder="Counterparty name" />
        <input className="w-full rounded-xl border px-3 py-2" name="jurisdiction" placeholder="Jurisdiction (e.g., England & Wales)" />
        <input className="w-full rounded-xl border px-3 py-2" name="effective_date" placeholder="Effective date" />

        <input type="hidden" name="content" value="Draft will include party names, jurisdiction, and effective date." />

        <div className="flex gap-3">
          <button className="rounded-xl bg-[var(--primary)] text-white px-5 py-2">
            Generate draft
          </button>
          <a href="/app/prompt" className="rounded-xl border px-5 py-2">Back</a>
        </div>
      </form>
    </div>
  );
        }
