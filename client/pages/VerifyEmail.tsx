import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, MailWarning, ShieldCheck } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import type { UserVerifyEmailResponse } from "@shared/api";

type VerifyState = "loading" | "success" | "error";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [state, setState] = useState<VerifyState>("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setState("error");
      setMessage("Verification link is invalid. Open the link from your email or request a new one.");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(
          `/api/user-auth/verify-email?token=${encodeURIComponent(token)}`,
        );
        const data = (await response.json()) as UserVerifyEmailResponse;

        if (cancelled) return;

        if (response.ok && data.verified) {
          setState("success");
          setMessage(data.message);
          return;
        }

        setState("error");
        setMessage(data.message ?? "Verification failed.");
      } catch {
        if (!cancelled) {
          setState("error");
          setMessage("Could not verify your email. Please try again later.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <>
      <SEO
        title="Verify Email | Developer Tech"
        description="Verify your Developer Tech account email."
        keywords="Developer Tech email verification"
        noindex
      />
      <Header />
      <main className="min-h-screen bg-slate-50 pt-24 text-slate-950">
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950 text-white">
            {state === "success" ? (
              <CheckCircle2 className="h-7 w-7 text-cyan-300" />
            ) : state === "error" ? (
              <MailWarning className="h-7 w-7 text-amber-300" />
            ) : (
              <ShieldCheck className="h-7 w-7 animate-pulse text-cyan-300" />
            )}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">
            {state === "loading"
              ? "Verifying email"
              : state === "success"
                ? "Email verified"
                : "Verification failed"}
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">{message}</p>

          {state !== "loading" ? (
            <Button
              asChild
              className="mt-8 h-12 rounded-lg bg-slate-950 px-8 text-white hover:bg-cyan-500 hover:text-slate-950"
            >
              <Link to="/login">{state === "success" ? "Sign in" : "Go to login"}</Link>
            </Button>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default VerifyEmail;
