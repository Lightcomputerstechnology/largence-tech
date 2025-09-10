export default function Features() {
  return (
    <section id="learn" className="grid gap-10 md:grid-cols-2 items-center">
      {/* Left: big input mock with red round arrow */}
      <div className="relative">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 mb-3">LARGENCE INPUT</div>
          <div className="rounded-2xl border bg-white p-3">
            <div className="flex items-center rounded-full bg-white border shadow-sm overflow-hidden">
              <input
                className="px-4 py-3 w-full outline-none"
                placeholder="What do you need? e.g., Producer Agreement for a single"
              />
              <button
                className="m-1 w-10 h-10 rounded-full bg-brand text-white grid place-items-center hover:bg-brand-hover"
                aria-label="Generate"
                title="Generate"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="mt-4 rounded-xl border bg-[#FFF6E5] p-3">
              <div className="text-xs text-neutral-600 mb-1">Suggestion</div>
              <div className="text-sm text-neutral-800">
                “NDA for contractor sharing source files and assets.”
              </div>
            </div>
          </div>

          {/* Small badges row */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-neutral-100 border">Tidy formatting</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 border">PDF / DOCX</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 border">Usage limits enforced</span>
          </div>
        </div>

        {/* Edge accent rails (right side) */}
        <div className="hidden md:block absolute -right-6 top-6 h-[220px] w-2 rounded-full bg-brand" />
        <div className="hidden md:block absolute -right-10 top-10 h-[180px] w-2 rounded-full bg-[#1EBE8E]" />
        <div className="hidden md:block absolute -right-14 top-14 h-[140px] w-2 rounded-full bg-[#3A7BFF]" />
      </div>

      {/* Right: copy + mini features */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold leading-tight">
          Largence makes sure paperwork <span className="text-brand">doesn’t slow you down.</span>
        </h2>
        <p className="text-neutral-700">
          Answer a few questions, review a clean preview, and export. Every step stays tidy and consistent with your brand.
        </p>

        <ul className="grid gap-3">
          <li className="card p-4">
            <div className="font-semibold">Producer Agreement</div>
            <p className="text-sm text-neutral-700">Fast, clear terms for artists and producers.</p>
          </li>
          <li className="card p-4">
            <div className="font-semibold">AI Suggestions (coming soon)</div>
            <p className="text-sm text-neutral-700">High-to-low priority edits after your first draft.</p>
          </li>
          <li className="card p-4">
            <div className="font-semibold">Exports that look professional</div>
            <p className="text-sm text-neutral-700">DOCX and PDF with consistent spacing and headings.</p>
          </li>
        </ul>

        <div className="flex gap-3">
          <a className="rounded-xl bg-brand px-5 py-3 text-white hover:bg-brand-hover" href="/sign-up">Get Started</a>
          <a className="rounded-xl border px-5 py-3 hover:border-brand hover:text-brand" href="/pricing">See Pricing</a>
        </div>
      </div>
    </section>
  );
      }
