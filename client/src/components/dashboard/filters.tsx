"use client";

import { useBuoyStore } from "@/stores/buoys";

export default function Filters() {
  const { filters, setFilters } = useBuoyStore();

  const metrics = [
    { key: "Temp", min: "minTemp", max: "maxTemp", unit: "°C" },
    { key: "Salinity", min: "minSalinity", max: "maxSalinity", unit: "PSU" },
    { key: "Density", min: "minDensity", max: "maxDensity", unit: "" },
  ] as const;

  return (
    <section className="w-1/5 border-r-[1px] border-gray-600 h-full p-4 overflow-y-auto">
      <div className="text-center font-bold mb-4">FILTERS</div>

      {metrics.map((metric) => (
        <div key={metric.key} className="mb-4">
          <label className="block text-sm">
            Min {metric.key} {metric.unit}
          </label>
          <input
            type="number"
            value={filters[metric.min as keyof typeof filters] || 0}
            onChange={(e) =>
              setFilters({ [metric.min]: Number(e.target.value) })
            }
            className="w-full rounded p-1 text-white bg-black border-gray-400 border-[1px]"
          />

          <label className="block text-sm mt-2">
            Max {metric.key} {metric.unit}
          </label>
          <input
            type="number"
            value={filters[metric.max as keyof typeof filters] || 0}
            onChange={(e) =>
              setFilters({ [metric.max]: Number(e.target.value) })
            }
            className="w-full rounded p-1 text-white bg-black border-gray-400 border-[1px]"
          />
        </div>
      ))}
    </section>
  );
}
