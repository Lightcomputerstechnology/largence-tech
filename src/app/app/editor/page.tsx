import { createServerSupabase } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function EditorPage() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6">
      <div className="rounded-xl border p-5 min-h-[480px]">
        <h2 className="font-semibold mb-4">Draft preview</h2>
        <article className="prose max-w-none">
          <h3 className="text-xl font-semibold">Non-Disclosure Agreement</h3>
          <p className="text-neutral-800">
            This Agreement (“Agreement”) is made between <em>[Your Name/Company]</em> and <em>[Counterparty]</em>,
            effective <em>[Date]</em>. The Parties agree as follows:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Confidential Information.</strong> …</li>
            <li><strong>Permitted Use.</strong> …</li>
            <li><strong>Term & Termination.</strong> …</li>
            <li><strong>Governing Law.</strong> <em>[Jurisdiction]</em>.</li>
          </ol>
          <p className="text-neutral-700 text-sm mt-6">Formatting is kept clean and tidy. (Final wording will be generated.)</p>
        </article>
      </div>

      <aside className="rounded-xl border p-5 space-y-4">
        <h3 className="font-semibold">Variables</h3>
        <div className="grid gap-2">
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Your Name/Company" />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Counterparty" />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Date" />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Jurisdiction" />
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl bg-[var(--primary)] text-white px-4 py-2">Export PDF</button>
          <button className="rounded-xl border px-4 py-2">Export DOCX</button>
        </div>

        <div className="rounded-lg bg-[var(--ring)]/60 p-3 text-sm text-neutral-700">
          <strong>Premium (later):</strong> AI suggestions after the draft (prioritized from high → low).
        </div>
      </aside>
    </div>
  );
          }
