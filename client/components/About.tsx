import { CheckCircle } from "lucide-react";

const features = [
  "Clean, maintainable code following industry best practices",
  "Scalable solutions that grow with your business",
  "Fast-loading, performance-optimized applications",
  "Responsive design for all devices and screen sizes",
  "Secure applications with modern security practices",
  "Complete client satisfaction and support",
];

export default function About() {
  return (
    <section
      id="about"
      className="px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="animate-slide-up">
            <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-700 shadow-sm">
              About Us
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              About Developer Tech
            </h2>
            <p className="mb-6 text-lg leading-8 text-slate-600">
              Developer Tech is a modern web development company dedicated to
              building fast, secure, and scalable web applications. We help
              businesses transform their digital presence with responsive,
              user-friendly, and performance-driven websites.
            </p>
            <p className="mb-8 text-lg leading-8 text-slate-600">
              With expertise in React, Node.js, and MongoDB, we deliver
              comprehensive full-stack solutions that combine cutting-edge
              technology with exceptional user experience. Our commitment to
              clean code, scalability, and client satisfaction sets us apart.
            </p>

            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-4 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-cyan-600" />
                  <span className="font-medium text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400/20 via-transparent to-amber-300/20 blur-2xl" />
            <div className="relative rounded-[32px] border border-white/70 bg-slate-950 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.22)] md:p-12">
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    Studio Strength
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">
                    Built to deliver with clarity
                  </h3>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { label: "Years Experience", value: "5+" },
                  { label: "Projects Completed", value: "50+" },
                
                  { label: "Team Members", value: "8+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="mb-2 text-4xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="font-medium text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
