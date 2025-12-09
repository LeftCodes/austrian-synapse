import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
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
      const layers = map.getStyle().layers;

      console.log(layers);

      layers.forEach((layer) => {
        const id = layer.id;

        // Hide all water labels
        if (
          id.includes("water-label") ||
          id.includes("waterway-label") ||
          id.includes("marine-label")
        ) {
          map.setLayoutProperty(id, "visibility", "none");
          return;
        }

        // Hide state/province borders
        if (id.includes("admin-1")) {
          map.setLayoutProperty(id, "visibility", "none");
          return;
        }

        // Keep only the layers you want
        const keep =
          id === "water" || // oceans (polygons)
          id.includes("land") || // continents
          id.includes("background") || // globe background
          id.includes("admin") || // borders
          // id.includes("country-label") || // country names
          id.includes("place-label"); // city names

        if (!keep) {
          map.setLayoutProperty(id, "visibility", "none");
        }
      });

      // CUSTOM MAP STYLING
      if (map.getLayer("water")) {
        map.setPaintProperty("water", "fill-color", "#13080F");
      }
      if (map.getLayer("land")) {
        map.setPaintProperty("land", "background-color", "#2B1B2B");
      }

      if (map.getLayer("sky")) {
        map.setPaintProperty("sky", "sky-color", "#aaaaaa"); // bright white
        map.setPaintProperty("sky", "sky-opacity", 1);
      }

      // HEATMAP LAYER EXAMPLE

      map.addSource("earthquakes", {
        type: "geojson",
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
      });

      map.addLayer({
        id: "earthquakes-heat",
        type: "heatmap",
        source: "earthquakes",
        maxzoom: 9,
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            0,
            0,
            6,
            1,
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            9,
            3,
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgba(210, 79,0, 0.81)",
            0.5,
            "#DE834C",
            0.7,
            "#F3C99C",
            0.99,
            "#FFEC73",
            1,
            "#F7FFD9",
          ],
          // Adjust the heatmap radius by zoom level
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
        },
        slot: "top",
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}

export default Map;
