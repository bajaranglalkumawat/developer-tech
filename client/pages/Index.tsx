import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";


export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <About />
        <Packages />

        <Contact />
       
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Company info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F671a297411b946ff807e974cafd8f3eb?format=webp&width=800&height=1200"
                  alt="Developer Tech Logo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                />
                <h3 className="text-2xl font-bold text-white">
                  Developer Tech
                </h3>
              </div>
              <p className="text-gray-400">
                Building modern, scalable web applications for your success
              </p>
              <p className="text-gray-400">Location: Jaipur, India</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>

              <ul className="space-y-2">

                <li>
                  <button
                    onClick={() =>
                      document.getElementById("home")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      document.getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-blue-400 transition-colors"
                  >
                    Services
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      document.getElementById("about")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      document.getElementById("team")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-blue-400 transition-colors"
                  >
                    Team
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      document.getElementById("packages")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-blue-400 transition-colors"
                  >
                    Packages
                  </button>
                </li>

                <li>
                  <button
                    onClick={() =>
                      document.getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </button>
                </li>

               
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Tech Stack
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>React.js</li>
                <li>Node.js & Express</li>
                <li>MongoDB</li>
                <li>Tailwind CSS</li>
                <li>Cloud Computing</li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            © 2024 Developer Tech. All rights reserved.
          </div>

        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}