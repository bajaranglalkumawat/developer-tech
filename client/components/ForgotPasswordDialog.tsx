import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { UserApiError, setUserSession, userApiFetch, UserProfile } from "@/lib/user-api";
import type { UserForgotPasswordResponse, UserResetPasswordResponse } from "@shared/api";

type ForgotPasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultEmail?: string;
  onSuccess?: () => void;
};

function handleSendResetError(error: unknown, setCooldownSec: (seconds: number) => void) {
  if (error instanceof UserApiError) {
    if (error.retryAfterSec) {
      setCooldownSec(error.retryAfterSec);
      toast.error(`${error.message} (${error.retryAfterSec}s remaining)`);
      return;
    }
    if (error.sendError) {
      toast.error(`${error.message} (${error.sendError})`);
      return;
    }
  }
  toast.error(error instanceof Error ? error.message : "Could not send reset code");
}

const ForgotPasswordDialog = ({
  open,
  onOpenChange,
  defaultEmail = "",
  onSuccess,
}: ForgotPasswordDialogProps) => {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldownSec, setCooldownSec] = useState(0);

  useEffect(() => {
    if (open && defaultEmail) {
      setEmail(defaultEmail);
    }
  }, [open, defaultEmail]);

  useEffect(() => {
    if (cooldownSec <= 0) return;
    const timer = window.setTimeout(() => {
      setCooldownSec((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [cooldownSec]);

  const resetState = () => {
    setStep("email");
    setOtp("");
    setPassword("");
    setLoading(false);
    setResendLoading(false);
    setCooldownSec(0);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetState();
    onOpenChange(next);
  };

  const sendResetCode = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Enter your email address");
      return false;
    }

    await userApiFetch<UserForgotPasswordResponse>("/api/user-auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email: trimmed }),
    });
    setEmail(trimmed);
    toast.success("If an account exists, a reset code was sent to your email");
    return true;
  };

  const requestOtp = async (event: FormEvent) => {
    event.preventDefault();
    if (cooldownSec > 0) return;

    setLoading(true);
    try {
      const sent = await sendResetCode();
      if (sent) setStep("reset");
    } catch (error) {
      handleSendResetError(error, setCooldownSec);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendLoading || cooldownSec > 0 || !email.trim()) return;

    setResendLoading(true);
    try {
      await sendResetCode();
    } catch (error) {
      handleSendResetError(error, setCooldownSec);
    } finally {
      setResendLoading(false);
    }
  };

  const resetPassword = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await userApiFetch<UserResetPasswordResponse>("/api/user-auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), otp, password }),
      });
      const accessToken = data.accessToken ?? data.token;
      setUserSession(accessToken, data.user as UserProfile);
      toast.success("Password updated. You are signed in.");
      handleOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  const resendDisabled = resendLoading || cooldownSec > 0 || loading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{step === "email" ? "Reset password" : "Enter reset code"}</DialogTitle>
          <DialogDescription>
            {step === "email"
              ? "We will email you a 6-digit code valid for 12 minutes."
              : `Enter the code sent to ${email} and choose a new password.`}
          </DialogDescription>
        </DialogHeader>

        {step === "email" ? (
          <form onSubmit={requestOtp} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-11"
              />
            </label>
            <Button type="submit" className="h-11 w-full" disabled={loading || cooldownSec > 0}>
              {loading
                ? "Sending..."
                : cooldownSec > 0
                  ? `Send reset code (${cooldownSec}s)`
                  : "Send reset code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={resetPassword} className="space-y-4">
            <OtpInput otp={otp} setOtp={setOtp} />
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">New password</span>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
                className="h-11"
              />
            </label>
            <Button type="submit" className="h-11 w-full" disabled={loading || otp.length !== 6}>
              {loading ? "Updating..." : "Update password"}
            </Button>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="text-sm font-semibold text-cyan-700 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={resendOtp}
                disabled={resendDisabled}
              >
                {resendLoading
                  ? "Sending..."
                  : cooldownSec > 0
                    ? `Resend reset code (${cooldownSec}s)`
                    : "Resend reset code"}
              </button>
              <button
                type="button"
                className="text-sm font-semibold text-slate-600 hover:text-slate-950"
                onClick={() => setStep("email")}
              >
                Use a different email
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

function OtpInput({ otp, setOtp }: { otp: string; setOtp: (value: string) => void }) {
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

export default ForgotPasswordDialog;
