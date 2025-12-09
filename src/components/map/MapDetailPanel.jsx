import useMap from "../../stores/useMap";

function MapDetailPanel() {
  const mapDetailsActive = useMap((state) => state.mapDetailsActive);
  const setMapDetailsActive = useMap((state) => state.setMapDetailsActive);

  function backToCard() {
    console.log(mapDetailsActive);

    setMapDetailsActive(!mapDetailsActive);
  }

  const classList = mapDetailsActive
    ? "absolute p-8 h-screen w-screen top-0 left-0 flex flex-col gap-8 justify-center items-center bg-black "
    : "absolute p-8 h-screen w-screen top-0 left-0 flex flex-col gap-8 justify-center items-center bg-black hidden";

  return (
    <div className={classList}>
      <h1 className="text-3xl text-center">Synapsen Headline</h1>
      <p className="text-2xl text-center">
        Beschreibung Kampagne Today I spent most of the day researching ways to
        take advantage of the fact that bottles can be returned for 10 cents in
        Michigan, but only 5 cents here. Kramer keeps telling me there is no way
        to make it work, that he has run the numbers on
      </p>
      <p className="text-center">
        Disclaimer, zB.: Ausgangszahlen 2025, hochgerechnet aus den aktuellsten
        Prognosen.
      </p>
      <p onClick={backToCard} className="cursor-pointer">
        Karte
      </p>
    </div>
  );
}

export default MapDetailPanel;
