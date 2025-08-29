'use client';
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function SignIn() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMsg(error ? error.message : "Signed in, redirecting...");
    if (!error) window.location.href = "/app";
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full rounded-xl border px-3 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full rounded-xl bg-[var(--primary)] text-white py-2">Continue</button>
      </form>
      {msg && <p className="text-sm text-neutral-600">{msg}</p>}
      <a className="text-sm" href="/sign-up">Create account</a>
    </div>
  );
}
