import { useState } from "react";

import Map from "./Map";
import MapFilter from "./MapFilter";
import MapCounter from "./MapCounter";
import MapInfos from "./MapInfos";
import MapDetailBtn from "./MapDetailBtn";
import MapDetailPanel from "./MapDetailPanel";

function MapSection() {
  const [mapApi, setMapApi] = useState(null);

  return (
    <div className="fixed h-screen w-screen bg-black">
      <Map onReady={setMapApi} />
      <MapFilter mapApi={mapApi} />
      <MapCounter />
      <MapInfos />
      <MapDetailBtn />
      <MapDetailPanel />
    </div>
  );
}

export default MapSection;
