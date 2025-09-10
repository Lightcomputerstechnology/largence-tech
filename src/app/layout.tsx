import "../styles/globals.css";

export const metadata = {
  title: "LARGENCE",
  description: "Draft custom legal documents in minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="font-semibold text-brand">LARGENCE</div>
            <nav className="space-x-4">
              <a href="/pricing">Pricing</a>
              <a
                className="inline-block rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand-hover"
                href="/sign-in"
              >
                Sign in
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t mt-16">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-600">
            © {new Date().getFullYear()} <span className="text-brand font-semibold">LARGENCE</span> ·{" "}
            <a href="#">Privacy</a> · <a href="#">Terms</a>
          </div>
        </footer>
      </body>
    </html>
  );
    }
