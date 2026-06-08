import SEO from "@/components/SEO";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      toast.error("Could not submit inquiry");
      return;
    }
    toast.success("Inquiry submitted");
    setForm({ name: "", email: "", phone: "", serviceType: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Contact | Developer Tech - Website Developer Jaipur"
        description="Get in touch with Developer Tech for web development services in India, including affordable web design and ecommerce website development from Jaipur."
        keywords="web development services in India, website developer in Jaipur, affordable web design, ecommerce website development"
        canonical="https://developertech.in/contact"
      />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="mb-10 text-center">
            <p className="inline-flex rounded-full border border-slate-200 bg-cyan-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
              Contact
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Let&apos;s build your next website.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Reach out for a free consultation on your web development project. As a website developer in Jaipur, we deliver tailored solutions for businesses in India.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Office</h2>
                <p className="mt-3 text-slate-600">Developer Tech, Jaipur, Rajasthan, India.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Email & phone</h2>
                <p className="mt-3 text-slate-600">Email: developertech31@gmail.com</p>
                <p className="mt-1 text-slate-600">Phone: +91 9828920866</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-950">Need help right away?</h3>
                <p className="mt-3 text-slate-600">
                  Share your website, ecommerce, or SEO requirements and we&apos;ll get back to you quickly.
                </p>
              </div>
            </div>

            <form
              className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              onSubmit={submit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col text-sm font-medium text-slate-900">
                  Name
                  <input
                    className="mt-2 h-12 rounded-3xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Your Name"
                    aria-label="Name"
                    value={form.name}
                    onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-slate-900">
                  Email
                  <input
                    type="email"
                    className="mt-2 h-12 rounded-3xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Your Email"
                    aria-label="Email"
                    value={form.email}
                    onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col text-sm font-medium text-slate-900">
                  Phone
                  <input
                    className="mt-2 h-12 rounded-3xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Your Phone"
                    aria-label="Phone"
                    value={form.phone}
                    onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-slate-900">
                  Service type
                  <input
                    className="mt-2 h-12 rounded-3xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Website / SEO / App..."
                    aria-label="Service Type"
                    value={form.serviceType}
                    onChange={(e) => setForm((v) => ({ ...v, serviceType: e.target.value }))}
                  />
                </label>
              </div>

              <label className="flex flex-col text-sm font-medium text-slate-900">
                Message
                <textarea
                  className="mt-2 min-h-[160px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  rows={5}
                  placeholder="Tell us about your project"
                  aria-label="Message"
                  value={form.message}
                  onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
                />
              </label>

              <button className="inline-flex w-full items-center justify-center rounded-full bg-cyan-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600">
                Send Message
              </button>
            </form>
          </div>

          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80"
            alt="Contact Developer Tech in Jaipur"
            className="mt-10 h-auto w-full rounded-[28px] object-cover"
          />
        </div>
      </main>
    </div>
  );
};

export default Contact;
