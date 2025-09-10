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
      <div className="p-3 border-t border-gray-600 text-sm text-gray-400 h-[30%] flex items-center justify-center">
        Click on an argo to view data
      </div>
    );
  }

  const metrics = ["temperature", "salinity", "density", "depth"] as const;

  const labels = Object.entries(selectedBuoy.yearly).flatMap(
    ([year, records]) => records.map((_, idx) => `${year}-${idx + 1}`)
  );

  const chartDatasets = metrics.map((metric) => {
    let borderColor = "";
    let backgroundColor = "";
    switch (metric) {
      case "temperature":
        borderColor = "rgba(130, 202, 157, 1)";
        backgroundColor = "rgba(130, 202, 157, 0.2)";
        break;
      case "salinity":
        borderColor = "rgba(136, 132, 216, 1)";
        backgroundColor = "rgba(136, 132, 216, 0.2)";
        break;
      case "density":
        borderColor = "rgba(255, 115, 0, 1)";
        backgroundColor = "rgba(255, 115, 0, 0.2)";
        break;
      case "depth":
        borderColor = "rgba(0, 200, 255, 1)";
        backgroundColor = "rgba(0, 200, 255, 0.2)";
        break;
    }

    return {
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: Object.entries(selectedBuoy.yearly).flatMap(([_, records]) =>
        records.map((r) => r[metric])
      ),
      borderColor,
      backgroundColor,
      tension: 0.3,
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Time (record index per year)" },
      },
      y: {
        title: { display: true, text: "Value" },
      },
    },
  };

  return (
    <div className="border-t border-gray-600 h-[30%] flex">
      <div className="w-1/5 p-2 border-r-[1px] border-gray-600">
        <h2 className="font-semibold text-2xl mb-2">Argo Data</h2>
        <p>
          <strong>ID:</strong> {selectedBuoy.buoyId}
        </p>
        <p>
          <strong>Status:</strong> {selectedBuoy.status}
        </p>
        <p>
          <strong>Latitude:</strong> {selectedBuoy.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {selectedBuoy.longitude}
        </p>
      </div>

      <div className="flex-1 flex flex-col w-[70%] p-2 pb-0">
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
                } vs Time`,
                color: "#fff",
              },
            },
          }}
        />
      </div>

      <div className="flex flex-col w-[10%] border-l-[1px] border-gray-600 justify-between">
        {metrics.map((metric) => (
          <button
            key={metric}
            className={`h-1/4 text-sm ${
              activeTab === metric
                ? "bg-gray-600 text-white"
                : " text-gray-300 hover:bg-gray-800 "
            }`}
            onClick={() => setActiveTab(metric)}
          >
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
