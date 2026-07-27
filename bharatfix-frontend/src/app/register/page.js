"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { registerUser } from "@/lib/endpoints";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [confirm, setConfirm] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value.trim()) return "Username is required.";
        if (value.length < 3)
          return "Username must be at least 3 characters.";
        return "";

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email address.";
        return "";

      case "password":
        if (!value) return "Password is required.";
        if (value.length < 6)
          return "Password must be at least 6 characters.";
        return "";

      case "confirm":
        if (!value) return "Confirm your password.";
        if (value !== form.password)
          return "Passwords do not match.";
        return "";

      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {
      username: validateField("username", form.username),
      email: validateField("email", form.email),
      password: validateField("password", form.password),
      confirm: validateField("confirm", confirm),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => !e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
      ...(name === "password"
        ? {
            confirm: validateField("confirm", confirm),
          }
        : {}),
    }));
  };

  const handleConfirm = (e) => {
    const value = e.target.value;
    setConfirm(value);

    setErrors((prev) => ({
      ...prev,
      confirm: validateField("confirm", value),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setSubmitting(true);

    try {
      await registerUser(form);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 409 || status === 400) {
        setErrors({
          email: "Username or email already exists.",
        });
      } else {
        setErrors({
          email: "Unable to connect to the server.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `mt-1.5 w-full rounded-sm border bg-paper-raised px-3 py-2.5 text-sm outline-none transition-all duration-300
    ${
      errors[field]
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-300"
        : "border-line-strong focus:border-ink focus:ring-1 focus:ring-ink"
    }`;

  const Error = ({ message }) => (
    <p
      className={`overflow-hidden text-sm text-red-600 transition-all duration-300 ${
        message ? "max-h-10 mt-1 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {message}
    </p>
  );

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
            <p className="mt-8 rounded-sm border border-green-500 bg-green-50 px-4 py-3 text-sm text-green-700">
              Account created. Redirecting to login...
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-5">

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={inputClass("username")}
                />
                <Error message={errors.username} />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={inputClass("email")}
                />
                <Error message={errors.email} />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={inputClass("password")}
                />
                <Error message={errors.password} />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-ink-soft">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={handleConfirm}
                  className={inputClass("confirm")}
                />
                <Error message={errors.confirm} />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-sm bg-ink px-4 py-3 text-sm font-medium text-paper transition-all duration-300 hover:scale-[1.02] hover:bg-[#2A3D4E] active:scale-100 disabled:opacity-60"
              >
                {submitting ? "Creating account..." : "Create account"}
              </button>

            </form>
          )}

          <p className="mt-6 text-sm text-ink-soft">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-medium text-ink underline underline-offset-2"
            >
              Log in
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}