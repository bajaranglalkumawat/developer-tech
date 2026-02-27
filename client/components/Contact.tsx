import { FormEvent, useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { QuerySubmitRequest, QuerySubmitResponse } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as QuerySubmitResponse;
      if (!response.ok || !result.success) {
        setStatus({
          ok: false,
          text: result.message || "Failed to submit your query.",
        });
        return;
      }

      setStatus({
        ok: true,
        text: "Query sent successfully. Please check your email.",
      });
      setFormData(initialForm);
    } catch (_error) {
      setStatus({
        ok: false,
        text: "Unable to submit query right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Send Your Query
          </h2>
          <p className="text-xl text-gray-600">
            Fill the form and we will send confirmation to your email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="card-3d p-8 bg-white rounded-2xl border border-gray-200 shadow-md space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your name"
                value={formData.name}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, name: event.target.value }))
                }
                minLength={2}
                required
              />
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                required
              />
            </div>

            <Input
              type="tel"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, phone: event.target.value }))
              }
            />

            <Input
              placeholder="Subject"
              value={formData.subject}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, subject: event.target.value }))
              }
              minLength={3}
              required
            />

            <Textarea
              placeholder="Write your query..."
              value={formData.message}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, message: event.target.value }))
              }
              className="min-h-36"
              minLength={10}
              required
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Send className="w-4 h-4" />
              {isSubmitting ? "Sending..." : "Submit Query"}
            </Button>

            {status && (
              <p
                className={
                  status.ok
                    ? "text-sm text-green-600 font-medium"
                    : "text-sm text-red-600 font-medium"
                }
              >
                {status.text}
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div className="group card-3d p-7 bg-white rounded-2xl border border-gray-200 hover:border-green-500 shadow-md hover:shadow-2xl transition-all duration-300 animate-slide-up">
              <div className="mb-4 inline-block p-4 bg-green-100 rounded-xl group-hover:bg-green-500 transition-colors duration-300">
                <MessageCircle className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-5">
                Need quick support? Chat with us directly.
              </p>
              <Button
                type="button"
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-5 h-5" />
                Click to Chat
              </Button>
            </div>

            <div className="group card-3d p-7 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-2xl transition-all duration-300 animate-slide-up animation-delay-100">
              <div className="mb-4 inline-block p-4 bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
                <Mail className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-5">
                Prefer email? Reach us directly at:
              </p>
              <button
                type="button"
                onClick={handleEmailClick}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                kumawatbajaranglal736@gmail.com
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-600 animate-fade-in">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Available for freelance and full-time projects
          </p>
        </div>
      </div>
    </section>
  );
}
