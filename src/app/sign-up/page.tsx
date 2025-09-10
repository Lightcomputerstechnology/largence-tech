'use client';
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function SignUp() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // 👇 Always redirect back to your live app
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/`
      }
    });

    setMsg(error ? error.message : "Check your email to confirm your account.");
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-xl border px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button className="w-full rounded-xl bg-[var(--primary)] text-white py-2">
          Create account
        </button>
      </form>
      {msg && <p className="text-sm text-neutral-600">{msg}</p>}
      <p className="text-sm">
        Already have an account? <a href="/sign-in">Sign in</a>
      </p>
    </div>
  );
            }
