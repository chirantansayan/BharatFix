"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const expired = params.get("expired");

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(form.username, form.password);
      router.push(user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403 || status === 404) {
        setError("Incorrect username or password.");
      } else {
        setError("Couldn't reach the server. Confirm the backend is running on port 8080.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Registry access
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          Log in
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Enter your credentials to view or manage your dockets.
        </p>

        {expired && (
          <p className="mt-4 rounded-sm border border-line-strong bg-paper-raised px-4 py-3 text-sm text-ink-soft">
            Your session expired. Please log in again.
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="username" className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Username
            </label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              required
              value={form.username}
              onChange={onChange}
              className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={onChange}
              className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink"
            />
          </div>

          {error && (
            <p className="rounded-sm border border-status-pending/40 bg-paper-raised px-3 py-2 text-sm status-pending">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-sm bg-ink px-4 py-3 text-sm font-medium text-paper transition hover:bg-[#2A3D4E] disabled:opacity-60"
          >
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          New to BharatFix?{" "}
          <Link href="/register" className="font-medium text-ink underline underline-offset-2">
            Register an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </>
  );
}
