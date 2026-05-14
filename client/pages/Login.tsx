import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setUserSession, userApiFetch, UserProfile } from "@/lib/user-api";

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/user-auth/login" : "/api/user-auth/register";
      const payload =
        mode === "login"
          ? { email, password }
          : { name, email, password };

      const data = await userApiFetch<{ token: string; user: UserProfile }>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setUserSession(data.token, data.user);
      toast.success(mode === "login" ? "Login successful" : "Account created");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login | Developer Tech"
        description="Login to your Developer Tech account."
        keywords="Developer Tech login, user login, client portal"
        canonical="https://developertech.in/login"
        noindex
      />
      <Header />
      <main className="min-h-screen bg-slate-50 text-slate-950 pt-24">
        <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
          <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
            <div className="w-full max-w-md">
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>

              <div className="mb-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
                  <LockKeyhole className="h-5 w-5 text-cyan-300" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  {mode === "login" ? "Login" : "Create account"}
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {mode === "login"
                    ? "Access your Developer Tech account and project updates."
                    : "Create a Developer Tech account for your project updates."}
                </p>
              </div>

              <form onSubmit={submit} className="space-y-5">
                {mode === "register" ? (
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Full name
                    </span>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="h-12 rounded-lg border-slate-200 bg-white"
                      required
                    />
                  </label>
                ) : null}

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-12 rounded-lg border-slate-200 bg-white pl-10"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </span>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-12 rounded-lg border-slate-200 bg-white pl-10"
                      required
                    />
                  </div>
                </label>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-slate-950"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="font-semibold text-cyan-700 transition-colors hover:text-slate-950"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-slate-950 text-white hover:bg-cyan-500 hover:text-slate-950"
                  disabled={loading}
                >
                  {loading
                    ? mode === "login"
                      ? "Signing in..."
                      : "Creating account..."
                    : mode === "login"
                      ? "Sign in"
                      : "Create account"}
                </Button>

                <p className="text-center text-sm text-slate-600">
                  {mode === "login" ? "New here?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="font-semibold text-cyan-700 transition-colors hover:text-slate-950"
                  >
                    {mode === "login" ? "Create account" : "Sign in"}
                  </button>
                </p>
              </form>
            </div>
          </section>

          <section className="hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-950">
                <ShieldCheck className="h-5 w-5 text-cyan-500" />
              </span>
              <span>
                <span className="block text-lg font-extrabold">Developer Tech</span>
                <span className="block text-xs font-medium uppercase tracking-[0.28em] text-cyan-200">
                  Client Portal
                </span>
              </span>
            </Link>

            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
                Project access
              </p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight">
                One place for your website progress, messages, and delivery updates.
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  Secure account access
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  Project status updates
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
