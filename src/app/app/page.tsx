import { createServerSupabase } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import UsageBadge from "@/components/UsageBadge";

export default async function AppHome() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create a new document</h1>
        <UsageBadge />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["NDA", "Service Agreement", "Contract", "IP Assignment"].map((t) => (
          <a
            key={t}
            href={`/app/prompt?template=${encodeURIComponent(t)}`}
            className="rounded-xl border p-4 hover:border-[var(--primary)] transition"
          >
            <div className="font-medium">{t}</div>
            <div className="text-sm text-neutral-600">Start from a guided draft</div>
          </a>
        ))}
      </div>
    </div>
  );
}
