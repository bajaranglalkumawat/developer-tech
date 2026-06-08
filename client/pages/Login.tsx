import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ForgotPasswordDialog from "@/components/ForgotPasswordDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  setUserSession,
  UserApiError,
  userApiFetch,
  UserProfile,
} from "@/lib/user-api";
import type {
  PublicConfigResponse,
  UserLoginResponse,
  UserSignupSendOtpResponse,
  UserSignupVerifyResponse,
} from "@shared/api";

function useGoogleClientId(): { clientId: string; loading: boolean } {
  const buildTimeId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ?? "";
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/config/public");
        if (response.ok) {
          const data = (await response.json()) as PublicConfigResponse;
          const serverId = data.googleClientId?.trim() ?? "";
          if (!cancelled) {
            setClientId(serverId || buildTimeId);
          }
          return;
        }
      } catch {
        // Fall back to build-time client ID below
      }
      if (!cancelled) {
        setClientId(buildTimeId);
      }
    })().finally(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [buildTimeId]);

  return { clientId, loading };
}

function googleAuthErrorMessage(error: unknown): string {
  if (error instanceof UserApiError) {
    if (error.code === "DISPOSABLE_EMAIL") return error.message;
    if (error.code === "GOOGLE_ACCOUNT_MISMATCH") {
      return `${error.message} Sign in with the Google account you used before, or use email and password.`;
    }
    if (error.code === "GOOGLE_AUTH_FAILED") {
      if (error.message.toLowerCase().includes("not configured")) {
        return "Google sign-in is not available right now. Use email and password instead.";
      }
      if (
        error.message.toLowerCase().includes("mismatch") ||
        error.message.toLowerCase().includes("client id")
      ) {
        return "Google sign-in could not be verified. Try again in a few seconds or use email and password.";
      }
      return error.message;
    }
    if (error.code === "ACCOUNT_DISABLED") return error.message;
    if (error.retryAfterSec) {
      return `${error.message} (${error.retryAfterSec}s remaining)`;
    }
    return error.message;
  }
  return error instanceof Error ? error.message : "Google sign-in failed";
}

type LoginProps = {
  googleClientId: string;
};

