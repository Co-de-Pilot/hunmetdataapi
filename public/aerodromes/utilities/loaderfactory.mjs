/*-------------------------------*/
/*MODUL IMPORT                   */
/*-------------------------------*/
import { loaderContainer } from "./elements.mjs";
import { getWindBagIcon } from "./innerhtmls.mjs";

/*-------------------------------*/
/*LOADER FACTORY                 */
/*-------------------------------*/
//A LOADER beállítása
loaderContainer.children[0].innerHTML = `${getWindBagIcon()}<p class="loading-text">LOADING...</p>`;

const showLoader = () => {
  loaderContainer.classList.add("loader-active");
};

const hideLoader = () => {
  loaderContainer?.classList.remove("loader-active");
};

export { showLoader, hideLoader };
