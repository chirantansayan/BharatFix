"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-4 z-50 mx-4 rounded-2xl border border-line bg-paper-raised/90 shadow-lg shadow-ink/10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-ink bg-ink font-mono text-sm font-semibold text-paper">
            BF
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            BharatFix
          </span>
        </Link>

        <nav className="flex items-center gap-7 text-xs font-medium uppercase tracking-[0.12em]">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-line-strong p-2 text-ink-soft transition hover:border-ink hover:text-ink"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          {!user && (
            <>
              <Link href="/#how-it-works" className="hidden text-ink-soft hover:text-ink sm:inline">
                How it works
              </Link>
              <Link href="/login" className="text-ink-soft hover:text-ink">
                Log in
              </Link>
              <Link
                href="/register"
                className="border border-ink px-5 py-2 tracking-[0.12em] text-ink transition hover:bg-ink hover:text-paper"
              >
                Register
              </Link>
              <Link
                href="/contact"
                className="border border-ink px-5 py-2 tracking-[0.12em] text-ink transition hover:bg-ink hover:text-paper"
              >
                Our Team
              </Link>
            </>
          )}

          {user && user.role === "USER" && (
            <>
              <Link href="/user/dashboard" className="text-ink-soft hover:text-ink">
                Dashboard
              </Link>
              <span className="hidden font-mono normal-case tracking-normal text-ink-soft sm:inline">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="border border-line-strong px-5 py-2 tracking-[0.12em] text-ink transition hover:border-ink"
              >
                Log out
              </button>
            </>
          )}

          {user && user.role === "ADMIN" && (
            <>
              <Link href="/admin/dashboard" className="text-ink-soft hover:text-ink">
                Admin console
              </Link>
              <span className="hidden font-mono normal-case tracking-normal text-brass sm:inline">
                {user.username} · ADMIN
              </span>
              <button
                onClick={logout}
                className="border border-line-strong px-5 py-2 tracking-[0.12em] text-ink transition hover:border-ink"
              >
                Log out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
