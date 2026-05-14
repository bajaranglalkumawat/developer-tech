import { LayoutDashboard, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getUserProfile } from "@/lib/user-api";

const AuthAccessButton = () => {
  const location = useLocation();
  const user = getUserProfile();

  if (location.pathname.startsWith("/admin") || location.pathname === "/login") {
    return null;
  }

  return (
    <Link
      to={user ? "/dashboard" : "/login"}
      className="fixed bottom-5 right-5 z-[80] inline-flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-5 text-sm font-extrabold text-slate-950 shadow-[0_18px_45px_rgba(8,145,178,0.35)] transition-all hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white"
    >
      {user ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
      {user ? "Dashboard" : "Login"}
    </Link>
  );
};

export default AuthAccessButton;
