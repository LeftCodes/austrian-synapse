import { useState } from "react";
import Map from "./Map";
import MapFilter from "./MapFilter";
import MapCounter from "./MapCounter";
import MapInfos from "./MapInfos";

function MapSection() {
  const [mapApi, setMapApi] = useState(null);

  return (
    <div className="fixed h-screen w-screen bg-black">
      <Map onReady={setMapApi} />
      <MapFilter mapApi={mapApi} />
      <MapCounter />
      <MapInfos />
    </div>
  );
}

export default MapSection;
