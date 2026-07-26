"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const teamMembers = [
  {
    name: "Chirantan Sayan",
    role: "Full Stack Developer",
    github: "https://github.com/chirantansayan",
  },
  {
    name: "Andy",
    role: "Full Stack Developer",
    github: "https://github.com/Andy00000001",
  },
  {
    name: "Raghav Gangrade",
    role: "Frontend Developer",
    github: "https://github.com/raghav-gangrade",
  },
  {
    name: "Suraj",
    role: "UI/UX Designer",
    github: "https://github.com/surajg7774",
  },
  {
    name: "Abhimanyu",
    role: "UI/UX Designer",
    github: "https://github.com/Abhimanyu1089",
  },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <main className="flex flex-1 justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
            BharatFix
          </p>

          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
            Meet Our Team
          </h1>

          <p className="mt-3 text-ink-soft">
            The developers behind BharatFix.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-sm border border-line-strong bg-paper-raised p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-ink">
                  {member.name}
                </h2>

                <p className="mt-2 text-sm text-ink-soft">
                  {member.role}
                </p>

                <Link
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-medium text-ink underline underline-offset-2 hover:text-brass"
                >
                  View GitHub
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}