import { useState, useEffect } from "react";
import useMap from "../../stores/useMap";

function MapCounter() {
  const currentCountry = useMap((state) => state.currentCountry);  

  const country = currentCountry === "" ? "Weltweit" : currentCountry;

  const count = 1234567;

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <p>
      {country}
      <br />
      <span className="text-3xl font-bold">{formatNumber(count)}</span>
      <br />
      Österr. Synapsen
    </p>
  );
}

export default MapCounter;
