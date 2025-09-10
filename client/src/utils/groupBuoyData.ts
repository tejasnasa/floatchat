import { GroupedBuoy } from "@/stores/buoys";

type BuoyRecord = {
  latitude: number;
  longitude: number;
  status: string;
  buoyId: string;
  temperature: number;
  depth: number;
  density: number;
  salinity: number;
};

type GroupedBuoyData = {
  [buoyId: string]: {
    latitude: number;
    longitude: number;
    status: string;
    yearly: {
      [year: string]: BuoyRecord[];
    };
  };
};

export function groupBuoyData(dataByYear: { [year: string]: BuoyRecord[] }) {
  const grouped: { [buoyId: string]: GroupedBuoy } = {};

  for (const [year, records] of Object.entries(dataByYear)) {
    records.forEach((record) => {
      if (!grouped[record.buoyId]) {
        grouped[record.buoyId] = {
          buoyId: record.buoyId,
          latitude: record.latitude,
          longitude: record.longitude,
          status: record.status,
          yearly: {},
        };
      }

      if (!grouped[record.buoyId].yearly[year]) {
        grouped[record.buoyId].yearly[year] = [];
      }

      grouped[record.buoyId].yearly[year].push(record);
    });
  }

  return grouped;
}
