export default function TechVisual() {
  return (
    <div className="relative mx-auto mt-8 w-full max-w-xl animate-fade-in lg:mt-10">
      <div className="animate-float-soft absolute -left-6 top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="animate-float-soft animation-delay-2000 absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-[0_30px_100px_rgba(2,8,23,0.45)] backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-white to-amber-300" />

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.92))] p-5">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>

            <svg
              viewBox="0 0 520 320"
              className="h-auto w-full"
              aria-label="Technical dashboard illustration"
              role="img"
            >
              <defs>
                <linearGradient id="panelGlow" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="lineGlow" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>

              <rect x="10" y="10" width="500" height="300" rx="26" fill="#071120" stroke="rgba(255,255,255,0.08)" />

              <rect x="34" y="36" width="180" height="84" rx="18" fill="#0f1b31" stroke="rgba(255,255,255,0.08)" />
              <text x="54" y="68" fill="#94a3b8" fontSize="14">Traffic</text>
              <text x="54" y="100" fill="#ffffff" fontSize="34" fontWeight="700">+128%</text>
              <rect x="228" y="36" width="258" height="84" rx="18" fill="#0f1b31" stroke="rgba(255,255,255,0.08)" />
              <path
                d="M254 93 C290 62, 326 108, 362 80 S432 44, 458 71"
                fill="none"
                stroke="url(#lineGlow)"
                strokeWidth="6"
                strokeLinecap="round"
                className="tech-line"
              />

              <rect x="34" y="142" width="292" height="136" rx="22" fill="#0b172a" stroke="rgba(255,255,255,0.08)" />
              <g className="tech-bars">
                <rect x="58" y="222" width="28" height="34" rx="10" fill="#1e293b" />
                <rect x="98" y="190" width="28" height="66" rx="10" fill="#1e293b" />
                <rect x="138" y="176" width="28" height="80" rx="10" fill="url(#panelGlow)" />
                <rect x="178" y="154" width="28" height="102" rx="10" fill="#1e293b" />
                <rect x="218" y="170" width="28" height="86" rx="10" fill="url(#panelGlow)" />
                <rect x="258" y="202" width="28" height="54" rx="10" fill="#1e293b" />
              </g>

              <rect x="344" y="142" width="142" height="136" rx="22" fill="#0b172a" stroke="rgba(255,255,255,0.08)" />
              <circle cx="415" cy="184" r="34" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="16" />
              <circle
                cx="415"
                cy="184"
                r="34"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="16"
                strokeDasharray="160"
                strokeDashoffset="42"
                strokeLinecap="round"
                className="tech-ring"
              />
              <text x="397" y="191" fill="#ffffff" fontSize="20" fontWeight="700">74%</text>
              <text x="380" y="231" fill="#94a3b8" fontSize="12">Speed score</text>
            </svg>
          </div>

          <div className="space-y-4">
            <div className="animate-float-soft rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Tech Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Node.js", "API", "SEO", "Cloud"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-float-soft animation-delay-1000 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                Live System
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
                  <span className="text-sm text-slate-300">Frontend</span>
                  <span className="text-sm font-semibold text-emerald-300">Healthy</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
                  <span className="text-sm text-slate-300">Backend API</span>
                  <span className="text-sm font-semibold text-cyan-300">Optimized</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
                  <span className="text-sm text-slate-300">UX Layer</span>
                  <span className="text-sm font-semibold text-amber-300">Polished</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
