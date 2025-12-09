import React from "react";
import MapCounter from "./MapCounter";

function MapInfos() {
  return (
    <div className="absolute text-center bottom-10 left-1/2 -translate-x-1/2">
      <MapCounter />

      <div className="mt-8">
        <p>Wieviele Synapsen?</p>
        <p>Energie</p>
        <p>Gewicht?</p>
      </div>
    </div>
  );
}

export default MapInfos;
