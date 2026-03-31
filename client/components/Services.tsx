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
                className="group animate-slide-up rounded-[28px] border border-white/70 bg-white/90 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-[0_28px_70px_rgba(14,116,144,0.18)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 inline-flex rounded-2xl bg-slate-950 p-4 text-cyan-300 shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-slate-950">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-slate-950 transition-colors duration-300 group-hover:text-cyan-700">
                  {service.title}
                </h3>

                <p className="mb-5 text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
                  {service.description}
                </p>

                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm leading-7 text-slate-500">
                    {service.details}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-sm font-semibold text-cyan-700 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  <span>Built for business impact</span>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
