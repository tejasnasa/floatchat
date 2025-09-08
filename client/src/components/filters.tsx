"use client";

import { useBuoyStore } from "@/stores/buoys";

export default function Filters() {
  const { filters, setFilters } = useBuoyStore();

  return (
    <section className="w-1/5 border-r-[1px] border-gray-600 h-full p-4">
      <div className="text-center font-bold mb-4">FILTERS</div>

      <div className="mb-4">
        <label className="block text-sm">Min Temp (°C)</label>
        <input
          type="number"
          value={filters.minTemp}
          onChange={(e) => setFilters({ minTemp: Number(e.target.value) })}
          className="w-full border rounded p-1 text-white bg-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm">Max Temp (°C)</label>
        <input
          type="number"
          value={filters.maxTemp}
          onChange={(e) => setFilters({ maxTemp: Number(e.target.value) })}
          className="w-full border rounded p-1 text-white bg-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm">Min Salinity</label>
        <input
          type="number"
          value={filters.minSalinity}
          onChange={(e) => setFilters({ minSalinity: Number(e.target.value) })}
          className="w-full border rounded p-1 text-white bg-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm">Max Salinity</label>
        <input
          type="number"
          value={filters.maxSalinity}
          onChange={(e) => setFilters({ maxSalinity: Number(e.target.value) })}
          className="w-full border rounded p-1 text-white bg-black"
        />
      </div>
    </section>
  );
}
