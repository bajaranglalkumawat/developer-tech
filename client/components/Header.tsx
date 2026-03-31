import { useState } from "react";
import { Menu, PhoneCall, Sparkles, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "About Us", id: "about" },
    { label: "Team", id: "team" },
    { label: "Packages", id: "packages" },
    { label: "Contact", id: "contact" },
  ];

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919828920866", "_blank");
  };

  return (
    <header className="animate-fade-in fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="animate-slide-up flex-shrink-0">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 text-left transition-opacity hover:opacity-90"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]">
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </span>
              <span>
                <span className="block text-lg font-extrabold tracking-tight text-slate-950">
                  Developer Tech
                </span>
                <span className="block text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
                  Web Studio
                </span>
              </span>
            </button>
          </div>

          <div className="hidden animate-slide-up items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.07)] md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-950 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden animate-slide-up md:block">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-slate-950"
            >
              <PhoneCall className="h-4 w-4" />
              Start a Project
            </button>
          </div>

          <button
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="animate-slide-up mt-4 space-y-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-slate-700 transition-colors hover:bg-slate-100"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleWhatsAppClick}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
            >
              <PhoneCall className="h-4 w-4" />
              Start a Project
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
