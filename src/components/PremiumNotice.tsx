import { createServerSupabase } from "@/lib/supabaseServer";

export default async function PremiumNotice() {
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supa.from("profiles").select("plan").eq("id", user.id).maybeSingle();
  const isPro = profile?.plan === "monthly" || profile?.plan === "annual";

  if (isPro) return null;

  return (
    <div className="rounded-lg bg-[var(--ring)]/60 p-3 text-sm text-neutral-700">
      <strong>Premium (coming soon):</strong> AI suggestions after the draft (prioritized high → low).{" "}
      <a href="/pricing" className="underline">Upgrade</a> to unlock when it launches.
    </div>
  );
}
