import { useState } from "react";
import { LayoutDashboard, LogIn, LogOut, Menu, PhoneCall, Sparkles, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { clearUserSession, getUserProfile } from "@/lib/user-api";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(() => getUserProfile());
  const navigate = useNavigate();

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

  const logout = () => {
    clearUserSession();
    setUser(null);
    setIsMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <header className="animate-fade-in fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="animate-slide-up flex flex-shrink-0 items-center gap-3">
            <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 text-left transition-opacity hover:opacity-90">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]">
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </span>
              <span>
                <span className="block text-lg font-extrabold tracking-tight text-slate-950">Developer Tech</span>
                <span className="block text-xs font-medium uppercase tracking-[0.28em] text-slate-500">Web Studio</span>
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden animate-slide-up items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.07)] lg:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-950 hover:text-white">
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg hover:bg-slate-950 hover:text-white transition-all">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button onClick={logout} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg hover:bg-slate-950 hover:text-white transition-all">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            <button onClick={handleWhatsAppClick} className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-500 hover:text-slate-950 md:inline-flex">
              <PhoneCall className="h-4 w-4" />
              Start a Project
            </button>
          </div>

          {/* Mobile Menu */}
          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 md:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className="animate-slide-up mt-4 space-y-2 rounded-3xl border border-slate-200 bg-white p-4 md:hidden">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="mb-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-100 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button onClick={logout} className="mb-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-950 hover:bg-red-200">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mb-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-100 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full rounded-2xl px-4 py-3 text-left text-slate-700 hover:bg-slate-100">
                {item.label}
              </button>
            ))}
            <button onClick={handleWhatsAppClick} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
              <PhoneCall className="h-4 w-4" />
              Start a Project
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
