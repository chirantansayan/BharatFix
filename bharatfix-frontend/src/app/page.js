import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Globe } from "@/components/ui/globe";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const LIFECYCLE = [
  {
    stage: "Filed",
    detail:
      "A citizen submits a title, description, photo and map location. It enters the registry as PENDING.",
  },
  {
    stage: "Assigned",
    detail:
      "An administrator routes the docket to a department and an available team. Status moves to ONGOING.",
  },
  {
    stage: "Resolved",
    detail:
      "The team's work is logged, the citizen is notified, and the docket closes as RESOLVED with feedback.",
  },
];

const ROLES = [
  {
    title: "Citizens",
    description:
      "File complaints, follow the timeline, and leave feedback once a docket is resolved.",
  },
  {
    title: "Departments & teams",
    description:
      "See the dockets assigned to your team and what's still outstanding.",
  },
  {
    title: "Administrators",
    description:
      "Route every complaint to a department, assign a team, and post status updates.",
  },
];

const TESTIMONIALS = [
  {
    name: "Anjali Verma",
    designation: "Resident, Sector 12",
    ticket: "BF-04131",
    quote:
      "I filed a complaint about an overflowing bin near the market and could actually see it move from pending to assigned to resolved. No phone calls, no chasing anyone down.",
  },
  {
    name: "Rakesh Kumar",
    designation: "Resident, MG Road",
    ticket: "BF-04128",
    quote:
      "The streetlight outside our lane was dark for weeks. Filed it one evening, got a status update three days later, and it was fixed within the week.",
  },
  {
    name: "Sunita Rao",
    designation: "Ward Committee Member",
    ticket: "BF-03992",
    quote:
      "As someone who used to field complaints by hand on paper, having a registry where every docket has a number and a timeline changes how accountable the whole process feels.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-field relative overflow-hidden text-paper">
          <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-6xl flex-col px-6 py-14">
            {/* Numbered quick links */}
            <nav className="hidden flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 md:flex">
              <Link href="/#how-it-works" className="hover:text-white">01 · How it works</Link>
              <Link href="/register" className="hover:text-white">02 · File a complaint</Link>
              <Link href="/login" className="hover:text-white">03 · Track a docket</Link>
              <Link href="/#roles" className="hover:text-white">04 · For departments</Link>
            </nav>

            <div className="grid flex-1 items-center gap-8 md:grid-cols-2">
              {/* Headline block */}
              <div className="fade-up mt-16 max-w-xl md:mt-0">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass-soft">
                  Municipal Complaint Registry
                </p>
                <h1 className="mt-5 font-display text-5xl font-medium italic leading-[1.08] tracking-tight text-white sm:text-6xl">
                  Every civic issue,
                  <br /> filed, tracked, and
                  <br /> closed in the open.
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
                  BharatFix gives citizens a direct line to their municipality —
                  and gives departments a working docket instead of a lost
                  complaint form.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="border border-white px-7 py-3 text-sm tracking-wide text-white transition hover:bg-black hover:text-near-black"
                  >
                    Register to file a complaint
                  </Link>
                  <Link
                    href="/login"
                    className="border border-transparent px-7 py-3 text-sm tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
                  >
                    Log in
                  </Link>
                </div>

                {/* Quote line, editorial signature */}
                <p className="fade-up mt-14 max-w-sm font-display text-lg italic text-white/70">
                  &ldquo;A city that answers its citizens is a city that works.&rdquo;
                </p>
              </div>

              {/* Globe — a registry that spans every ward */}
              <div className="relative hidden md:block">
                <Globe />
                <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Every ward, one registry
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Big wordmark — text hover effect */}
        <section className="border-b border-line bg-near-black">
          <div className="mx-auto flex h-[220px] max-w-6xl items-center justify-center px-6 sm:h-[280px]">
            <TextHoverEffect text="BHARATFIX" duration={1} />
          </div>
        </section>

        {/* Signature docket showcase */}
        <section className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
              Signature Dockets
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              What a filed complaint looks like
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                {
                  no: "BF-04128",
                  title: "Broken streetlight, MG Road junction",
                  status: "Resolved",
                  dot: "bg-status-resolved",
                },
                {
                  no: "BF-04131",
                  title: "Overflowing bin, Sector 12 market",
                  status: "Ongoing",
                  dot: "bg-status-ongoing",
                },
                {
                  no: "BF-04137",
                  title: "Pothole near school entrance",
                  status: "Pending",
                  dot: "bg-status-pending",
                },
              ].map((d) => (
                <div key={d.no} className="docket rounded-sm p-5 pl-8">
                  <p className="font-mono text-xs text-brass">{d.no}</p>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink">
                    {d.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
                    <span className={`h-1.5 w-1.5 rounded-full ${d.dot}`} />
                    {d.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lifecycle */}
        <section id="how-it-works" className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="font-display text-2xl font-semibold text-ink">
              The life of a complaint
            </h2>
            <p className="mt-2 max-w-lg text-sm text-ink-soft">
              Three real states move a docket from citizen to closed record -
              nothing sits unassigned for long.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {LIFECYCLE.map((item, i) => (
                <div key={item.stage} className="border-t-2 border-brass pt-4">
                  <p className="font-mono text-xs text-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                    {item.stage}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roles — hover effect cards */}
        <section id="roles" className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Built for three sides of the same problem
          </h2>
          <div className="mt-10">
            <HoverEffect items={ROLES} />
          </div>
        </section>

        {/* Animated testimonials */}
        <section className="border-t border-line bg-paper-raised">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
              From the registry
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              What citizens are saying
            </h2>
            <div className="mt-12">
              <AnimatedTestimonials testimonials={TESTIMONIALS} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto max-w-6xl px-6 text-xs text-ink-soft">
          BharatFix - Made with ❤️ at CDAC
        </div>
      </footer>
    </>
  );
}
