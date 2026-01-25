/* --------------------------------- */
/* IMPORT functions                  */
/* --------------------------------- */
import { metSample } from "./constants.mjs";

/* ----------------------------- */
/* INNER HTML'S                  */
/* ----------------------------- */
//WINDBAG SVG innerHTML
const getWindBagIcon = () => {
  return `<svg fill="#2B4570" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	viewBox="0 0 512 512" xml:space="preserve">
	<path d="M288.364,112.384l-9.365-31.595L161.174,64.853c-0.085,0-0.171,0-0.256-0.021c-1.387-0.299-2.859-0.363-4.309-0.491
		c-0.405-0.064-0.768-0.085-1.152-0.128c-0.704-0.021-1.344-0.213-2.069-0.213c-13.525,0-24.107,7.424-32.256,19.264
		l-57.131,44.032V21.333C64.001,9.557,54.465,0,42.668,0C30.892,0,21.334,9.557,21.334,21.333v448
		c-11.776,0-21.333,9.557-21.333,21.333C0.001,502.464,9.558,512,21.334,512h42.667c11.797,0,21.333-9.536,21.333-21.333
		c0-11.776-9.536-21.333-21.333-21.333V224.277l49.941,52.779c8.725,19.179,21.525,32,39.445,32c2.624,0,5.12-0.299,7.531-0.811
		c0.085-0.021,0.171-0.021,0.256-0.043l113.472-15.339l14.528-34.432c7.253-16.725,11.52-43.541,11.52-71.893
		c0-28.373-4.267-55.168-11.456-71.701C288.897,114.048,288.62,113.237,288.364,112.384z M98.561,198.72L74.39,173.163
		l25.621-19.755c-1.152,11.029-1.685,22.251-1.685,33.131C98.326,190.549,98.412,194.624,98.561,198.72z M165.377,201.237
		c-0.085,1.536-0.213,2.965-0.32,4.459c-0.213,3.115-0.469,6.165-0.768,9.088c-0.171,1.536-0.341,3.029-0.533,4.501
		c-0.341,2.731-0.704,5.333-1.131,7.851c-0.213,1.301-0.405,2.624-0.64,3.861c-0.491,2.795-1.045,5.419-1.621,7.915
		c-0.171,0.704-0.299,1.493-0.469,2.176c-0.747,3.093-1.536,5.931-2.347,8.512c-0.213,0.725-0.448,1.323-0.661,1.984
		c-0.619,1.835-1.216,3.563-1.835,5.077c-0.171,0.448-0.341,0.832-0.512,1.237l-3.925-4.139
		c-4.885-13.739-9.621-36.715-9.621-67.221c0-36.181,6.635-61.931,12.352-74.027c0.299,0.64,0.597,1.216,0.896,1.92
		c0.277,0.64,0.533,1.259,0.811,1.963c0.619,1.536,1.237,3.285,1.835,5.12c0.213,0.661,0.448,1.237,0.661,1.92
		c0.811,2.603,1.6,5.461,2.347,8.555c0.149,0.661,0.299,1.429,0.448,2.112c0.576,2.517,1.131,5.163,1.664,7.979
		c0.213,1.237,0.405,2.539,0.619,3.84c0.405,2.517,0.789,5.141,1.131,7.851c0.192,1.493,0.363,2.987,0.533,4.501
		c0.299,2.923,0.555,5.973,0.768,9.088c0.107,1.493,0.235,2.923,0.32,4.459c0.235,4.715,0.405,9.579,0.405,14.72
		C165.782,191.659,165.612,196.544,165.377,201.237z"/>
	<path d="M384.709,95.078l-59.349-8.021l3.563,12.053c9.195,21.909,14.443,53.653,14.443,87.424
		c0,34.411-5.461,66.731-14.976,88.683l-4.651,11.008l59.733-8.064l11.456-32.832c4.352-15.36,6.955-36.651,6.955-58.795
		c0-22.165-2.603-43.456-7.339-59.968L384.709,95.078z" class="windbag-stripe-1"/>
	<path d="M467.114,106.217l-35.733-4.821l4.053,12.949c6.016,21.013,9.109,45.803,9.109,72.192c0,26.368-3.093,51.179-8.96,71.68
		l-4.715,13.525l36.245-4.885c14.784-0.661,44.885-10.624,44.885-80.32S481.898,106.878,467.114,106.217z" class="windbag-stripe-2"/>
</svg>`;
};

