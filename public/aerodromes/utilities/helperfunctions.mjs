/* --------------------------------- */
/* IMPORT functions                  */
/* --------------------------------- */
import fetchfactory from "./fetchfactory.mjs";
import { aerodromes } from "./constants.mjs";
import {
  getLeftAsideInnerHTML,
  getRightAsideInnerHTML,
} from "./innerhtmls.mjs";
import {
  leftDataContainer,
  rightDataContainer,
  dataTypeItems,
} from "./elements.mjs";
import { actualMap, createTileLayerLoadPromise } from "./mapfactory.mjs";
import { changeChartData } from "./chartfactory.mjs";
import { showLoader, hideLoader } from "./loaderfactory.mjs";

/* --------------------------------- */
/* HELPER Functions                  */
/* --------------------------------- */
//MAIN MENU váltást vezérlő függvény
const menuChange = (menuReference, attachedElements) => {
  const actualmenuitem = document.querySelector(".actual");
  actualmenuitem.classList.remove("actual");
  const nextmenuitem = document.querySelector(`[data-menu="${menuReference}"]`);
  nextmenuitem.classList.add("actual");
  const actualContainer = document.querySelector(".actualsection");
  actualContainer.classList.remove("actualsection");
  if (attachedElements[actualContainer.classList[0]]) {
    attachedElements[actualContainer.classList[0]].forEach((element) =>
      element.classList.remove("attached-active"),
    );
  }
  const nextContainer = document.querySelector("." + menuReference);
  nextContainer.classList.add("actualsection");
  if (attachedElements[menuReference]) {
    attachedElements[menuReference].forEach((element) =>
      element.classList.add("attached-active"),
    );
  }
};

//AERODROME DATA váltást végző függvény
const aerodromeDataChange = async (stationId) => {
  const actualAerodrome = aerodromes.find(
    (aerodrome) => aerodrome.stationId === stationId,
  );
  showLoader();
  actualMap.setView(
    [
      actualAerodrome.location.coordinates[1],
      actualAerodrome.location.coordinates[0],
    ],
    15,
  );
  const [actualMetDatas] = await Promise.all([
    fetchfactory(
      "metdatas",
      actualAerodrome.stationId,
      "meteorological data",
      [],
    ),
    createTileLayerLoadPromise(500),
  ]);
  console.log("METDATAS", actualMetDatas);
  setDataAside(actualMetDatas);
  const actualDataTypeItem = document.querySelector(".chart-select.actual");
  actualDataTypeItem.classList.remove("actual");
  dataTypeItems[0].classList.add("actual");
  changeChartData(actualAerodrome, actualMetDatas, "qfeqnh");
  hideLoader();
  return actualMetDatas;
};

//DATA ASIDE feltöltését vezérlő függvény
const setDataAside = (actualMetDatas) => {
  leftDataContainer.innerHTML = getLeftAsideInnerHTML(actualMetDatas[0]);
  rightDataContainer.innerHTML = getRightAsideInnerHTML(actualMetDatas[0]);
};

//A SELECTOR OPTION feltöltését végző függvény
const optionizeSelect = (element) => {
  let optionArray = aerodromes
    .map((aerodrome) => {
      return {
        stationId: aerodrome.stationId,
        stationname: aerodrome.stationname,
      };
    })
    .sort((a, b) => a.stationname.localeCompare(b.stationname));
  element.innerHTML = "";
  optionArray.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.stationId;
    optionElement.textContent = option.stationname;
    if (option.stationId === "57202") optionElement.selected = true;
    element.appendChild(optionElement);
  });
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export { menuChange, aerodromeDataChange, setDataAside, optionizeSelect };
