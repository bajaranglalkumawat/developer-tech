import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearToken } from "@/lib/admin-api";
import { LayoutDashboard, FileText, FolderKanban, Mail, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/blogs", label: "Blogs", icon: FileText },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/contacts", label: "Contacts", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-bold">Developer Tech CMS</h2>
          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                    location.pathname.startsWith(link.to)
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => {
              clearToken();
              navigate("/admin/login", { replace: true });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </aside>
        <main className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
