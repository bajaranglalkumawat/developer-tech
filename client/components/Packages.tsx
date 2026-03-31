import { ArrowRight, Check, Sparkles } from "lucide-react";

const packages = [
  {
    name: "Basic Plan",
    subtitle: "Starter Website",
    price: "Rs. 9,999",
    description: "A clean business website for startups and local brands.",
    cta: "Choose Plan",
    highlighted: false,
    features: [
      "5 pages with mobile responsive design",
      "Clean and professional layout",
      "Contact form and WhatsApp integration",
      "Basic SEO setup",
      "Delivery in 7 days",
      "7 days free support",
    ],
  },
  {
    name: "Standard Plan",
    subtitle: "Business Growth",
    price: "Rs. 19,999",
    description: "Ideal for businesses that want stronger presence and reach.",
    cta: "Get Started",
    highlighted: true,
    features: [
      "8-10 pages with custom modern design",
      "Responsive across mobile and tablet",
      "WhatsApp, call, and map integration",
      "On-page SEO and speed optimization",
      "Social media integration",
      "1 month free support",
    ],
  },
  {
    name: "Premium Plan",
    subtitle: "Advanced Business Website",
    price: "Rs. 39,999 - Rs. 49,999",
    description: "For serious brands that need a strong custom digital presence.",
    cta: "Choose Plan",
    highlighted: false,
    features: [
      "Fully custom design and advanced UI/UX",
      "Unlimited pages and blog setup",
      "SEO-optimized structure",
      "Lead capture system and payment integration",
      "Admin panel if required",
      "3 months free maintenance",
    ],
  },
];

const addons = [
  { title: "Hosting Setup", price: "Rs. 3,000 / year" },
  { title: "Website Maintenance", price: "Rs. 2,000 / month" },
  { title: "SEO Services", price: "Rs. 5,000 / month" },
  { title: "Landing Page", price: "Rs. 4,999" },
  { title: "E-commerce Website", price: "Starting Rs. 30,000" },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="animate-fade-in mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
            Pricing
          </p>
          <h2 className="animate-fade-in text-4xl font-bold tracking-tight text-white md:text-5xl">
            Website packages designed for different stages of business.
          </h2>
          <p className="animate-slide-up mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Pick the package that fits your current goals, and we will shape it
            into a website that looks premium and works smoothly.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`animate-slide-up relative overflow-hidden rounded-[30px] border p-8 shadow-[0_24px_80px_rgba(2,8,23,0.35)] transition-transform duration-300 hover:-translate-y-2 ${
                pkg.highlighted
                  ? "border-amber-300/40 bg-gradient-to-b from-white to-amber-50"
                  : "border-white/10 bg-white/[0.04] backdrop-blur-sm"
              }`}
              style={{ animationDelay: `${index * 140}ms` }}
            >
              {pkg.highlighted && (
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                  <Sparkles className="h-4 w-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                    pkg.highlighted ? "text-slate-600" : "text-cyan-300"
                  }`}
                >
                  {pkg.subtitle}
                </p>
                <h3
                  className={`mt-3 text-3xl font-bold ${
                    pkg.highlighted ? "text-slate-950" : "text-white"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`mt-3 text-base leading-7 ${
                    pkg.highlighted ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {pkg.description}
                </p>
                <div
                  className={`mt-6 text-4xl font-extrabold tracking-tight ${
                    pkg.highlighted ? "text-slate-950" : "text-white"
                  }`}
                >
                  {pkg.price}
                </div>
              </div>

              <div className="space-y-4 border-t border-black/10 pt-6">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                        pkg.highlighted
                          ? "bg-amber-200 text-slate-950"
                          : "bg-white/10 text-cyan-300"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </span>
                    <span
                      className={
                        pkg.highlighted
                          ? "text-slate-700"
                          : "text-slate-300"
                      }
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/919828920866"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-slate-950 text-white hover:bg-slate-800"
                    : "border border-white/15 bg-white/8 text-white hover:bg-white/14"
                }`}
              >
                {pkg.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="animate-slide-up mt-14 rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Add-ons
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">
                Extra services to support your website after launch
              </h3>
            </div>
            <p className="max-w-xl text-slate-300">
              Add what you need based on your business stage and growth plans.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {addons.map((addon, index) => (
              <div
                key={addon.title}
                className="animate-slide-up rounded-3xl border border-white/10 bg-slate-900/70 p-5"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <h4 className="text-lg font-semibold text-white">{addon.title}</h4>
                <p className="mt-3 text-sm font-medium text-amber-300">
                  {addon.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
