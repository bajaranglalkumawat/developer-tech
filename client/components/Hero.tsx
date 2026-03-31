export default function Hero() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919828920866", "_blank");
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_25%),linear-gradient(135deg,#08111f_0%,#0f172a_52%,#111827_100%)]" />
        <div className="absolute left-[-5%] top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-blob" />
        <div className="absolute right-[-2%] top-32 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:90px_90px] opacity-20" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300 backdrop-blur-md animate-fade-in">
            Professional websites for growing businesses
          </div>

          <h1 className="animate-fade-in text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            We design websites that look{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-white to-amber-300 bg-clip-text text-transparent">
              premium
            </span>{" "}
            and help your brand win trust faster.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 animate-slide-up lg:mx-0">
            Developer Tech builds modern business websites with strong design,
            responsive layouts, smooth performance, and clear conversion focus.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-slide-up lg:justify-start">
            {["React", "Node.js", "Tailwind", "Business Websites"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start animate-slide-up animation-delay-1000">
            <button
              onClick={handleWhatsAppClick}
              className="button-3d inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-amber-300 px-8 py-4 font-semibold text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.25)]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-3.71 6.175-1.467 9.254 2.243 3.079 6.175 3.734 9.254 1.491 3.079-2.243 3.733-6.175 1.49-9.254a9.87 9.87 0 00-4.242-2.869zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              Start on WhatsApp
            </button>
            <div className="flex items-center gap-6 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-left text-sm text-slate-300 backdrop-blur-sm">
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p>projects delivered</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p>client support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-slide-up animation-delay-2000">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-[0_30px_100px_rgba(2,8,23,0.45)] backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-white to-amber-300" />
            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    Project Snapshot
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Premium Business Website
                  </h2>
                </div>
                <div className="rounded-2xl bg-white/5 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Launch Ready
                  </p>
                  <p className="text-lg font-semibold text-white">7-15 days</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Design Quality</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Clean, modern, trust-first
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Performance Focus</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Fast, responsive, mobile ready
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
                  <p className="text-sm text-slate-400">Included</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Custom UI", "SEO Basics", "WhatsApp CTA", "Lead Form"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-200"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
