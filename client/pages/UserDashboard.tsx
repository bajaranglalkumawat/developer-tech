import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock3, FolderKanban, LogOut, Mail, Send, UserRound } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  clearUserSession,
  getUserProfile,
  UserProfile,
  userApiFetch,
  userLogout,
} from "@/lib/user-api";

interface ProjectRequestItem {
  _id: string;
  title: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
  status: string;
  adminNote?: string;
  createdAt: string;
}

const UserDashboard = () => {
  const [user, setUser] = useState<UserProfile | null>(() => getUserProfile());
  const [requests, setRequests] = useState<ProjectRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    projectType: "Business Website",
    budget: "",
    timeline: "",
    details: "",
  });
  const navigate = useNavigate();

  const loadRequests = () =>
    userApiFetch<{ items: ProjectRequestItem[] }>("/api/project-requests").then((data) => {
      setRequests(data.items);
    });

  useEffect(() => {
    let active = true;

    Promise.all([
      userApiFetch<{ user: UserProfile }>("/api/user-auth/me"),
      userApiFetch<{ items: ProjectRequestItem[] }>("/api/project-requests"),
    ])
      .then(([profile, requestData]) => {
        if (!active) return;
        setUser(profile.user);
        setRequests(requestData.items);
      })
      .catch((error) => {
        clearUserSession();
        toast.error(error instanceof Error ? error.message : "Please login again");
        navigate("/login", { replace: true });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const logout = async () => {
    await userLogout();
    toast.success("Logged out");
    navigate("/", { replace: true });
  };

  const submitRequest = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await userApiFetch("/api/project-requests", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast.success("Project request submitted");
      setForm({
        title: "",
        projectType: "Business Website",
        budget: "",
        timeline: "",
        details: "",
      });
      await loadRequests();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="User Dashboard | Developer Tech"
        description="Developer Tech user dashboard."
        keywords="Developer Tech dashboard, user dashboard, client portal"
        canonical="https://developertech.in/dashboard"
        noindex
      />
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <Header />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-2 text-slate-600">
                Welcome back{user?.name ? `, ${user.name}` : ""}. Your account is ready.
              </p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="h-11 rounded-lg border-slate-300 bg-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <UserRound className="h-5 w-5 text-cyan-300" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">Profile</h2>
                  <p className="text-sm text-slate-500">
                    {loading ? "Checking account..." : "Signed in user details"}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-slate-50 p-4">
                  <span className="block font-semibold text-slate-500">Name</span>
                  <span className="mt-1 block text-slate-950">{user?.name ?? "User"}</span>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <span className="flex items-center gap-2 font-semibold text-slate-500">
                    <Mail className="h-4 w-4" />
                    Email
                  </span>
                  <span className="mt-1 block text-slate-950">{user?.email ?? "-"}</span>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <span className="block font-semibold text-slate-500">Status</span>
                  <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {user?.status ?? "active"}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 text-slate-950">
                  <FolderKanban className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">New Project Request</h2>
                  <p className="text-sm text-slate-500">
                    Share project details with the Developer Tech team.
                  </p>
                </div>
              </div>

              <form onSubmit={submitRequest} className="space-y-4">
                <Input
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  placeholder="Project title"
                  required
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Select
                    value={form.projectType}
                    onValueChange={(projectType) => setForm({ ...form, projectType })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business Website">Business Website</SelectItem>
                      <SelectItem value="Ecommerce Website">Ecommerce Website</SelectItem>
                      <SelectItem value="Web Application">Web Application</SelectItem>
                      <SelectItem value="SEO/Digital Marketing">SEO/Digital Marketing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={form.budget}
                    onChange={(event) => setForm({ ...form, budget: event.target.value })}
                    placeholder="Budget"
                    required
                  />
                  <Input
                    value={form.timeline}
                    onChange={(event) => setForm({ ...form, timeline: event.target.value })}
                    placeholder="Timeline"
                    required
                  />
                </div>
                <Textarea
                  value={form.details}
                  onChange={(event) => setForm({ ...form, details: event.target.value })}
                  placeholder="Tell us what you want to build"
                  className="min-h-32"
                  required
                />
                <Button
                  type="submit"
                  className="h-11 rounded-lg bg-slate-950 text-white hover:bg-cyan-500 hover:text-slate-950"
                  disabled={submitting}
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit request"}
                </Button>
              </form>
            </section>
          </div>

          <section className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">My Requests</h2>
                <p className="text-sm text-slate-500">
                  Track project requests submitted from your account.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
                {requests.length} total
              </span>
            </div>

            {requests.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                No project requests yet.
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((request) => (
                  <div key={request._id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="font-bold">{request.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {request.projectType} - {request.budget} - {request.timeline}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase text-slate-950">
                        <Clock3 className="h-3.5 w-3.5" />
                        {request.status}
                      </span>
                    </div>
                    <p className="mt-3 whitespace-pre-line text-sm text-slate-600">
                      {request.details}
                    </p>
                    {request.adminNote ? (
                      <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                        Admin note: {request.adminNote}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
