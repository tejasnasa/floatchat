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

// Custom marker with modern styling
const createCustomIcon = (isSelected = false) => {
  return L.divIcon({
    html: `
      <div class="relative">
        <div class="${isSelected ? 'w-6 h-6' : 'w-5 h-5'} rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 p-0.5 animate-pulse">
          <div class="w-full h-full bg-white rounded-full flex items-center justify-center">
            <div class="${isSelected ? 'w-3 h-3' : 'w-2.5 h-2.5'} rounded-full bg-gradient-to-r from-emerald-500 to-violet-500"></div>
          </div>
        </div>
        ${isSelected ? '<div class="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full blur-sm opacity-30 animate-ping"></div>' : ''}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function Map() {
  const { setSelectedBuoy, selectedBuoy, filters } = useBuoyStore();

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
      {/* Modern overlay UI */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-3">
        {/* Stats card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-emerald-400 to-violet-400 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-xs">📍</span>
              </div>
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
              Active Buoys
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
            {filteredBuoys.length}
            <span className="text-sm text-slate-400 font-normal ml-1">found</span>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
          <div className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wide">Legend</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
              <span className="text-slate-300">Active Buoy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-violet-400 animate-pulse"></div>
              <span className="text-slate-300">Selected Buoy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search/Filter overlay */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl max-w-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-xs">🗺️</span>
              </div>
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ocean Map
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Explore oceanographic data from Argo buoys across the Indian Ocean
          </p>
        </div>
      </div>

      {/* Map container with modern styling */}
      <div className="h-full w-full rounded-lg overflow-hidden shadow-2xl border border-slate-700/30 relative">
        {/* Map overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none z-[999]"></div>
        
        <MapContainer
          center={[10, 80]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredBuoys.map((b) => {
            const isSelected = selectedBuoy?.latitude === b.latitude && selectedBuoy?.longitude === b.longitude;
            const buoyId = Object.keys(groupedData).find(
              (id) => groupedData[id].latitude === b.latitude
            );
            
            return (
              <Marker
                key={`${b.latitude}-${b.longitude}`}
                position={[b.latitude, b.longitude]}
                eventHandlers={{
                  click: () => setSelectedBuoy(b),
                }}
                icon={createCustomIcon(isSelected)}
              >
                <Popup
                  className="custom-popup"
                  offset={[0, -10]}
                >
                  <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-2xl min-w-[200px]">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-violet-400 p-0.5">
                        <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
                          <span className="text-sm">🌊</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">
                          Buoy {buoyId}
                        </div>
                        <div className="text-xs text-slate-400">Argo Float</div>
                      </div>
                    </div>

                    {/* Data preview */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                        <span className="text-slate-400">Position:</span>
                        <span className="text-slate-200 font-mono">
                          {b.latitude.toFixed(2)}°, {b.longitude.toFixed(2)}°
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                        <span className="text-slate-400">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          b.status === "active"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={() => setSelectedBuoy(b)}
                      className="mt-3 w-full py-2 px-3 bg-gradient-to-r from-emerald-500 to-violet-500 text-white text-xs font-semibold rounded-lg hover:from-emerald-600 hover:to-violet-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Custom styles for map */}
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.95) !important;
          border: 1px solid rgba(71, 85, 105, 0.5) !important;
        }
        
        .leaflet-control-zoom {
          display: none !important;
        }
      `}</style>
    </div>
  );
}