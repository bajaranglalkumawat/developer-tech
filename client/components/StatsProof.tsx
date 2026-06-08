import { Award, Star, Users, TrendingUp, Rocket, CheckCircle2, LifeBuoy } from "lucide-react";
import CounterNumber from "@/components/CounterNumber";

const stats = [
  {
    icon: Award,
    value: 50,
    label: "Projects Delivered",
    suffix: "+",
    color: "from-cyan-400 to-blue-400",
  },
  {
    icon: Star,
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    color: "from-amber-400 to-orange-400",
  },
  {
    icon: Users,
    value: 120,
    label: "Happy Clients",
    suffix: "+",
    color: "from-pink-400 to-rose-400",
  },
  {
    icon: TrendingUp,
    value: 3,
    label: "Avg Conversion Increase",
    suffix: "x",
    color: "from-green-400 to-emerald-400",
  },
];

const testimonialStats = [
  {
    count: "50+",
    label: "Projects Shipped",
   
    color: "black",
  },
  {
    count: "98%",
    label: "On-time Delivery",
   
    color: "black",
  },
  {
    count: "4.9★",
    label: "Average Rating",
    
    color: "black",
  },
  {
    count: "24/7",
    label: "Support Available",
   
    color: "black",
  },
];

export default function StatsProof() {
  return (
    <>
      {/* Main Stats Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900/60" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-16 animate-fade-in">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300 backdrop-blur-sm">
              Why We Win Trust
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Results That Speak Louder
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-medium">
              Real metrics from real projects. We build websites that drive revenue, trust, and long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group animate-float-up overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_80px_rgba(8,145,178,0.12)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/20 hover:bg-slate-900/95"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${stat.color} text-white shadow-xl transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mt-6 mb-4">
                    <p className="text-4xl font-bold tracking-tight text-white">
                      <CounterNumber end={stat.value} duration={2500} />
                      <span className="text-2xl">{stat.suffix}</span>
                    </p>
                  </div>

                  <p className="text-lg font-semibold text-white">{stat.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Verified across real client work and successful launches.</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Trust Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {testimonialStats.map((item, index) => {
             
              return (
                <div
                  key={item.label}
                  className="animate-slide-up overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/80 px-6 py-8 text-center shadow-[0_25px_80px_rgba(8,145,178,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-900/95"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className={`mx-auto inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-xl transition-transform duration-300 group-hover:scale-110`}>
                   
                  </div>
                  <p className="mt-5 text-3xl font-bold tracking-tight text-white">{item.count}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.24em] text-cyan-200">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
