/* --------------------------------- */
/* IMPORT functions                  */
/* --------------------------------- */
import fetchfactory from "./fetchfactory.mjs";
import { showLoader, hideLoader } from "./loaderfactory.mjs";
import {
  showStationsOnMap,
  createTileLayerLoadPromise,
} from "./mapfactory.mjs";

/* --------------------------------- */
/* CONSTANTS and VARIABLES           */
/* --------------------------------- */
const initiateConstants = async () => {
  showLoader();
  const [aerodromes, staticSample, metSample, initialMetData] =
    await Promise.all([
      fetchfactory("staticdatas", "aerodromes", "station", []),
      fetchfactory("constants", "staticSample", "sample", []),
      fetchfactory("constants", "metSample", "sample", []),
      fetchfactory("metdatas", "57202", "meteorological data", []),
      createTileLayerLoadPromise(),
    ]);
  showStationsOnMap(aerodromes, staticSample);
  hideLoader();
  return [aerodromes, staticSample, metSample, initialMetData];
};
const [aerodromes, staticSample, metSample, initialMetData] =
  await initiateConstants();
const initialAerodrome = aerodromes.find(
  (aerodrome) => aerodrome.stationId === "57202",
);
const arrowSVG = `
<svg width="30px" height="30px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-385.000000, -6559.000000)" fill="#2B4570">
            <g transform="translate(56.000000, 160.000000)">
                <path d="M337.321844,6413.84809 L335.841796,6415.2601 C335.522354,6415.5621 335.008643,6415.3361 335.008643,6414.89709 L335.008643,6400.00001 C335.008643,6399.448 334.552012,6399 333.999247,6399 L334.007258,6399 C333.454493,6399 333.005872,6399.448 333.005872,6400.00001 L333.005872,6414.88209 C333.005872,6415.3231 332.463121,6415.5481 332.145682,6415.2421 L330.683658,6413.83809 C330.285107,6413.45808 329.648226,6413.47508 329.271705,6413.87809 L329.267699,6413.88009 C328.895184,6414.27809 328.913208,6414.90209 329.310759,6415.2771 L332.653384,6418.45411 C333.427455,6419.18512 334.639132,6419.18112 335.410199,6418.44711 L338.692742,6415.2981 C339.085285,6414.92409 339.104311,6414.30509 338.7348,6413.90809 L338.724786,6413.89709 C338.351269,6413.49608 337.722399,6413.47408 337.321844,6413.84809">
				</path>
            </g>
        </g>
    </g>
</svg>`;
const arrowImage = new Image();
arrowImage.src =
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(arrowSVG);
const chartDataSets = {
  qfeqnh: ["airpressure"],
  hzvis: ["horizontalvisibility"],
  cloudbase: [],
  relhum: ["relativehumidity"],
  wind: [
    "winddirection",
    "average10minwindspeed",
    "maximum10minwindgustdirection",
    "maximum10minwindgustspeed",
  ],
  temp: [
    "temperature",
    "average10mintemperature",
    "minimum10mintemperature",
    "maximum10mintemperature",
    "dewpoint",
  ],
  stemp: [
    "average10min10cmsoiltemperature",
    "average10min20cmsoiltemperature",
    "average10min50cmsoiltemperature",
  ],
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export {
  aerodromes,
  staticSample,
  metSample,
  initialMetData,
  initialAerodrome,
  arrowImage,
  chartDataSets,
};
