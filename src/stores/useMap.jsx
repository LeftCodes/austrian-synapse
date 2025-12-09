import { create } from "zustand";

const useMap = create((set) => ({
  currentCountry: "",
  mapDetailsActive: false,

  setCurrentCountry: (country) => set({ currentCountry: country }),
  setMapDetailsActive: (isActive) => set({ mapDetailsActive: isActive }),
}));

export default useMap;
