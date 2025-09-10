export default function PromptRows({ rows = 8 }: { rows?: number }) {
  return (
    <section className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[#F3E7CC] bg-[#FFF6E5] px-4 py-6"
        >
          <div className="mx-auto max-w-2xl flex items-center rounded-full bg-white border shadow-sm overflow-hidden">
            <input
              className="px-4 py-3 w-full outline-none"
              placeholder="What do you need?"
            />
            <button
              className="m-1 w-10 h-10 rounded-full bg-brand text-white grid place-items-center hover:bg-brand-hover"
              aria-label="Go"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
                }
