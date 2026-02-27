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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Developer Tech
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Developer Tech is a modern web development company dedicated to
              building fast, secure, and scalable web applications. We help
              businesses transform their digital presence with responsive,
              user-friendly, and performance-driven websites.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              With expertise in React, Node.js, and MongoDB, we deliver
              comprehensive full-stack solutions that combine cutting-edge
              technology with exceptional user experience. Our commitment to
              clean code, scalability, and client satisfaction sets us apart.
            </p>

            {/* Features list */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 animate-slide-up"
                >
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - visual element */}
          <div className="relative animate-fade-in card-3d transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-10 blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 border border-blue-200 shadow-lg hover:shadow-2xl">
              <div className="space-y-8">
                {[
                  { label: "Years Experience", value: "5+" },
                  { label: "Projects Completed", value: "50+" },
                  { label: "Happy Clients", value: "40+" },
                  { label: "Team Members", value: "8+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
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
