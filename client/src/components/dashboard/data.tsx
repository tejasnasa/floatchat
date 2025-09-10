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
      <div className="border-t border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 text-sm text-slate-400 h-[30%] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
            <span className="text-2xl">📍</span>
          </div>
          <p className="text-lg font-medium text-slate-300 mb-2">
            No Buoy Selected
          </p>
          <p className="text-slate-500">
            Click on a buoy marker to view detailed data
          </p>
        </div>
      </div>
    );
  }

  const metrics = ["temperature", "salinity", "density", "depth"] as const;
  const metricConfig = {
    temperature: {
      icon: "🌡️",
      color: "from-red-400 to-orange-400",
      bgColor: "bg-red-500/10",
    },
    salinity: {
      icon: "🧂",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-500/10",
    },
    density: {
      icon: "⚖️",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-500/10",
    },
    depth: {
      icon: "🌊",
      color: "from-cyan-400 to-blue-400",
      bgColor: "bg-cyan-500/10",
    },
  };

  const labels = Object.entries(selectedBuoy.yearly).flatMap(
    ([year, records]) => records.map((_, idx) => `${year}-${idx + 1}`)
  );

  const chartDatasets = metrics.map((metric) => {
    let borderColor = "";
    let backgroundColor = "";
    switch (metric) {
      case "temperature":
        borderColor = "rgba(239, 68, 68, 1)";
        backgroundColor = "rgba(239, 68, 68, 0.1)";
        break;
      case "salinity":
        borderColor = "rgba(59, 130, 246, 1)";
        backgroundColor = "rgba(59, 130, 246, 0.1)";
        break;
      case "density":
        borderColor = "rgba(147, 51, 234, 1)";
        backgroundColor = "rgba(147, 51, 234, 0.1)";
        break;
      case "depth":
        borderColor = "rgba(6, 182, 212, 1)";
        backgroundColor = "rgba(6, 182, 212, 0.1)";
        break;
    }
    return {
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: Object.entries(selectedBuoy.yearly).flatMap(([_, records]) =>
        records.map((r) => r[metric])
      ),
      borderColor,
      backgroundColor,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: borderColor,
      pointBorderColor: "#fff",
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
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#f8fafc",
        bodyColor: "#e2e8f0",
        borderColor: "#334155",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (record index per year)",
          color: "#94a3b8",
          font: { size: 12 },
        },
        grid: { color: "rgba(148, 163, 184, 0.1)" },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          color: "#94a3b8",
          font: { size: 12 },
        },
        grid: { color: "rgba(148, 163, 184, 0.1)" },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
    },
  };

  return (
    <div className="border-t border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 h-[30%] flex relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5"></div>

      <div className="relative z-10 w-1/5 p-4 border-r border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Argo Data
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-4"></div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400 font-medium">ID:</span>
            <span className="text-slate-200 font-mono">
              {selectedBuoy.buoyId}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400 font-medium">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedBuoy.status === "active"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
              }`}
            >
              {selectedBuoy.status}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400 font-medium">Lat:</span>
            <span className="text-slate-200 font-mono">
              {selectedBuoy.latitude.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400 font-medium">Lng:</span>
            <span className="text-slate-200 font-mono">
              {selectedBuoy.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col w-[70%] p-4 pb-2">
        <div className="h-full bg-slate-800/20 backdrop-blur-sm rounded-lg border border-slate-700/30 p-4">
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
                  text: `${
                    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                  } Trends`,
                  color: "#f8fafc",
                  font: { size: 16, weight: 600 },
                  padding: 20,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col w-[10%] border-l border-slate-700/50">
        {metrics.map((metric, index) => (
          <button
            key={metric}
            className={`h-1/4 text-xs font-medium transition-all duration-300 relative group overflow-hidden ${
              activeTab === metric
                ? `${metricConfig[metric].bgColor} text-white border-l-2 border-white shadow-lg`
                : "text-slate-400 hover:text-white hover:bg-slate-700/30"
            }`}
            onClick={() => setActiveTab(metric)}
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-1">
              <span className="text-lg">{metricConfig[metric].icon}</span>
              <span className="capitalize leading-tight">{metric}</span>
            </div>
            {activeTab === metric && (
              <div
                className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${metricConfig[metric].color}`}
              ></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
