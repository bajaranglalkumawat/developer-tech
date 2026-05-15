import { Code2, Zap, Database, Server, Package } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    details:
      "We create responsive, high-performance websites tailored to your business needs. From concept to deployment, we handle everything with industry best practices.",
    icon: Code2,
  },
  {
    title: "React Frontend",
    description: "Beautiful and interactive user interfaces with React",
    details:
      "Build engaging user experiences with React.js. We specialize in component-based architecture, state management, and creating smooth, interactive interfaces.",
    icon: Zap,
  },
  {
    title: "Backend Development",
    description: "Robust server-side applications using Node.js & Express",
    details:
      "Develop scalable server solutions with Node.js and Express. Our backend solutions ensure fast APIs, secure data handling, and optimal performance.",
    icon: Server,
  },
  {
    title: "Database Management",
    description: "Efficient data storage and management with MongoDB",
    details:
      "Design and manage NoSQL databases with MongoDB. We optimize queries, ensure data integrity, and create efficient database schemas for your applications.",
    icon: Database,
  },
  {
    title: "Full Stack Solutions",
    description: "Complete end-to-end web application development",
    details:
      "Get everything you need from a single team. Frontend, backend, database, and deployment - we deliver complete, production-ready web applications.",
    icon: Package,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-transparent px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 shadow-sm animate-fade-in">
            What We Do
          </p>
          <h2 className="mb-4 animate-fade-in text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Our Services
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600 animate-slide-up">
            We offer comprehensive web development services tailored to your
            business needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group animate-slide-up relative overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br from-white/95 to-white/85 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:border-cyan-300 hover:shadow-[0_35px_80px_rgba(6,182,212,0.2)] hover:bg-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-4 text-white shadow-[0_16px_36px_rgba(6,182,212,0.25)] transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(6,182,212,0.4)] group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold bg-gradient-to-r from-slate-950 to-slate-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-700 group-hover:to-blue-600">
                    {service.title}
                  </h3>

                  <p className="mb-5 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 font-medium">
                    {service.description}
                  </p>

                  <div className="border-t border-slate-200 pt-4 mb-6">
                    <p className="text-sm leading-7 text-slate-500">
                      {service.details}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm font-semibold text-cyan-600 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                      <span>Learn more</span>
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="https://wa.me/919828920866"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      Discuss Now
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section at bottom */}
        <div className="mt-20 animate-float-up rounded-[32px] border border-white/10 bg-gradient-to-r from-slate-950 via-slate-950 to-cyan-950 p-12 text-center shadow-[0_25px_60px_rgba(6,182,212,0.15)]">
          <h3 className="text-3xl font-bold text-white mb-3">
            Ready to transform your business?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto font-medium">
            Get a free consultation on which service fits your business best. Limited availability – book your call now.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/919828920866"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-cyan-400 to-amber-300 text-slate-950 hover:shadow-[0_15px_40px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-1"
            >
              🚀 Get Free Consultation
            </a>
            <a
              href="https://wa.me/919828920866?text=I want to know about your web development services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/20 text-white hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              💬 Chat with us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
