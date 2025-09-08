"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

export default function Map() {
  return (
    <div className="h-3/4 p-2 border-b-[1px] border-gray-600">
      <MapContainer
        center={[20, 80]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[19, 72]} icon={icon}>
          <Popup>
            Float ID: 1234 <br /> Location: Arabian Sea
          </Popup>
        </Marker>
        <Marker position={[-33, 151]} icon={icon}>
          <Popup>
            Float ID: 5678 <br /> Location: Indian Ocean
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
