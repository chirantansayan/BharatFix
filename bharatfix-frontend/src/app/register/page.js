"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { registerUser } from "@/lib/endpoints";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await registerUser(form);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409 || status === 400) {
        setError("That username or email is already registered.");
      } else {
        setError("Couldn't reach the server. Confirm the backend is running on port 8080.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
            New citizen record
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
            Register
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Create an account to file and track civic complaints.
          </p>

          {success ? (
            <p className="mt-8 rounded-sm border border-status-resolved/40 bg-paper-raised px-4 py-3 text-sm status-resolved">
              Account created. Redirecting you to log in…
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="username" className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  required
                  value={form.username}
                  onChange={onChange}
                  className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
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
                  required
                  value={form.password}
                  onChange={onChange}
                  className="mt-1.5 w-full rounded-sm border border-line-strong bg-paper-raised px-3 py-2.5 text-sm text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                />
              </div>
              <div>
                <label htmlFor="confirm" className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
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
                {submitting ? "Creating account…" : "Create account"}
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-ink-soft">
            Already registered?{" "}
            <Link href="/login" className="font-medium text-ink underline underline-offset-2">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
