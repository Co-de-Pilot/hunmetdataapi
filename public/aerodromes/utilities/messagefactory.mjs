/*-------------------------------*/
/*MODUL IMPORT                   */
/*-------------------------------*/
import {
  errorModal,
  errorMessageContainer,
  warningModal,
  warningMessageContainer,
  infoModal,
  infoMessageContainer,
} from "./elements.mjs";

/*-------------------------------*/
/*MESSAGE FACTORY                */
/*-------------------------------*/
const showError = (message) => {
  errorMessageContainer.innerHTML = "";
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = message;
  errorMessageContainer.appendChild(messageParagraph);
  errorModal.showModal();
};

const showWarning = (message) => {
  warningMessageContainer.innerHTML = "";
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = message;
  warningMessageContainer.appendChild(messageParagraph);
  warningModal.showModal();
};

const showInform = (message) => {
  infoMessageContainer.innerHTML = "";
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = message;
  infoMessageContainer.appendChild(messageParagraph);
  infoModal.showModal();
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export { showError, showWarning, showInform };
