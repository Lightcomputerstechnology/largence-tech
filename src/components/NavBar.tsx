export default function NavBar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight">Largence</a>
        <div className="flex items-center gap-3 text-sm">
          <a href="/pricing" className="underline">Pricing</a>
          <a href="/sign-in" className="rounded-xl border px-3 py-1">Sign in</a>
          <a href="/sign-up" className="btn-primary">Get Started</a>
        </div>
      </nav>
    </header>
  );
}
