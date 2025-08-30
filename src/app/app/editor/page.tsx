import { createServerSupabase } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import UsageBadge from "@/components/UsageBadge";
import PremiumNotice from "@/components/PremiumNotice"; // <-- add this

export default async function EditorPage({ searchParams }: { searchParams: { id?: string } }) {
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) redirect("/sign-in");

  let draft: any = null;
  if (searchParams?.id) {
    const { data } = await supa.from("drafts").select("*").eq("id", searchParams.id).single();
    draft = data || null;
  }

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6">
      <div className="rounded-xl border p-5 min-h-[480px]">
        <div className="flex items-center justify-between mb-3">
          <a href="/app" className="text-sm underline">← Back to app</a>
          <UsageBadge />
        </div>
        <h2 className="font-semibold mb-4">{draft?.title || "Draft preview"}</h2>

        <article className="prose max-w-none">
          {draft?.content ? (
            <p className="text-neutral-800 whitespace-pre-wrap">{draft.content}</p>
          ) : (
            <>
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
              <p className="text-neutral-700 text-sm mt-6">
                Formatting is kept clean and tidy. (Final wording will be generated.)
              </p>
            </>
          )}
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
          <a href={`/api/export/pdf?id=${draft?.id ?? ""}`} className="rounded-xl bg-[var(--primary)] text-white px-4 py-2" target="_blank">Export PDF</a>
          <a href={`/api/export/docx?id=${draft?.id ?? ""}`} className="rounded-xl border px-4 py-2" target="_blank">Export DOCX</a>
        </div>

        {/* Premium notice shows only for non-Pro users */}
        <PremiumNotice />
      </aside>
    </div>
  );
                }
