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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-blue-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
            We offer comprehensive web development services tailored to your
            business needs
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-3d">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group card-3d p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon with gradient background */}
                <div className="mb-6 inline-block p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                  <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4">
                  {service.description}
                </p>

                {/* Detailed description - shown on hover */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300">
                  <p className="text-gray-600 text-sm py-3 border-t border-gray-200">
                    {service.details}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
