"use client";
import { useBuoyStore } from "@/stores/buoys";

export default function Filters() {
  const { filters, setFilters } = useBuoyStore();
  const metrics = [
    {
      key: "Temp",
      min: "minTemp",
      max: "maxTemp",
      unit: "°C",
      color: "from-emerald-400 via-teal-400 to-cyan-400",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/20",
      focusColor: "focus:border-emerald-400 focus:ring-emerald-400/20",
      icon: "🌡️",
    },
    {
      key: "Salinity",
      min: "minSalinity",
      max: "maxSalinity",
      unit: "PSU",
      color: "from-blue-400 via-indigo-400 to-purple-400",
      bgGradient: "from-blue-500/10 to-purple-500/10",
      borderColor: "border-blue-500/20",
      focusColor: "focus:border-blue-400 focus:ring-blue-400/20",
      icon: "🧂",
    },
    {
      key: "Density",
      min: "minDensity",
      max: "maxDensity",
      unit: "",
      color: "from-violet-400 via-purple-400 to-pink-400",
      bgGradient: "from-violet-500/10 to-pink-500/10",
      borderColor: "border-violet-500/20",
      focusColor: "focus:border-violet-400 focus:ring-violet-400/20",
      icon: "⚖️",
    },
  ] as const;

  return (
    <section className="w-1/5 bg-gradient-to-b from-zinc-950 via-slate-950 to-zinc-950 border-r border-slate-800/50 h-full overflow-y-auto backdrop-blur-xl relative">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-violet-500/5 pointer-events-none"></div>
      
      <div className="relative z-10 p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-violet-400 p-0.5">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                <span className="text-sm">🎛️</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              FILTERS
            </h2>
          </div>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"></div>
        </div>

        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.key}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${metric.color} rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-sm`}></div>
              
              <div className={`relative bg-gradient-to-br ${metric.bgGradient} backdrop-blur-sm rounded-xl p-5 border ${metric.borderColor} hover:border-slate-600/40 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} p-0.5`}>
                      <div className="w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{metric.icon}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`text-base font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                        {metric.key}
                      </span>
                      <div className="text-xs text-slate-500 font-medium">{metric.unit}</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-violet-400 animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wide">
                      Minimum Value
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={filters[metric.min as keyof typeof filters] || 0}
                        onChange={(e) =>
                          setFilters({ [metric.min]: Number(e.target.value) })
                        }
                        className={`w-full rounded-xl p-3 text-white bg-slate-900/70 border ${metric.borderColor} ${metric.focusColor} focus:ring-2 transition-all duration-300 text-sm placeholder-slate-500 hover:bg-slate-900/90`}
                        placeholder="Min value"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wide">
                      Maximum Value
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={filters[metric.max as keyof typeof filters] || 0}
                        onChange={(e) =>
                          setFilters({ [metric.max]: Number(e.target.value) })
                        }
                        className={`w-full rounded-xl p-3 text-white bg-slate-900/70 border ${metric.borderColor} ${metric.focusColor} focus:ring-2 transition-all duration-300 text-sm placeholder-slate-500 hover:bg-slate-900/90`}
                        placeholder="Max value"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom accent */}
        <div className="mt-8 pt-6 border-t border-slate-800/50">
          <div className="flex justify-center">
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}