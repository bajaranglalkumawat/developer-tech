import { ArrowUpRight, BadgeCheck } from "lucide-react";

const teamMembers = [
  {
    title: "Strategy & Delivery",
    focus: "Planning, execution, and client communication",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F651c2c5d382b408195bea1e95a57971d?format=webp&width=1600&height=2400",
  },
  {
    title: "Design & Frontend",
    focus: "Responsive UI, interactions, and polished user journeys",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F43976ef7eb13410bb7ebc491b670ee6a?format=webp&width=800&height=1200",
  },
  {
    title: "Backend & Performance",
    focus: "Scalable architecture, APIs, and optimization",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F815d6cefb944435d9f55f149ecfe8d79?format=webp&width=800&height=1200",
  },
];

const teamStrengths = [
  "Business-first project planning",
  "Modern UI with production-grade performance",
  "Clear communication from start to launch",
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-slate-950 py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl animate-fade-in">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium tracking-[0.24em] text-cyan-300 uppercase">
              Our Team
            </p>
            <h2 className="mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              A focused digital team building reliable products for real
              business growth.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              We combine product thinking, clean design, and modern engineering
              to deliver websites that feel premium and perform with
              confidence.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3 lg:max-w-xl">
            {teamStrengths.map((strength, index) => (
              <div
                key={strength}
                className="animate-slide-up rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <BadgeCheck className="mb-3 h-5 w-5 text-cyan-300" />
                <p className="leading-6">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={member.title}
              className="group animate-slide-up overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/[0.07]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                <img
                  src={member.image}
                  alt={member.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-slate-900/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-sm">
                    Core Function
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {member.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <p className="text-base leading-7 text-slate-300">
                  {member.focus}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm font-medium text-slate-400">
                    Professional execution
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                    View capability
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur-sm md:grid-cols-[1.4fr_1fr]">
          <div className="animate-slide-up">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Why teams choose us
            </p>
            <h3 className="mb-4 text-3xl font-semibold text-white">
              Structured process. Premium output. Dependable support.
            </h3>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Every project is handled with a clear roadmap, design attention,
              and production-ready development standards so your website looks
              sharp and works smoothly across devices.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="mb-2 text-4xl font-semibold text-white">
                10+
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Years of combined execution experience
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="mb-2 text-4xl font-semibold text-white">
                100+
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Delivery milestones completed with care
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="mb-2 text-4xl font-semibold text-white">
                24/7
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Responsive support and project communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
