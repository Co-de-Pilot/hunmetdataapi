/*-------------------------------*/
/*MODUL IMPORT                   */
/*-------------------------------*/
import { showError, showWarning } from "./messagefactory.mjs";

/*-------------------------------*/
/*VARIABLES                      */
/*-------------------------------*/
const baseApiUrl = "https://hunmetdataapi.hu/api/v1/stationdatas/";

/*-------------------------------*/
/*FETCH FACTORY                  */
/*-------------------------------*/
const fetchfactory = async (collection, param, subject, emptyResult) => {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const result = await fetch(`${baseApiUrl}${collection}/${param}`, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!result.ok) {
      const errorData = await result.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${result.status}: Failed to get ${subject}`
      );
    }
    const data = await result.json();
    if (data.results === 0) {
      showWarning(`No ${subject} found (empty result)!`);
      return emptyResult;
    }
    return data.data[collection];
  } catch (error) {
    let errorMessage = error.message;
    if (error.name === "AbortError") {
      errorMessage = `Request timeout: ${subject} took too long to load`;
    } else if (error instanceof TypeError) {
      errorMessage = `Network error: Cannot connect to server`;
    }
    showError(errorMessage);
    return emptyResult;
  }
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export default fetchfactory;
