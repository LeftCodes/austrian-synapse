import React from "react";
import useMap from "../../stores/useMap";
import { countryCoords } from "../../data/countryCoords";

function MapFilter() {
  const countries = Object.keys(countryCoords);

  const currentCountry = useMap((state) => state.currentCountry);
  const setCurrentCountry = useMap((state) => state.setCurrentCountry);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col justify-center bg-white p-4 mt-4 rounded-md">
      <label htmlFor="countries" className="text-black text-center">
        Wähle ein Land:
      </label>

      <select
        name="countries"
        id="countries"
        className="text-black text-2xl"
        value={currentCountry}
        onChange={(e) => setCurrentCountry(e.target.value)}
      >
        <option value="">Weltweit</option>
        {countries.map((country) => (
          <option value={country} key={country} className="p-2 bg-white ">
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MapFilter;
