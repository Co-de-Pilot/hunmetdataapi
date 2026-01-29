/* --------------------------------- */
/* IMPORT functions                  */
/* --------------------------------- */
import fetchfactory from "./fetchfactory.mjs";

/* ----------------------------- */
/* MAP global variables          */
/* ----------------------------- */
const availableIcon = `
<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.58579L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z" fill="#2B4570"/>
  <path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" fill="#2B4570"/>
</svg>`;

const notAvailableIcon = `
<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_429_11057)">
    <path d="M5.63604 5.63598C4.00736 7.26466 3 9.51466 3 11.9999C3 16.9705 7.02944 20.9999 12 20.9999C14.4853 20.9999 16.7353 19.9926 18.364 18.3639M5.63604 5.63598C7.26472 4.0073 9.51472 2.99994 12 2.99994C16.9706 2.99994 21 7.02938 21 11.9999C21 14.4852 19.9926 16.7352 18.364 18.3639M5.63604 5.63598L18.364 18.3639" stroke="#2B4570" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_429_11057">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

const elevationIcon = `
<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 14L17 9L22 18H2.84444C2.46441 18 2.2233 17.5928 2.40603 17.2596L10.0509 3.31896C10.2429 2.96885 10.7476 2.97394 10.9325 3.32786L15.122 11.3476" stroke="#2B4570" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const openDataIcon = (stationId) => `
<svg data-id="${stationId}" class="open-data" fill="#2B4570" height="20px" width="20px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	  viewBox="0 0 256 256" xml:space="preserve">
<path id="XMLID_28_" d="M244.7,101.5C218.1,66,175.8,42.9,128,42.9S37.9,66,11.3,101.5c-4.9,6.9-8,15.3-8,24.5s3.1,17.6,8,24.3
	C37.9,185.9,80.2,209,128,209s90.1-23.1,116.7-58.7c4.9-6.9,8-15.3,8-24.5S249.6,108.5,244.7,101.5z M227.5,138.7
	c-23.7,31.3-60.3,49.7-99.5,49.7c-39.4,0-75.8-18.4-99.5-49.7c-2.7-3.7-4.3-8.2-4.3-12.7c0-4.3,1.6-9,4.3-12.7
	C52.2,82.1,88.6,63.7,128,63.7c39.2,0,75.8,18.4,99.5,49.7c1.8,2.5,4.3,7.2,4.3,12.7S229.4,136.1,227.5,138.7z M128,79.2
	c-25.8,0-46.8,20.8-46.8,46.8s21.1,46.8,46.8,46.8s46.8-21.1,46.8-46.8S153.8,79.2,128,79.2z M144.6,119.9
	c-5.7,0-10.4-4.7-10.4-10.4c0-5.7,4.7-10.4,10.4-10.4c5.7,0,10.4,4.7,10.4,10.4C155,115.2,150.3,119.9,144.6,119.9z"/>
</svg>`;

const windArrowIcon = (windDirection) => `
<svg fill="#2B4570" version="1.1" id="wind-arrow" style="--wind-deg: ${windDirection}deg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	viewBox="0 0 1792 1792" xml:space="preserve">
  <path d="M895,1792l-198.5-431l157.5,84.5V462.9l-123.6-99.3V0l165,133.2L1061.6,0v363.6l-125.6,99.3v982.3l159.5-84.5L895,1792z"/>
