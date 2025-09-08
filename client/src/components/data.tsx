"use client";

import { useBuoyStore } from "@/stores/buoys";

export default function Data() {
  const { selectedBuoy } = useBuoyStore();

  if (!selectedBuoy) {
    return (
      <div className="p-4 border-t-[1px] border-gray-600">
        Click on an argo to view data
      </div>
    );
  }

  return (
    <div className="p-4 border-t-[1px] border-gray-600">
      <h2 className="font-bold mb-2">Argo Data</h2>
      <p>
        <strong>ID:</strong> {selectedBuoy.id}
      </p>
      <p>
        <strong>Latitude:</strong> {selectedBuoy.lat}
      </p>
      <p>
        <strong>Longitude:</strong> {selectedBuoy.lon}
      </p>
      <p>
        <strong>Temperature:</strong> {selectedBuoy.temp} °C
      </p>
      <p>
        <strong>Salinity:</strong> {selectedBuoy.salinity}
      </p>
    </div>
  );
}
