import { createServerSupabase } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function AppHome() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome{user?.email ? `, ${user.email}` : ""}</h1>
      <p className="text-neutral-700">This is your app area. You’re logged in via Supabase Auth.</p>
    </div>
  );
      }
