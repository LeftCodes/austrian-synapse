import React from "react";
import useMap from "../../stores/useMap";
import { countryCoords } from "../../data/countryCoords";

function MapFilter({ mapApi }) {
  const countries = Object.keys(countryCoords);

  const currentCountry = useMap((state) => state.currentCountry);
  const setCurrentCountry = useMap((state) => state.setCurrentCountry);

  function handleChange(e) {
    const newCountry = e.target.value;
    setCurrentCountry(newCountry);
    mapApi?.zoomToCountry(newCountry);
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col justify-center bg-white p-4 mt-6 rounded-md">
      <label htmlFor="countries" className="text-black text-center mb-2">
        Wähle ein Land:
      </label>

      <select
        name="countries"
        id="countries"
        className="text-black text-2xl"
        value={currentCountry}
        onChange={handleChange}
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
