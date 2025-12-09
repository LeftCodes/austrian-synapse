import mapboxgl from "mapbox-gl";

export function setLayers(map) {
  const layers = map.getStyle().layers;

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
}

export function initGeoJSONLayer(map, onReady) {
  let countriesGeoJSON = null;

  loadCountries().then((geojson) => {
    countriesGeoJSON = geojson;

    map.addSource("countries", {
      type: "geojson",
      data: geojson,
    });

    // Expose zoomToCountry to parent
    onReady?.({ zoomToCountry });
  });

  function zoomToCountry(countryName) {
    if (!countriesGeoJSON) {
      console.warn("GeoJSON not available yet");
      return;
    }

    const features = countriesGeoJSON.features;

    const match = features.find(
      (f) => f.properties.name.toLowerCase() === countryName.toLowerCase()
    );

    // if country not found, show whole world
    if (!match) {
      map.fitBounds(
        [
          [-180, -85],
          [180, 85],
        ],
        {
          padding: 80,
          duration: 1200,
          maxZoom: 2.5,
        }
      );
      return;
    }

    // show whole world if no country selected
    if (!match || countryName === "") {
      return;
    }

    const biggestPolygon = getLargestPolygonCoordinates(match.geometry);

    const bounds = new mapboxgl.LngLatBounds();
    biggestPolygon.forEach((coord) => bounds.extend(coord));

    // THE FIX: use "map", not mapRef
    map.fitBounds(bounds, {
      padding: 80,
      maxZoom: 4.5,
      duration: 1200,
    });
  }
}

export function initHeatmapLayer(map) {
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
      "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
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
}

async function loadCountries() {
  const res = await fetch("/geojson.json");
  const geojson = await res.json();
  return geojson;
}

function getLargestPolygonCoordinates(geom) {
  if (geom.type === "Polygon") {
    return geom.coordinates[0];
  }

  if (geom.type === "MultiPolygon") {
    // Compute area of each polygon ring
    const areas = geom.coordinates.map((poly) => {
      const ring = poly[0];
      let area = 0;

      for (let i = 0; i < ring.length - 1; i++) {
        const [x1, y1] = ring[i];
        const [x2, y2] = ring[i + 1];
        area += x1 * y2 - x2 * y1;
      }

      return Math.abs(area / 2);
    });

    // Find largest polygon index
    const largestIndex = areas.indexOf(Math.max(...areas));

    return geom.coordinates[largestIndex][0];
  }
}
