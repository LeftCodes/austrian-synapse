import { create } from "zustand";

const useMap = create((set) => ({
  currentCountry: "",
  setCurrentCountry: (country) => set({ currentCountry: country }),
}));

export default useMap;