//WATCH-DATA SVG innerHTMLs
const getDataIcon = () => {
  return `
  <svg fill="#2B4570" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <g data-name="Layer 2">
      <g data-name="icons Q2">
        <path d="M2,32V42a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V32Zm30,6a2,2,0,1,1,2-2A2,2,0,0,1,32,38Zm6,0a2,2,0,1,1,2-2A2,2,0,0,1,38,38ZM44,4H4A2,2,0,0,0,2,6V16H46V6A2,2,0,0,0,44,4ZM32,14a2,2,0,1,1,2-2A2,2,0,0,1,32,14Zm6,0a2,2,0,1,1,2-2A2,2,0,0,1,38,14ZM2,20v8H46V20Zm30,6a2,2,0,1,1,2-2A2,2,0,0,1,32,26Zm6,0a2,2,0,1,1,2-2A2,2,0,0,1,38,26Z"/>
      </g>
    </g>
  </svg>`;
};
const getMapIcon = () => {
  return `
  <svg viewBox="0 0 24 24" fill="#2B4570" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.43627 5.14686C2 5.64345 2 6.49488 2 8.19773V17.591C2 18.797 2 19.4 2.3146 19.854C2.62919 20.3079 3.17921 20.4986 4.27924 20.88L5.57343 21.3286C6.27436 21.5717 6.81371 21.7586 7.26633 21.879C7.5616 21.9576 7.83333 21.7258 7.83333 21.4203V6.2701C7.83333 6.02118 7.64964 5.81111 7.40837 5.74991C7.01914 5.65118 6.55127 5.48897 5.91002 5.26666C4.35676 4.72817 3.58014 4.45893 2.98922 4.73235C2.77941 4.82942 2.59116 4.97054 2.43627 5.14686Z"/>
    <path d="M12.6204 3.48096L11.0844 4.54596C10.5287 4.93124 10.1215 5.2136 9.77375 5.41491C9.60895 5.51032 9.5 5.68291 9.5 5.87334V20.9203C9.5 21.2909 9.88398 21.5222 10.1962 21.3225C10.5312 21.1082 10.9149 20.8422 11.3796 20.5199L12.9156 19.4549C13.4712 19.0697 13.8785 18.7873 14.2262 18.586C14.3911 18.4906 14.5 18.318 14.5 18.1276V3.08063C14.5 2.71004 14.116 2.47866 13.8038 2.67836C13.4688 2.89271 13.0851 3.15874 12.6204 3.48096Z"/>
    <path d="M19.7208 3.12093L18.4266 2.67226C17.7256 2.42923 17.1863 2.24228 16.7337 2.12187C16.4384 2.04333 16.1667 2.2751 16.1667 2.58064V17.7308C16.1667 17.9797 16.3504 18.1898 16.5916 18.251C16.9809 18.3497 17.4488 18.5119 18.09 18.7342C19.6432 19.2727 20.4199 19.542 21.0108 19.2686C21.2206 19.1715 21.4088 19.0304 21.5637 18.854C22 18.3575 22 17.506 22 15.8032V6.40988C22 5.2039 22 4.60091 21.6854 4.14695C21.3708 3.69298 20.8208 3.5023 19.7208 3.12093Z"/>
  </svg>`;
};

//LEFT DATA ASIDE innerHTML
const getLeftAsideInnerHTML = (metData, aerodrome) => {
  const localTime = metData.utcDataTime
    ? new Date(metData.utcDataTime).toLocaleString("hu-HU", {
        timeZone: "Europe/Budapest",
      })
    : "N/A";
  const estQNH =
    metData.airpressure && aerodrome.elevation
      ? Math.round((metData.airpressure + aerodrome.elevation / 8) * 10) / 10
      : "N/A";
  return `
    <p title="Data time">TIME:</p><p class="span-2">${localTime
      .replace(" ", "")
      .replace(" ", "")}</p>
    <p title="Surface air pressure">QFE:</p><p class="numeric-data">${
      metData.airpressure ? metData.airpressure : "N/A"
    }</p><p>${metSample.find((data) => data.key === "airpressure").unit}</p>
    <p title="Main sea level air pressure">est.QNH:</p><p class="numeric-data">${
      estQNH
    }</p><p>${metSample.find((data) => data.key === "airpressure").unit}</p>
    <p title="Horizontal visibility">HZ VIS:</p><p class="numeric-data">${
      metData.horizontalvisibility ? metData.horizontalvisibility : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "horizontalvisibility").unit
    }</p>
    <p title="Relative humidity">RH:</p><p class="numeric-data">${
      metData.relativehumidity ? metData.relativehumidity : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "relativehumidity").unit
    }</p>
    <p title="Wind direction">WDI:</p><p class="numeric-data">${
      metData.winddirection ? metData.winddirection : "N/A"
    }</p><p>${metSample.find((data) => data.key === "winddirection").unit}</p>
    <p title="10 min average wind speed">AWS:</p><p class="numeric-data">${
      metData.average10minwindspeed ? metData.average10minwindspeed : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "average10minwindspeed").unit
    }</p>
    <p title="10 min maximum wind gust direction">MWGDI:</p><p class="numeric-data">${
      metData.maximum10minwindgustdirection
        ? metData.maximum10minwindgustdirection
        : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "maximum10minwindgustdirection")
        .unit
    }</p>
    <p title="10 min maximum wind gust speed">MWGS:</p><p class="numeric-data">${
      metData.maximum10minwindgustspeed
        ? metData.maximum10minwindgustspeed
        : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "maximum10minwindgustspeed").unit
    }</p>
    <p title="10 min maximum wind gust time (min:sec)">MWGT:</p><p class="numeric-data">${
      metData.maximum10minwindgustminute
        ? metData.maximum10minwindgustminute +
          ":" +
          metData.maximum10minwindgustsecond
        : "N/A"
    }</p><p>m:s</p>
    `;
};

