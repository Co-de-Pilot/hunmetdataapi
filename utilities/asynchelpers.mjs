/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import { serverLogging } from "./helperfunctions.mjs";

/*-------------------------------*/
/*CATCH ASYNC ERRORS*/
/*-------------------------------*/
const withRetry = async (asyncFunction, options = {}) => {
  const {
    subject = "",
    retries = 3, // Hány alkalommal próbálkozzon
    retryDelay = 1000, // Kezdő késleltetés ms-ben
    backoffFactor = 2, // Exponenciális szorzó
    shouldRetry = () => true, // Eldönti, hogy adott hibánál érdemes-e retryolni
  } = options;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await asyncFunction();
    } catch (error) {
      const canRetry = shouldRetry(error);

      serverLogging(
        `⚠️ ${attempt}/${retries} ${subject} kísérlet. Hiba: ${
          error.message || error
        }`
      );

      if (attempt === retries || !canRetry) {
        serverLogging(
          `❌ ${subject} meghiúsult ${attempt} kísérlet után az alábbi hiba miatt: ${
            error.message || error
          }`
        );
        throw error;
      }

      const delay = retryDelay * Math.pow(backoffFactor, attempt - 1);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

const catchAsync = (asyncFunction) => {
  return (request, response, next) => {
    asyncFunction(request, response, next).catch((error) => next(error));
  };
};

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export { withRetry, catchAsync };
