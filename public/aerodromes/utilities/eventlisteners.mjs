/* --------------------------------- */
/* IMPORT functions                  */
/* --------------------------------- */
import { aerodromes, initialMetData } from "./constants.mjs";
import {
  aerodromeSelector,
  mapContainer,
  watchDataContainer,
  asideContainer,
  leftDataContainer,
  rightDataContainer,
  dataTypeItems,
} from "./elements.mjs";
import { menuChange, aerodromeDataChange } from "./helperfunctions.mjs";
import { actualMap } from "./mapfactory.mjs";
import { changeChartData } from "./chartfactory.mjs";
import { getMapIcon, getDataIcon } from "./innerhtmls.mjs";

/* ------------------------------- */
/* EVENTLISTENER global variables  */
/* ------------------------------- */
let actualMetDatas = initialMetData;

/* ----------------------------- */
/* MENU EVENT LISTENERS          */
/* ----------------------------- */
// MAIN MENU váltás vezérlése
const mainMenuEventListener = () => {
  const menuitems = document.querySelectorAll("nav .menu li a.menu-ref");
  menuitems.forEach((menuitem) => {
    menuitem.addEventListener("click", (menuevent) => {
      menuevent.preventDefault();
      menuChange(menuitem.getAttribute("data-menu"), {
        map: [asideContainer],
      });
      if (menuitem.getAttribute("data-menu"))
        setTimeout(() => {
          actualMap.invalidateSize();
        }, 100);
    });
  });
};

//WATCH DATA button vezérlése
const watchDataEventListener = () => {
  watchDataContainer.addEventListener("click", (event) => {
    event.preventDefault();
    if (Array.from(leftDataContainer.classList).includes("opened")) {
      watchDataContainer.innerHTML = getDataIcon();
    } else {
      watchDataContainer.innerHTML = getMapIcon();
    }
    leftDataContainer.classList.toggle("opened");
    rightDataContainer.classList.toggle("opened");
  });
};

/* ----------------------------- */
/* MAP EVENT LISTENERS           */
/* ----------------------------- */
// AERODROME SELECTOR vezérlése
const aerodromeSelectorEventListener = () => {
  aerodromeSelector.addEventListener("change", async (event) => {
    event.preventDefault();
    actualMetDatas = await aerodromeDataChange(event.target.value);
  });
};

//AERODROME MAP LABEL button vezérlése
const aerodromeMapLabelEventListener = () => {
  mapContainer.addEventListener("click", async (event) => {
    event.preventDefault();
    if (event.target.closest("svg.open-data")) {
      const mapLabelButton = event.target.closest("svg.open-data");
      if (actualMetDatas[0].stationId === mapLabelButton.dataset.id) return;
      aerodromeSelector.value = mapLabelButton.dataset.id;
      actualMetDatas = await aerodromeDataChange(mapLabelButton.dataset.id);
    }
  });
};

/* ----------------------------- */
/* CHART EVENT LISTENERS         */
/* ----------------------------- */
//CHART data types vezérlése
const changeChartDataEventListener = () => {
  dataTypeItems.forEach((dataTypeItem) => {
    dataTypeItem.addEventListener("click", (dataTypeevent) => {
      dataTypeevent.preventDefault();
      const actualDataTypeItem = document.querySelector(".chart-select.actual");
      actualDataTypeItem.classList.remove("actual");
      dataTypeItem.classList.add("actual");
      const actualAerodrome = aerodromes.find(
        (aerodrome) => aerodrome.stationId === aerodromeSelector.value,
      );
      changeChartData(
        actualAerodrome,
        actualMetDatas,
        dataTypeevent.target.dataset.menu,
      );
    });
  });
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export {
  mainMenuEventListener,
  watchDataEventListener,
  aerodromeSelectorEventListener,
  aerodromeMapLabelEventListener,
  changeChartDataEventListener,
};
