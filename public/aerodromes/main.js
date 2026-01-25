/* TODO:
1. Kalkulálható adatok megjelenítése
2. Mértékegységek konvertálása
3. 
4. 
5. 
6. 
7. 
*/

/* --------------------------------- */
/* IMPORT functions                  */
/* --------------------------------- */
import { initialMetData, initialAerodrome } from "./utilities/constants.mjs";
import {
  logoContainer,
  watchDataContainer,
  aerodromeSelector,
} from "./utilities/elements.mjs";
import { setDataAside, optionizeSelect } from "./utilities/helperfunctions.mjs";
import {
  mainMenuEventListener,
  watchDataEventListener,
  aerodromeSelectorEventListener,
  aerodromeMapLabelEventListener,
  changeChartDataEventListener,
} from "./utilities/eventlisteners.mjs";
import { getWindBagIcon, getDataIcon } from "./utilities/innerhtmls.mjs";
import { initiateChart } from "./utilities/chartfactory.mjs";

/* --------------------------------- */
/* INITIALIZATION vezérlése          */
/* --------------------------------- */
//A logó beállítása
logoContainer.innerHTML = getWindBagIcon();

//WATCH-DATA beállítása
watchDataContainer.innerHTML = getDataIcon();

//A fő menü váltás beállítása
mainMenuEventListener();

//SELECTOR beállítása
optionizeSelect(aerodromeSelector);
aerodromeSelectorEventListener();

//WATCH DATA beállítása
watchDataEventListener();

//DATA ASIDE beállítása
setDataAside(initialMetData, initialAerodrome);

//CHART beállítása
initiateChart();
changeChartDataEventListener();

//MAP LABEL BUTTON beállítása
aerodromeMapLabelEventListener();
