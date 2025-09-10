'use client';
import { useMemo, useState } from "react";
import Stepper from "@/components/Stepper";

type FormState = {
  template: string;
  party_a: string;
  party_b: string;
  jurisdiction: string;
  effective_date: string;
  notes: string;
};
const TOTAL = 5;

export default function Questions() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    template: "NDA",
    party_a: "",
    party_b: "",
    jurisdiction: "",
    effective_date: "",
    notes: "",
  });

  function next() { setStep((s) => Math.min(TOTAL, s + 1)); }
  function prev() { setStep((s) => Math.max(1, s - 1)); }
  function update<K extends keyof FormState>(k: K, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  const preview = useMemo(() => {
    const title = form.template || "Draft";
    const a = form.party_a || "[Your Name/Company]";
    const b = form.party_b || "[Counterparty]";
    const j = form.jurisdiction || "[Jurisdiction]";
    const d = form.effective_date || "[Date]";
    const n = form.notes || "—";
    return { title, a, b, j, d, n };
  }, [form]);

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_380px]">
      {/* LEFT: Wizard */}
      <div>
        <Stepper step={step} total={TOTAL} />

        <form method="POST" action="/api/generate-draft" className="space-y-6">
          {/* keep hidden inputs so POST receives all values */}
          {Object.entries(form).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} readOnly />
          ))}

          {/* STEP CONTENT */}
          {step === 1 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Type</label>
              <div className="border-b">
                <select
                  className="w-full px-0 py-2 outline-none bg-transparent"
                  value={form.template}
                  onChange={(e) => update("template", e.target.value)}
                >
                  <option>NDA</option>
                  <option>Service Agreement</option>
                  <option>Contract</option>
                  <option>IP Assignment</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name / Company</label>
              <input
                className="w-full px-0 py-2 outline-none border-b focus:border-brand"
                placeholder="Acme Technologies GmbH"
                value={form.party_a}
                onChange={(e) => update("party_a", e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Counterparty</label>
              <input
                className="w-full px-0 py-2 outline-none border-b focus:border-brand"
                placeholder="Contoso Ltd."
                value={form.party_b}
                onChange={(e) => update("party_b", e.target.value)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Jurisdiction</label>
                <input
                  className="w-full px-0 py-2 outline-none border-b focus:border-brand"
                  placeholder="England & Wales"
                  value={form.jurisdiction}
                  onChange={(e) => update("jurisdiction", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Effective date</label>
                <input
                  className="w-full px-0 py-2 outline-none border-b focus:border-brand"
                  placeholder="2025-09-01"
                  value={form.effective_date}
                  onChange={(e) => update("effective_date", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional notes / clauses</label>
              <textarea
                className="w-full px-0 py-2 outline-none border-b min-h-[120px] focus:border-brand"
                placeholder="Any special confidentiality carve-outs, delivery timelines, etc."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          )}

          {/* NAV + FOOTER NOTE */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={prev}
              disabled={step === 1}
              className="inline-flex items-center gap-2 text-sm text-neutral-700 disabled:opacity-50"
            >
              ← Previous
            </button>

            {step < TOTAL ? (
              <button type="button" onClick={next} className="rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand-hover">
                Next
              </button>
            ) : (
              <button className="rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand-hover">
                Generate draft
              </button>
            )}
          </div>

          <p className="text-xs text-neutral-500">
            Every question is important. We keep formatting tidy and professional.
          </p>
        </form>
      </div>

      {/* RIGHT: Live Preview */}
      <aside className="rounded-xl border p-5 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Live preview</h3>
          <span className="text-xs text-neutral-500">{step}/{TOTAL}</span>
        </div>
        <article className="prose max-w-none">
          <h4 className="text-lg font-semibold mb-2">{preview.title}</h4>
          <p className="text-neutral-800">
            This {preview.title} (“Agreement”) is made between <em>{preview.a}</em> and <em>{preview.b}</em>, effective <em>{preview.d}</em>.
            This Agreement is governed by the laws of <em>{preview.j}</em>.
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-neutral-800">
            <li><strong>Confidential Information.</strong> …</li>
            <li><strong>Use & Restrictions.</strong> …</li>
            <li><strong>Term & Termination.</strong> …</li>
            <li><strong>Governing Law.</strong> {preview.j}.</li>
          </ol>
          <div className="mt-4 text-sm text-neutral-600">
            <strong>Notes:</strong> {preview.n}
          </div>
        </article>
      </aside>
    </div>
  );
}
