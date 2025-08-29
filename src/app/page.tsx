export default function Home() {
  return (
    <section className="grid gap-8 md:grid-cols-2 items-center">
      <div className="space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Draft Custom Legal Docs in Minutes.</h1>
        <p className="text-lg text-neutral-700">
          AI-guided drafting for freelancers, founders and small teams. Professional formatting, DOCX/PDF export.
        </p>
        <div className="flex gap-3">
          <a className="rounded-xl bg-[var(--primary)] px-5 py-3 text-white" href="/sign-up">Get Started Free</a>
          <a className="rounded-xl border px-5 py-3" href="/pricing">See Pricing</a>
        </div>
        <p className="text-sm text-neutral-600">3 free documents each month. No credit card required.</p>
      </div>
      <div className="rounded-xl border p-6">UI preview placeholder (replace with real screenshots)</div>
    </section>
  );
}