</svg>
`;

const weatherStationIcon = () => {
  return L.divIcon({
    html: `
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150.000000 300.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#2B4570" stroke="none">
        <path d="M880 2785 c-13 -16 -7 -115 10 -161 13 -32 58 -43 77 -19 12 17 13
          17 13 -8 0 -15 7 -30 15 -33 8 -4 15 -18 14 -33 0 -22 -10 -31 -67 -59 -74
          -36 -175 -59 -215 -48 -37 9 -38 53 -2 62 23 6 25 11 25 66 l0 59 48 -1 c74
          -3 82 -1 82 16 0 15 -9 16 -69 11 -60 -5 -71 -3 -87 14 -21 24 -95 26 -114 4
          -20 -24 -50 -19 -50 9 0 44 -19 76 -54 93 -47 22 -92 4 -113 -44 -16 -39 -10
          -68 20 -100 25 -28 97 -32 117 -8 7 9 22 15 34 13 18 -3 20 -9 17 -65 -2 -58
          -1 -62 21 -65 21 -3 23 -9 26 -65 l3 -62 32 1 c18 1 56 -5 85 -13 l52 -14 0
          -70 c0 -67 -2 -72 -30 -93 -22 -16 -43 -22 -84 -22 -71 0 -77 11 -84 151 l-5
          108 -36 5 c-20 3 -104 8 -187 12 -146 6 -152 6 -173 -15 -18 -18 -21 -32 -21
          -117 0 -88 -2 -96 -20 -101 -13 -3 -20 -12 -18 -22 3 -13 21 -17 98 -21 76 -4
          95 -8 95 -20 0 -13 34 -17 207 -25 198 -10 208 -11 232 -34 23 -22 26 -32 26
          -92 0 -37 -4 -71 -10 -74 -5 -3 -10 -37 -10 -76 0 -39 4 -69 10 -69 7 0 10
          -300 10 -880 l0 -880 35 0 35 0 1 878 0 877 34 28 c33 27 35 28 215 34 99 3
          183 10 186 14 2 5 -1 18 -8 29 -11 17 -11 22 2 30 8 5 23 10 32 10 24 0 30 16
          13 30 -14 11 -13 14 1 24 14 11 14 13 0 25 -15 12 -15 15 1 27 17 12 17 13 -1
          27 -18 13 -18 15 -2 24 16 9 16 11 2 22 -20 17 -20 31 -1 31 20 0 19 10 -2 26
          -17 13 -17 13 0 14 21 0 22 13 2 30 -20 16 -19 30 2 30 15 0 15 1 0 18 -21 23
          -21 32 -2 32 20 0 19 16 -2 24 -15 6 -15 8 1 19 17 12 17 14 0 28 -23 19 -167
          20 -186 1 -11 -11 -10 -15 5 -24 18 -9 18 -10 0 -23 -17 -13 -17 -14 2 -29 19
          -13 19 -15 3 -21 -21 -8 -24 -31 -5 -39 10 -5 10 -7 0 -12 -19 -9 -16 -34 5
          -34 15 -1 15 -2 -3 -16 -17 -12 -18 -16 -5 -24 12 -8 12 -12 -3 -28 -17 -18
          -17 -20 -1 -26 16 -6 15 -8 -1 -26 -16 -18 -17 -20 -1 -26 16 -6 16 -8 1 -24
          -15 -17 -15 -19 2 -29 17 -9 17 -10 -2 -25 -22 -16 -19 -18 38 -30 15 -4 27
          -13 27 -21 0 -13 -24 -15 -147 -15 -146 0 -147 0 -175 27 -25 24 -28 33 -28
          95 0 39 4 68 10 68 6 0 10 32 10 75 0 43 -4 75 -10 75 -6 0 -10 32 -10 75 0
          66 2 75 18 75 10 0 44 16 76 35 32 19 68 35 80 35 40 0 42 6 45 108 1 21 6 32
          16 32 12 0 15 13 15 60 0 41 -4 60 -12 60 -9 0 -8 4 2 10 8 5 33 10 56 10 33
          0 44 -5 62 -30 41 -55 125 -31 125 35 0 61 -82 89 -120 41 -26 -33 -115 -46
          -143 -21 -15 14 -29 16 -65 11 -37 -6 -45 -4 -45 8 0 43 -74 73 -100 41z m111
          -98 c-13 -13 -26 -3 -16 12 3 6 11 8 17 5 6 -4 6 -10 -1 -17z"/>
        </g>
      </svg>
    `,
    iconSize: [30, 60],
    iconAnchor: [15, 60],
    popupAnchor: [0, -60],
  });
};

/* ----------------------------- */
/* MAP FUNCTIONS                 */
/* ----------------------------- */
// MAP inicializálás
const initiateMap = () => {
  //MAP létrehozása
  const map = L.map("map").setView([46.6131, 20.2861], 15);
  //Alap LAYER beállítása
  const tileLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  );
  tileLayer.addTo(map);
  return [map, tileLayer];
};
const [actualMap, actualTileLayer] = initiateMap();

//STATION-ök megjelenítése
const showStationsOnMap = (stations, staticSample) => {
  stations.map((station) => {
    let localTime = new Date(
      station.datasAvailable[station.datasAvailable.length - 1],
    ).toLocaleString("hu-HU", {
      timeZone: "Europe/Budapest",
    });
    const lastDataTime =
      station.datasAvailable.length > 0
        ? `${localTime.replace(" ", "").replace(" ", "")}`
        : `Not Available`;
    const lastDataIcon = station.datasAvailable[0]
      ? availableIcon
      : notAvailableIcon;
    const tooltipText = `<div class="map-label">
      ${openDataIcon(station.stationId)}<p>${station.stationname}</p>
      ${elevationIcon}<p>${station.elevation} ${
        staticSample.find((data) => data.key === "elevation").unit
      }</p>
        ${lastDataIcon}<p>${lastDataTime}</p>${windArrowIcon()}
        </div>`;
    const marker = L.marker(
      [station.location.coordinates[1], station.location.coordinates[0]],
      {
        icon: weatherStationIcon(),
      },
    )
      .addTo(actualMap)
      .bindPopup(tooltipText, { className: "basic-element-design" });
    marker.on("popupopen", async () => {
      const actualWinddirection = await fetchfactory(
        "metdatas",
        `winddirection/${station.stationId}`,
        "winddirection",
        [],
      );
      const windArrow = document.querySelector("#wind-arrow");
      if (windArrow) {
        windArrow.style.transform = `rotate(${actualWinddirection.winddirection}deg)`;
      }
    });
  });
};

// MAP TILE-ok betöltése PROMISE-ba
const createTileLayerLoadPromise = (timeout) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      actualTileLayer.off("load", onLoad); // cleanup
      resolve(actualTileLayer);
    }, timeout);
    const onLoad = () => {
      clearTimeout(timer);
      resolve(actualTileLayer);
    };
    actualTileLayer.once("load", onLoad);
  });
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export { actualMap, showStationsOnMap, createTileLayerLoadPromise };
