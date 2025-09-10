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
      color: "from-red-400 to-orange-400",
      icon: "🌡️",
    },
    {
      key: "Salinity",
      min: "minSalinity",
      max: "maxSalinity",
      unit: "PSU",
      color: "from-blue-400 to-cyan-400",
      icon: "🧂",
    },
    {
      key: "Density",
      min: "minDensity",
      max: "maxDensity",
      unit: "",
      color: "from-purple-400 to-pink-400",
      icon: "⚖️",
    },
  ] as const;

  return (
    <section className="w-1/5 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 h-full overflow-y-auto backdrop-blur-xl">
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            FILTERS
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.key}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">{metric.icon}</span>
                  <span
                    className={`text-sm font-semibold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                  >
                    {metric.key} {metric.unit}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">
                      Minimum Value
                    </label>
                    <input
                      type="number"
                      value={filters[metric.min as keyof typeof filters] || 0}
                      onChange={(e) =>
                        setFilters({ [metric.min]: Number(e.target.value) })
                      }
                      className="w-full rounded-lg p-2.5 text-white bg-slate-700/50 border border-slate-600/50 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 transition-all duration-200 text-sm placeholder-slate-500"
                      placeholder="Min"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">
                      Maximum Value
                    </label>
                    <input
                      type="number"
                      value={filters[metric.max as keyof typeof filters] || 0}
                      onChange={(e) =>
                        setFilters({ [metric.max]: Number(e.target.value) })
                      }
                      className="w-full rounded-lg p-2.5 text-white bg-slate-700/50 border border-slate-600/50 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 transition-all duration-200 text-sm placeholder-slate-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 pointer-events-none`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
