/*-------------------------------*/
/*HTML ELEMENTS                  */
/*-------------------------------*/
//MODALS
const errorModal = document.querySelector(".error-modal");
const errorMessageContainer = document.querySelector(
  ".error-modal .message-container",
);
const warningModal = document.querySelector(".warning-modal");
const warningMessageContainer = document.querySelector(
  ".warning-modal .message-container",
);
const infoModal = document.querySelector(".info-modal");
const infoMessageContainer = document.querySelector(
  ".info-modal .message-container",
);

//LOADER elemei
const loaderContainer = document.querySelector(".loader-overlay");

//HEADER elemei
const logoContainer = document.querySelector(".logo");
const watchDataContainer = document.querySelector(".watch-data");
const menuitems = document.querySelectorAll("nav .menu li a.menu-ref");
const sections = document.querySelectorAll("section");
const aerodromeSelector = document.querySelector("#aerodrome-select");

//MAP elemei
const mapContainer = document.querySelector("#map");
const asideContainer = document.querySelector(".aside-container");
const leftDataContainer = document.querySelector(".data-left");
const rightDataContainer = document.querySelector(".data-right");

//CHART elemei
const chartContainer = document.querySelector("#metChart");
const dataTypeItems = document.querySelectorAll(".chart-select.submenu");

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export {
  errorModal,
  errorMessageContainer,
  warningModal,
  warningMessageContainer,
  infoModal,
  infoMessageContainer,
  loaderContainer,
  logoContainer,
  watchDataContainer,
  menuitems,
  sections,
  aerodromeSelector,
  mapContainer,
  asideContainer,
  leftDataContainer,
  rightDataContainer,
  chartContainer,
  dataTypeItems,
};
