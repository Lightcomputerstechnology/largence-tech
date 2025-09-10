'use client';
import { useState } from "react";
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

  function next() { setStep(s => Math.min(TOTAL, s + 1)); }
  function prev() { setStep(s => Math.max(1, s - 1)); }
  function update<K extends keyof FormState>(k: K, v: string) { setForm(f => ({ ...f, [k]: v })); }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <Stepper step={step} total={TOTAL} />

      <form method="POST" action="/api/generate-draft" className="space-y-4">
        {/* keep hidden inputs so POST receives all values */}
        {Object.entries(form).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} readOnly />
        ))}

        {step === 1 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <select
              className="w-full rounded-xl border px-3 py-2"
              value={form.template}
              onChange={e => update("template", e.target.value)}
            >
              <option>NDA</option>
              <option>Service Agreement</option>
              <option>Contract</option>
              <option>IP Assignment</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name / Company</label>
            <input
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Acme Technologies GmbH"
              value={form.party_a}
              onChange={e => update("party_a", e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Counterparty</label>
            <input
              className="w-full rounded-xl border px-3 py-2"
              placeholder="Contoso Ltd."
              value={form.party_b}
              onChange={e => update("party_b", e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Jurisdiction</label>
            <input
              className="w-full rounded-xl border px-3 py-2"
              placeholder="England & Wales"
              value={form.jurisdiction}
              onChange={e => update("jurisdiction", e.target.value)}
            />
            <label className="text-sm font-medium">Effective date</label>
            <input
              className="w-full rounded-xl border px-3 py-2"
              placeholder="2025-09-01"
              value={form.effective_date}
              onChange={e => update("effective_date", e.target.value)}
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional notes / clauses</label>
            <textarea
              className="w-full rounded-xl border px-3 py-2 min-h-[120px]"
              placeholder="Any special confidentiality carve-outs, delivery timelines, etc."
              value={form.notes}
              onChange={e => update("notes", e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={prev} disabled={step===1} className="btn-ghost disabled:opacity-50">Previous</button>
          {step < TOTAL ? (
            <button type="button" onClick={next} className="btn-primary">Next</button>
          ) : (
            <button className="btn-primary">Generate draft</button>
          )}
        </div>
      </form>
    </div>
  );
      }
