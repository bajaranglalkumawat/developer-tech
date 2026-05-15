import { Clock3, MessageSquareQuote, ShieldCheck, Workflow } from "lucide-react";

const testimonials = [
  {
    company: "Local Business Owner",
    quote:
      "Our website now looks much more professional and clients trust the brand faster. Communication was clear from day one.",
  },
  {
    company: "Startup Founder",
    quote:
      "The team understood the business goal, not just the design. The final website felt clean, fast, and ready to convert visitors.",
  },
];

const processSteps = [
  "Discovery call and requirement understanding",
  "Clean design direction with business-focused layout",
  "Development, testing, and mobile optimization",
  "Launch support and post-delivery guidance",
];

const trustPoints = [
  {
    title: "Fast Response",
    description: "Clear communication and quick follow-up on active projects.",
    icon: Clock3,
  },
  {
    title: "Structured Process",
    description: "Each website is built with a defined workflow from planning to launch.",
    icon: Workflow,
  },
  {
    title: "Reliable Delivery",
    description: "Modern code, responsive design, and practical business execution.",
    icon: ShieldCheck,
  },
];

export default function Trust() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="animate-fade-in mb-4 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 shadow-sm">
            Why We're Different
          </p>
          <h2 className="animate-slide-up text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Trusted by 50+ businesses across India
          </h2>
          <p className="animate-slide-up mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 animation-delay-100">
            Real businesses, real results. We focus on creating websites that convert visitors into loyal customers.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            {testimonials.map((item, index) => (
              <div
                key={item.company}
                className="animate-slide-up rounded-[30px] border border-white/70 bg-white/95 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_30px_80px_rgba(6,182,212,0.15)]"
                style={{ animationDelay: `${200 + index * 120}ms` }}
              >
                {/* Star Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>

                <p className="text-lg leading-8 text-slate-700 font-medium">"{item.quote}"</p>
                <div className="mt-6 border-t border-slate-200 pt-4 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {item.company}
                  </p>
                  <p className="text-xs text-slate-500">Verified Client</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="animate-slide-up rounded-[30px] border border-slate-950 bg-gradient-to-br from-slate-950 to-slate-900 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Our Process
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">
                Clear steps, transparent communication
              </h3>
              <div className="mt-8 space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 px-5 py-4 transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 font-semibold text-slate-950 shadow-lg">
                      {index + 1}
                    </span>
                    <p className="text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/919828920866"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                Start Your Journey
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-1 gap-4">
              {trustPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="animate-slide-up rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50"
                    style={{ animationDelay: `${400 + index * 80}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-3 text-white flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{point.title}</h4>
                        <p className="text-sm text-slate-200 mt-1 font-medium">{point.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
