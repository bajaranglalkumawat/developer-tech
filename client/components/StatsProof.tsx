import { Star, Users, TrendingUp, Award, Clock, Zap } from "lucide-react";
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
  { count: "50+", label: "Projects Shipped", icon: "🚀" },
  { count: "98%", label: "On-time Delivery", icon: "✅" },
  { count: "4.9★", label: "Average Rating", icon: "⭐" },
  { count: "24/7", label: "Support Available", icon: "🛟" },
];

export default function StatsProof() {
  return (
    <>
      {/* Main Stats Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900/50" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-16 animate-fade-in">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              📊 Why We Win Trust
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Results That Speak Louder
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-medium">
              Real metrics from real projects. We're not just building websites – we're building business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group animate-float-up rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)] hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 text-white shadow-lg group-hover:shadow-xl transition-all`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mb-3">
                    <p className="text-4xl font-bold text-white">
                      <CounterNumber end={stat.value} duration={2500} />
                      <span className="text-2xl">{stat.suffix}</span>
                    </p>
                  </div>

                  <p className="text-white font-semibold">{stat.label}</p>
                  <p className="text-sm text-slate-200 mt-2">Proven across diverse industries</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Trust Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {testimonialStats.map((item, index) => (
              <div
                key={item.label}
                className="animate-slide-up group rounded-[20px] border border-white/10 bg-white/5 hover:bg-white/10 p-6 text-center transition-all duration-300 hover:border-cyan-400/50"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="text-3xl mb-2">{item.icon}</p>
                <p className="text-xl font-bold text-white">{item.count}</p>
                <p className="text-xs text-slate-200 mt-1 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
