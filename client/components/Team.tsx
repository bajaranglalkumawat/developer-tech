const teamMembers = [
  {
    name: "Bajarang Kumawat",
    role: "Full Stack Developer",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F651c2c5d382b408195bea1e95a57971d?format=webp&width=1600&height=2400",
  },
  {
    name: "Hemlata",
    role: "UI/UX Designer",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F43976ef7eb13410bb7ebc491b670ee6a?format=webp&width=800&height=1200",
  },
  {
    name: "Sourav Kumar Sharma",
    role: "Frontend Developer",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F815d6cefb944435d9f55f149ecfe8d79?format=webp&width=800&height=1200",
  },
 
];

export default function Team() {
  return (
    <section
      id="team"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Talented professionals dedicated to building exceptional web
            solutions
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 section-3d">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group team-card-3d animate-slide-up transition-transform duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image container with hover effect */}
              <div className="mb-6 overflow-hidden rounded-2xl bg-gray-200 h-72 sm:h-80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Member info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team description */}
        <div className="card-3d mt-20 p-8 bg-white rounded-2xl border border-gray-200 animate-slide-up transition-transform duration-500 shadow-lg hover:shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Why Choose Our Team?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 section-3d">
            <div className="text-center card-3d transition-transform duration-500 p-4 rounded-lg hover:shadow-lg">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                10+
              </div>
              <p className="text-gray-600">Years of Combined Experience</p>
            </div>
            <div className="text-center card-3d transition-transform duration-500 p-4 rounded-lg hover:shadow-lg">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                100+
              </div>
              <p className="text-gray-600">Successful Projects Delivered</p>
            </div>
            <div className="text-center card-3d transition-transform duration-500 p-4 rounded-lg hover:shadow-lg">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-600">Dedicated Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
