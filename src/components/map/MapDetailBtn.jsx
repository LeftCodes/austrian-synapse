import React from "react";
import useMap from "../../stores/useMap";

function MapDetailBtn() {

  const mapDetailsActive = useMap((state) => state.mapDetailsActive);
  const setMapDetailsActive = useMap((state) => state.setMapDetailsActive);

  function handleClick() {    
    setMapDetailsActive(!mapDetailsActive);
  }

  return (
    <div
      onClick={handleClick}
      className="w-[60px] absolute right-6 bottom-6 text-[12px] text-center leading-tight cursor-pointer"
    >
      Warum eigentlich das ganze
    </div>
  );
}

export default MapDetailBtn;