//RIGHT DATA ASIDE innerHTML
const getRightAsideInnerHTML = (metData) => {
  const estDewPoint =
    metData.average10mintemperature && metData.relativehumidity
      ? Math.round(
          (metData.average10mintemperature -
            (100 - metData.relativehumidity) / 5) *
            10,
        ) / 10
      : "N/A";
  const estCloudBase =
    metData.average10mintemperature && metData.relativehumidity
      ? (metData.average10mintemperature - estDewPoint) * 122
      : "N/A";
  return `
  <p title="Precipitation">PCPN:</p><p class="numeric-data">${
    metData.precipitation ? metData.precipitation : "N/A"
  }</p><p>${metSample.find((data) => data.key === "precipitation").unit}</p>
  <p title="Cloud Base">est.CB:</p><p class="numeric-data">${
    estCloudBase
  }</p><p>${
    metSample.find((data) => data.key === "horizontalvisibility").unit
  }</p>
  <p title="Temperature">TEMP:</p><p class="numeric-data">${
    metData.temperature ? metData.temperature : "N/A"
  }</p><p>${metSample.find((data) => data.key === "temperature").unit}</p>
    <p title="Average temperature">AVTEMP:</p><p class="numeric-data">${
      metData.average10mintemperature ? metData.average10mintemperature : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "average10mintemperature").unit
    }</p>
    <p title="Minimum temperature">MINTEMP:</p><p class="numeric-data">${
      metData.minimum10mintemperature ? metData.minimum10mintemperature : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "minimum10mintemperature").unit
    }</p>
    <p title="Maximum temperature">MAXTEMP:</p><p class="numeric-data">${
      metData.maximum10mintemperature ? metData.maximum10mintemperature : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "maximum10mintemperature").unit
    }</p>
    <p title="Dew point">est.DP:</p><p class="numeric-data">${estDewPoint}</p><p>${
      metSample.find((data) => data.key === "average10mintemperature").unit
    }</p>
    <p title="10cm soil temperature">10STEMP:</p><p class="numeric-data">${
      metData.average10min10cmsoiltemperature
        ? metData.average10min10cmsoiltemperature
        : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "average10min10cmsoiltemperature")
        .unit
    }</p>
    <p title="20cm soil temperature">20STEMP:</p><p class="numeric-data">${
      metData.average10min20cmsoiltemperature
        ? metData.average10min20cmsoiltemperature
        : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "average10min20cmsoiltemperature")
        .unit
    }</p>
    <p title="50cm soil temperature">50STEMP:</p><p class="numeric-data">${
      metData.average10min50cmsoiltemperature
        ? metData.average10min50cmsoiltemperature
        : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "average10min50cmsoiltemperature")
        .unit
    }</p>
    <p title="Global radiation">GL RAD:</p><p class="numeric-data">${
      metData.average10minglobalradiation
        ? metData.average10minglobalradiation
        : "N/A"
    }</p><p>${
      metSample.find((data) => data.key === "average10minglobalradiation").unit
    }</p>
    `;
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export {
  getWindBagIcon,
  getDataIcon,
  getMapIcon,
  getLeftAsideInnerHTML,
  getRightAsideInnerHTML,
};
