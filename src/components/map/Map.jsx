import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { setLayers, initHeatmapLayer, initGeoJSONLayer } from "./mapData";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ onReady }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [13, 48.2082], // Vienna
      zoom: 2,
      minZoom: 1, // how far out you can zoom
      maxZoom: 5, // how far in you can zoom
      accessToken: MAPBOX_TOKEN,
    });

    const map = mapRef.current;

    map.on("load", () => {
      // DEFINE LAYERS TO SHOW/HIDE
      setLayers(map);
      // Load GEOJSON DATA LAYER
      initGeoJSONLayer(map, onReady);
      // Load HEATMAP LAYER
      initHeatmapLayer(map);
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}

export default Map;
