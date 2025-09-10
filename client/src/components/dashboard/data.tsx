"use client";
import { useState } from "react";
import { useBuoyStore } from "@/stores/buoys";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Data() {
  const { selectedBuoy } = useBuoyStore();
  const [activeTab, setActiveTab] = useState<
    "temperature" | "salinity" | "density" | "depth"
  >("temperature");

  if (!selectedBuoy) {
    return (
      <div className="border-t border-slate-800/50 bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-950 text-sm text-slate-400 h-[30%] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-violet-500/5"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 flex items-center justify-center backdrop-blur-sm group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-violet-400 p-0.5">
              <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center">
                <span className="text-xl">🔍</span>
              </div>
            </div>
          </div>
          <p className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent mb-3">
            No Buoy Selected
          </p>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            Click on a buoy marker to view detailed oceanographic data and trends
          </p>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  const metrics = ["temperature", "salinity", "density", "depth"] as const;
  const metricConfig = {
    temperature: {
      icon: "🌡️",
      color: "from-orange-400 via-red-400 to-pink-400",
      bgColor: "bg-gradient-to-r from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/30",
      chartColor: "rgba(251, 146, 60, 1)",
      chartBg: "rgba(251, 146, 60, 0.1)",
    },
    salinity: {
      icon: "🧂",
      color: "from-blue-400 via-cyan-400 to-teal-400",
      bgColor: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/30",
      chartColor: "rgba(34, 211, 238, 1)",
      chartBg: "rgba(34, 211, 238, 0.1)",
    },
    density: {
      icon: "⚖️",
      color: "from-violet-400 via-purple-400 to-indigo-400",
      bgColor: "bg-gradient-to-r from-violet-500/10 to-purple-500/10",
      borderColor: "border-violet-500/30",
      chartColor: "rgba(139, 92, 246, 1)",
      chartBg: "rgba(139, 92, 246, 0.1)",
    },
    depth: {
      icon: "🌊",
      color: "from-cyan-400 via-blue-400 to-indigo-400",
      bgColor: "bg-gradient-to-r from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-500/30",
      chartColor: "rgba(6, 182, 212, 1)",
      chartBg: "rgba(6, 182, 212, 0.1)",
    },
  };

  const labels = Object.entries(selectedBuoy.yearly).flatMap(
    ([year, records]) => records.map((_, idx) => `${year}-${idx + 1}`)
  );

  const chartDatasets = metrics.map((metric) => {
    const config = metricConfig[metric];
    return {
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: Object.entries(selectedBuoy.yearly).flatMap(([_, records]) =>
        records.map((r) => r[metric])
      ),
      borderColor: config.chartColor,
      backgroundColor: config.chartBg,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBackgroundColor: config.chartColor,
      pointBorderColor: "#000",
      pointBorderWidth: 2,
      fill: true,
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#f8fafc",
        bodyColor: "#e2e8f0",
        borderColor: "#475569",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        titleFont: { size: 14, weight: 600 },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (record index per year)",
          color: "#94a3b8",
          font: { size: 13, weight: 500 },
        },
        grid: { 
          color: "rgba(148, 163, 184, 0.1)",
          drawBorder: false,
        },
        ticks: { 
          color: "#64748b", 
          font: { size: 11 },
          padding: 8,
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          color: "#94a3b8",
          font: { size: 13, weight: 500 },
        },
        grid: { 
          color: "rgba(148, 163, 184, 0.1)",
          drawBorder: false,
        },
        ticks: { 
          color: "#64748b", 
          font: { size: 11 },
          padding: 8,
        },
      },
    },
  };

  return (
    <div className="border-t border-slate-800/50 bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-950 h-[30%] flex relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-violet-500/5"></div>

      {/* Sidebar with buoy info */}
      <div className="relative z-10 w-1/5 p-5 border-r border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-violet-400 p-0.5">
              <div className="w-full h-full bg-zinc-950 rounded-lg flex items-center justify-center">
                <span className="text-sm">🌊</span>
              </div>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              Argo Data
            </h2>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full"></div>
        </div>

        <div className="space-y-4 text-sm">
          {[
            { label: "ID", value: selectedBuoy.buoyId, type: "text" },
            { label: "Status", value: selectedBuoy.status, type: "status" },
            { label: "Latitude", value: selectedBuoy.latitude.toFixed(4), type: "text" },
            { label: "Longitude", value: selectedBuoy.longitude.toFixed(4), type: "text" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200">
              <span className="text-slate-400 font-medium">{item.label}:</span>
              {item.type === "status" ? (
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  selectedBuoy.status === "active"
                    ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-400 border border-slate-500/30"
                }`}>
                  {selectedBuoy.status}
                </span>
              ) : (
                <span className="text-slate-200 font-mono text-xs">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="relative z-10 flex-1 flex flex-col w-[70%] p-5">
        <div className="h-full bg-slate-900/20 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 relative overflow-hidden">
          {/* Chart background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-violet-500/5 to-transparent rounded-tr-full"></div>
          
          <div className="relative z-10 h-full">
            <Line
              data={{
                labels,
                datasets: [chartDatasets[metrics.indexOf(activeTab)]],
              }}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Trends`,
                    color: "#f8fafc",
                    font: { size: 18, weight: 700 },
                    padding: 24,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Metric selector */}
      <div className="relative z-10 flex flex-col w-[10%] border-l border-slate-800/50">
        {metrics.map((metric, index) => (
          <button
            key={metric}
            className={`h-1/4 text-xs font-medium transition-all duration-300 relative group overflow-hidden ${
              activeTab === metric
                ? `${metricConfig[metric].bgColor} text-white ${metricConfig[metric].borderColor} border-l-2 shadow-lg`
                : "text-slate-400 hover:text-white hover:bg-slate-800/40 border-l-2 border-transparent"
            }`}
            onClick={() => setActiveTab(metric)}
          >
            {/* Active indicator */}
            {activeTab === metric && (
              <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${metricConfig[metric].color}`}></div>
            )}
            
            {/* Hover effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${metricConfig[metric].color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative z-10 flex flex-row items-center justify-left h-full space-y-2 pl-7">
              <div className={`w-8 h-8 rounded-lg ${activeTab === metric ? `bg-gradient-to-r ${metricConfig[metric].color} p-0.5` : 'bg-slate-700/50'} transition-all duration-300`}>
                <div className="w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center">
                  <span className="text-base">{metricConfig[metric].icon}</span>
                </div>
              </div>
              <span className="capitalize leading-tight font-semibold tracking-wide ml-4">{metric}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}