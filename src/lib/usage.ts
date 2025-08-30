import dayjs from "dayjs";
import { createServerSupabase } from "./supabaseServer";

export async function getUsage() {
  const supa = createServerSupabase();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return { user: null, plan: "free", used: 0, limit: 0 };

  const start = dayjs().startOf("month").toISOString();
  const end = dayjs().endOf("month").toISOString();

  // profile (plan)
  const { data: profile } = await supa
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .maybeSingle();

  const plan = (profile?.plan || "free") as "free" | "monthly" | "annual";
  const limit = plan === "free" ? 3 : 30;

  // drafts used
  const { count } = await supa
    .from("drafts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", start)
    .lte("created_at", end);

  return { user, plan, used: count ?? 0, limit };
    }