const Login = ({ googleClientId }: LoginProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [registerStep, setRegisterStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupOtp, setSignupOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldownSec, setResendCooldownSec] = useState(0);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [showResendPrompt, setShowResendPrompt] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const navigate = useNavigate();
  const googleSignInInProgress = useRef(false);

  useEffect(() => {
    if (resendCooldownSec <= 0) return;
    const timer = window.setTimeout(() => {
      setResendCooldownSec((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [resendCooldownSec]);

  const completeLogin = (data: UserLoginResponse, successMessage = "Login successful") => {
    const accessToken = data.accessToken ?? data.token;
    setUserSession(accessToken, data.user as UserProfile);
    toast.success(successMessage);
    navigate("/", { replace: true });
  };

  const signInWithGoogle = async (idToken: string) => {
  if (googleSignInInProgress.current) return;

  googleSignInInProgress.current = true;
  setLoading(true);

  try {
    const data = await userApiFetch<UserLoginResponse>(
      "/api/user-auth/google",
      {
        method: "POST",
        body: JSON.stringify({ idToken }),
      },
    );

    completeLogin(data, "Signed in successfully");
  } catch (error) {
    toast.error(googleAuthErrorMessage(error));
  } finally {
    googleSignInInProgress.current = false;
    setLoading(false);
  }
};
  const handleSignupSendError = (error: unknown) => {
    if (error instanceof UserApiError) {
      if (error.code === "DISPOSABLE_EMAIL") {
        toast.error(error.message);
        return;
      }
      if (error.retryAfterSec) {
        setResendCooldownSec(error.retryAfterSec);
        toast.error(`${error.message} (${error.retryAfterSec}s remaining)`);
        return;
      }
      if (error.sendError) {
        toast.error(`${error.message} (${error.sendError})`);
        return;
      }
    }
    toast.error(error instanceof Error ? error.message : "Could not send verification code");
  };

  const sendSignupOtp = async () => {
    const data = await userApiFetch<UserSignupSendOtpResponse>("/api/user-auth/signup/send-otp", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setEmail(data.email);
    if (data.retryAfterSec) {
      setResendCooldownSec(data.retryAfterSec);
    }
    return true;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setShowResendPrompt(false);

    try {
      if (mode === "register") {
        const sent = await sendSignupOtp();
        if (sent) {
          setRegisterStep("otp");
          setSignupOtp("");
          toast.success("Verification code sent. Check your inbox.");
        }
        return;
      }

      const data = await userApiFetch<UserLoginResponse>("/api/user-auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      completeLogin(data);
    } catch (error) {
      if (mode === "register") {
        handleSignupSendError(error);
        return;
      }
      if (error instanceof UserApiError) {
        if (error.code === "EMAIL_NOT_VERIFIED") {
          const targetEmail = error.email ?? email;
          if (targetEmail) {
            setEmail(targetEmail);
          }
          if (error.verificationEmailSent && targetEmail) {
            setPendingVerificationEmail(targetEmail);
            toast.success("We sent a new verification link. Check your inbox and spam folder.");
            return;
          }
          setShowResendPrompt(true);
          if (error.retryAfterSec) {
            setResendCooldownSec(error.retryAfterSec);
            toast.error(`${error.message} (${error.retryAfterSec}s remaining)`);
            return;
          }
          if (error.sendError) {
            toast.error(`${error.message} (${error.sendError})`);
            return;
          }
          toast.error(error.message);
          return;
        }
        if (error.retryAfterSec) {
          setResendCooldownSec(error.retryAfterSec);
          toast.error(`${error.message} (${error.retryAfterSec}s remaining)`);
          return;
        }
        if (error.sendError) {
          toast.error(`${error.message} (${error.sendError})`);
          return;
        }
      }
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const verifySignupOtp = async (event: FormEvent) => {
    event.preventDefault();
    if (signupOtp.length !== 6) return;

    setLoading(true);
    try {
      const data = await userApiFetch<UserSignupVerifyResponse>(
        "/api/user-auth/signup/verify-and-register",
        {
          method: "POST",
          body: JSON.stringify({ email, otp: signupOtp }),
        },
      );
      const accessToken = data.accessToken ?? data.token;
      setUserSession(accessToken, data.user as UserProfile);
      toast.success("Account created successfully");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendSignupOtp = async () => {
    if (resendLoading || resendCooldownSec > 0) return;

    setResendLoading(true);
    try {
      const sent = await sendSignupOtp();
      if (sent) {
        toast.success("Verification code sent. Check your inbox.");
      }
    } catch (error) {
      handleSignupSendError(error);
    } finally {
      setResendLoading(false);
    }
  };

  const resendVerification = async () => {
    const targetEmail = pendingVerificationEmail ?? email;
    if (!targetEmail) {
      toast.error("Enter your email address first");
      return;
    }
    if (resendCooldownSec > 0) return;

    setResendLoading(true);
    try {
      await userApiFetch("/api/user-auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email: targetEmail }),
      });
      setPendingVerificationEmail(targetEmail);
      toast.success("Verification email sent. Check your inbox and spam folder.");
    } catch (error) {
      if (error instanceof UserApiError && error.retryAfterSec) {
        setResendCooldownSec(error.retryAfterSec);
        toast.error(`${error.message} (${error.retryAfterSec}s remaining)`);
      } else if (error instanceof UserApiError && error.sendError) {
        toast.error(`${error.message} (${error.sendError})`);
      } else {
        toast.error(error instanceof Error ? error.message : "Could not resend verification email");
      }
    } finally {
      setResendLoading(false);
    }
  };

  const resetToForm = () => {
    setPendingVerificationEmail(null);
    setShowResendPrompt(false);
    setResendCooldownSec(0);
    setRegisterStep("form");
    setSignupOtp("");
    setMode("login");
  };

  const backToSignupForm = () => {
    setRegisterStep("form");
    setSignupOtp("");
    setResendCooldownSec(0);
  };

  if (pendingVerificationEmail) {
    return (
      <>
        <SEO
          title="Verify Email | Developer Tech"
          description="Verify your Developer Tech account email."
          keywords="Developer Tech email verification"
          noindex
        />
        <Header />
        <main className="min-h-screen bg-slate-50 text-slate-950 pt-24">
          <VerifyPendingBlock
            email={pendingVerificationEmail}
            resendLoading={resendLoading}
            resendCooldownSec={resendCooldownSec}
            onResend={resendVerification}
            onBack={resetToForm}
          />
        </main>
      </>
    );
  }

  if (mode === "register" && registerStep === "otp") {
    return (
      <>
        <SEO
          title="Verify Email | Developer Tech"
          description="Verify your email to finish creating your Developer Tech account."
          keywords="Developer Tech signup verification"
          noindex
        />
        <Header />
        <main className="min-h-screen bg-slate-50 text-slate-950 pt-24">
          <div className="mx-auto flex max-w-md flex-col px-4 py-16">
            <SignupBackButton onClick={backToSignupForm} label="Back to signup" />
            <SignupMailIcon />
            <h1 className="text-3xl font-extrabold tracking-tight">Enter verification code</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-slate-950">{email}</span>. It expires in 12
              minutes.
            </p>
            <form onSubmit={verifySignupOtp} className="mt-8 space-y-5">
              <SignupOtpInput otp={signupOtp} setOtp={setSignupOtp} />
              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-slate-950 text-white hover:bg-cyan-500 hover:text-slate-950"
                disabled={loading || signupOtp.length !== 6}
              >
                {loading ? "Creating account..." : "Verify and create account"}
              </Button>
              <button
                type="button"
                onClick={resendSignupOtp}
                disabled={resendLoading || resendCooldownSec > 0 || loading}
                className="text-sm font-semibold text-cyan-700 transition-colors hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resendLoading
                  ? "Sending..."
                  : resendCooldownSec > 0
                    ? `Resend code (${resendCooldownSec}s)`
                    : "Resend code"}
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

  const page = (
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
                    : "Create a Developer Tech account. We will email you a 6-digit code to verify your address."}
                </p>
              </div>

              {showResendPrompt ? (
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                  <p>Your email is not verified yet.</p>
                  <button
                    type="button"
                    onClick={resendVerification}
                    disabled={resendLoading || resendCooldownSec > 0}
                    className="mt-2 font-semibold text-cyan-800 underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {resendLoading
                      ? "Sending..."
                      : resendCooldownSec > 0
                        ? `Resend verification email (${resendCooldownSec}s)`
                        : "Resend verification email"}
                  </button>
                </div>
              ) : null}

              {googleClientId ? (
                <div className="mb-6 space-y-5">
                  <div className="w-full">
                    <GoogleLogin
                      onSuccess={(response) => {
                        if (googleSignInInProgress.current || loading) return;
                        if (!response.credential) {
                          toast.error("Google did not return a sign-in token. Try again.");
                          return;
                        }
                        void signInWithGoogle(response.credential);
                      }}
                      onError={() => {
                        toast.error(
                          "Google sign-in failed. Check that this site URL is allowed in Google Cloud Console (Authorized JavaScript origins), disable ad blockers, and try again.",
                        );
                      }}
                      theme="outline"
                      size="large"
                      text="continue_with"
                    />
                  </div>
                  <div className="relative text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <span className="bg-slate-50 px-2">or continue with email</span>
                    <span className="absolute inset-x-0 top-1/2 -z-10 border-t border-slate-200" />
                  </div>
                </div>
              ) : null}

              <form onSubmit={submit} className="space-y-5">
                {mode === "register" ? (
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
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
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
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
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
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

                {mode === "login" ? (
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
                      onClick={() => setForgotOpen(true)}
                      className="font-semibold text-cyan-700 transition-colors hover:text-slate-950"
                    >
                      Forgot password?
                    </button>
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-slate-950 text-white hover:bg-cyan-500 hover:text-slate-950"
                  disabled={loading}
                >
                  {loading
                    ? mode === "login"
                      ? "Signing in..."
                      : "Sending code..."
                    : mode === "login"
                      ? "Sign in"
                      : "Continue"}
                </Button>


                <p className="text-center text-sm text-slate-600">
                  {mode === "login" ? "New here?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === "login" ? "register" : "login");
                      setRegisterStep("form");
                      setShowResendPrompt(false);
                    }}
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

      <ForgotPasswordDialog
        open={forgotOpen}
        onOpenChange={setForgotOpen}
        defaultEmail={email}
        onSuccess={() => navigate("/", { replace: true })}
      />
    </>
  );

  return page;
};

function SignupBackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}

function SignupMailIcon() {
  return (
    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white">
      <Mail className="h-5 w-5 text-cyan-300" />
    </div>
  );
}

function SignupOtpInput({ otp, setOtp }: { otp: string; setOtp: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-700">6-digit code</span>
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

function VerifyPendingBlock({
  email,
  resendLoading,
  resendCooldownSec,
  onResend,
  onBack,
}: {
  email: string;
  resendLoading: boolean;
  resendCooldownSec: number;
  onResend: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white">
        <Mail className="h-5 w-5 text-cyan-300" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight">Check your email</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        We sent a verification link to <span className="font-semibold text-slate-950">{email}</span>.
        Open it to activate your account, then sign in.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-8 h-12 rounded-lg border-slate-200"
        disabled={resendLoading || resendCooldownSec > 0}
        onClick={onResend}
      >
        {resendLoading
          ? "Sending..."
          : resendCooldownSec > 0
            ? `Resend verification email (${resendCooldownSec}s)`
            : "Resend verification email"}
      </Button>
      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-sm font-semibold text-cyan-700 transition-colors hover:text-slate-950"
      >
        Back to sign in
      </button>
    </div>
  );
}

function LoginWithGoogle() {
  const { clientId, loading } = useGoogleClientId();

  if (loading || !clientId) {
    return <Login googleClientId="" />;
  }

  return (
    <GoogleOAuthProvider key={clientId} clientId={clientId}>
      <Login googleClientId={clientId} />
    </GoogleOAuthProvider>
  );
}

export default LoginWithGoogle;
