"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useBuoyStore } from "@/stores/buoys";
import { groupedData } from "@/utils/groupBuoyData";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

export default function Map() {
  const { setSelectedBuoy, filters } = useBuoyStore();
  const filteredBuoys = Object.values(groupedData).filter((b) => {
    const latestYear = Math.max(...Object.keys(b.yearly).map(Number));
    const latestRecords = b.yearly[latestYear];
    const record = latestRecords[0];
    return (
      record.temperature >= filters.minTemp &&
      record.temperature <= filters.maxTemp &&
      record.salinity >= filters.minSalinity &&
      record.salinity <= filters.maxSalinity &&
      record.density >= filters.minDensity &&
      record.density <= filters.maxDensity
    );
  });

  return (
    <div className="w-4/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-100 opacity-10 pointer-events-none z-10 rounded-lg"></div>
      <div className="relative h-full rounded-lg shadow-2xl overflow-hidden border border-slate-200/20 backdrop-blur-sm">
        <MapContainer
          center={[5, 80]}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredBuoys.map((b) => (
            <Marker
              key={b.latitude + "-" + b.longitude}
              position={[b.latitude, b.longitude]}
              eventHandlers={{
                click: () => setSelectedBuoy(b),
              }}
              icon={icon}
            >
              <Popup className="custom-popup">
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">
                      Buoy Station
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <strong className="text-blue-600">ID: </strong>
                    {Object.keys(groupedData).find(
                      (id) => groupedData[id].latitude === b.latitude
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
