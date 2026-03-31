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
            Trust Signals
          </p>
          <h2 className="animate-slide-up text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Why clients feel confident working with Developer Tech
          </h2>
          <p className="animate-slide-up mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 animation-delay-100">
            Strong design matters, but trust is what helps visitors become real
            clients. This section highlights the way we work and support
            businesses.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            {testimonials.map((item, index) => (
              <div
                key={item.company}
                className="animate-slide-up rounded-[30px] border border-white/70 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${200 + index * 120}ms` }}
              >
                <div className="mb-5 inline-flex rounded-2xl bg-slate-950 p-4 text-cyan-300">
                  <MessageSquareQuote className="h-6 w-6" />
                </div>
                <p className="text-lg leading-8 text-slate-700">"{item.quote}"</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {item.company}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="animate-slide-up rounded-[30px] border border-slate-950 bg-slate-950 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Simple Process
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">
                Clear steps from first message to final launch
              </h3>
              <div className="mt-8 space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors duration-300 hover:bg-white/10"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400 font-semibold text-slate-950">
                      {index + 1}
                    </span>
                    <p className="text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {trustPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="animate-slide-up rounded-[26px] border border-white/70 bg-white/90 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${320 + index * 120}ms` }}
                  >
                    <div className="mb-4 inline-flex rounded-2xl bg-cyan-100 p-4 text-cyan-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-950">
                      {point.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {point.description}
                    </p>
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
