import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Services from "@/components/Services";
import Team from "@/components/Team";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Index() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <About />
        <Packages />
        <Contact />
      </main>

      <footer className="bg-slate-950 px-4 py-16 text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="animate-slide-up">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F671a297411b946ff807e974cafd8f3eb?format=webp&width=800&height=1200"
                  alt="Developer Tech Logo"
                  className="h-12 w-12 rounded-2xl border border-cyan-300/40 object-cover"
                />
                <h3 className="text-2xl font-bold text-white">
                  Developer Tech
                </h3>
              </div>
              <p className="text-slate-400">
                Building modern, scalable web applications for your success
              </p>
              <p className="mt-2 text-slate-400">Location: Jaipur, India</p>
            </div>

            <div className="animate-slide-up animation-delay-100">
              <h4 className="mb-4 text-lg font-semibold text-white">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  ["Home", "home"],
                  ["Services", "services"],
                  ["About Us", "about"],
                  ["Team", "team"],
                  ["Packages", "packages"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <li key={id}>
                    <button
                      onClick={() =>
                        document
                          .getElementById(id)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="transition-colors hover:text-cyan-300"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-slide-up animation-delay-200">
              <h4 className="mb-4 text-lg font-semibold text-white">
                Tech Stack
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>React.js</li>
                <li>Node.js & Express</li>
                <li>MongoDB</li>
                <li>Tailwind CSS</li>
                <li>Cloud Computing</li>
              </ul>
            </div>
          </div>

          <div className="animate-fade-in border-t border-white/10 pt-8 text-center text-slate-500">
            Copyright 2024 Developer Tech. All rights reserved.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
