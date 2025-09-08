"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useBuoyStore } from "@/stores/buoys";
import buoys from "@/assets/data.json";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

export default function Map() {
  const { setSelectedBuoy, filters } = useBuoyStore();

  const filteredBuoys = buoys.filter(
    (b) =>
      b.temp >= filters.minTemp &&
      b.temp <= filters.maxTemp &&
      b.salinity >= filters.minSalinity &&
      b.salinity <= filters.maxSalinity
  );

  return (
    <div className="w-4/5 p-2">
      <MapContainer
        center={[20, 80]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredBuoys.map((b) => (
          <Marker
            key={b.id}
            position={[b.lat, b.lon]}
            eventHandlers={{
              click: () => setSelectedBuoy(b),
            }}
            icon={icon}
          >
            <Popup>
              <strong>ID:</strong> {b.id} <br />
              <strong>Temp:</strong> {b.temp}°C <br />
              <strong>Salinity:</strong> {b.salinity}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
