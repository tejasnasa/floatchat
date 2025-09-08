import { create } from "zustand";

interface Buoy {
  id: number;
  lat: number;
  lon: number;
  salinity: number;
  temp: number;
}

interface Filters {
  minTemp: number;
  maxTemp: number;
  minSalinity: number;
  maxSalinity: number;
}

interface StoreState {
  selectedBuoy: Buoy | null;
  setSelectedBuoy: (buoy: Buoy | null) => void;

  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useBuoyStore = create<StoreState>((set) => ({
  selectedBuoy: null,
  setSelectedBuoy: (buoy) => set({ selectedBuoy: buoy }),

  filters: {
    minTemp: 0,
    maxTemp: 40,
    minSalinity: 30,
    maxSalinity: 40,
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));
