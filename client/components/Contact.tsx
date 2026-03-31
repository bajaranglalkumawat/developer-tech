import { FormEvent, useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { QuerySubmitRequest, QuerySubmitResponse } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").trim();

function getApiUrl(path: string) {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1";

    if (isLocalhost) {
      return path;
    }
  }

  if (!apiBaseUrl) {
    return path;
  }

  return `${apiBaseUrl.replace(/\/+$/, "")}${path}`;
}

const initialForm: QuerySubmitRequest = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<QuerySubmitRequest>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919828920866", "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:kumawatbajaranglal736@gmail.com";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(getApiUrl("/api/query"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let result: QuerySubmitResponse | null = null;

      if (responseText) {
        try {
          result = JSON.parse(responseText) as QuerySubmitResponse;
        } catch {
          result = null;
        }
      }

      if (!response.ok || !result.success) {
        setStatus({
          ok: false,
          text:
            result?.message ||
            `Failed to submit your query${response.status ? ` (${response.status})` : ""}.`,
        });
        return;
      }

      setStatus({
        ok: true,
        text: "Query sent successfully. Please check your email.",
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        ok: false,
        text:
          error instanceof Error
            ? `Unable to submit query right now. ${error.message}`
            : "Unable to submit query right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center animate-fade-in">
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 shadow-sm">
            Contact
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Send Your Query
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            Fill the form and we will send confirmation to your email.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            onSubmit={handleSubmit}
            className="animate-slide-up space-y-4 rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="mb-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Project Form
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                Tell us what you want to build
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your name"
                value={formData.name}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, name: event.target.value }))
                }
                minLength={2}
                required
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4"
              />
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                required
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4"
              />
            </div>

            <Input
              type="tel"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, phone: event.target.value }))
              }
              className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4"
            />

            <Input
              placeholder="Subject"
              value={formData.subject}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, subject: event.target.value }))
              }
              minLength={3}
              required
              className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4"
            />

            <Textarea
              placeholder="Write your query..."
              value={formData.message}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, message: event.target.value }))
              }
              className="min-h-36 rounded-2xl border-slate-200 bg-slate-50 px-4 py-3"
              minLength={10}
              required
            />

            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-slate-950 text-white hover:bg-cyan-600"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Sending..." : "Submit Query"}
            </Button>

            {status && (
              <p
                className={
                  status.ok
                    ? "text-sm font-medium text-green-600"
                    : "text-sm font-medium text-red-600"
                }
              >
                {status.text}
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div className="group rounded-[30px] border border-white/70 bg-white/90 p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition-all duration-300 animate-slide-up hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-2xl bg-green-100 p-4 transition-colors duration-300 group-hover:bg-green-500">
                <MessageCircle className="h-8 w-8 text-green-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-950">WhatsApp</h3>
              <p className="mb-5 text-slate-600">
                Need quick support? Chat with us directly.
              </p>
              <Button
                type="button"
                onClick={handleWhatsAppClick}
                className="rounded-full bg-green-500 px-6 text-white hover:bg-green-600"
              >
                <MessageCircle className="w-5 h-5" />
                Click to Chat
              </Button>
            </div>

            <div className="group rounded-[30px] border border-white/70 bg-white/90 p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition-all duration-300 animate-slide-up animation-delay-100 hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-2xl bg-cyan-100 p-4 transition-colors duration-300 group-hover:bg-cyan-500">
                <Mail className="h-8 w-8 text-cyan-700 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-950">Email</h3>
              <p className="mb-5 text-slate-600">
                Prefer email? Reach us directly at:
              </p>
              <button
                type="button"
                onClick={handleEmailClick}
                className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
              >
                kumawatbajaranglal736@gmail.com
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-slate-600 animate-slide-up animation-delay-200">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-cyan-700" />
            Available for freelance and full-time projects
          </p>
        </div>
      </div>
    </section>
  );
}
