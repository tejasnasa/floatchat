"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useBuoyStore } from "@/stores/buoys";
import data_2017 from "@/assets/2017_data.json";
import data_2016 from "@/assets/2016_data.json";
import data_2015 from "@/assets/2015_data.json";
import data_2014 from "@/assets/2014_data.json";
import { groupBuoyData } from "@/utils/groupBuoyData";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

export default function Map() {
  const { setSelectedBuoy, filters } = useBuoyStore();

  const groupedData = groupBuoyData({
    "2014": data_2014,
    "2015": data_2015,
    "2016": data_2016,
    "2017": data_2017,
  });

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
    <div className="w-4/5">
      <MapContainer
        center={[5, 80]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
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
            <Popup>
              <strong>ID: </strong>
              {Object.keys(groupedData).find(
                (id) => groupedData[id].latitude === b.latitude
              )}
              <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
