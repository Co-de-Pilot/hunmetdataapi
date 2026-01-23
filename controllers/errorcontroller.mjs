/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import AppError from "../utilities/apperror.mjs";

/*-------------------------------*/
/*ERROR HANDLERS*/
/*-------------------------------*/
const sendErrorDev = (error, response, request) => {
  response.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error, response, request) => {
  if (error.isOperational) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    response.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

const handleIDErrorDb = (error) => {
  const message = `Invalid ${error.path}: ${error.value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = (error) => {
  const message = Object.keys(error.errors).reduce(
    (message, validationField) => {
      return message + " " + error.errors[validationField].properties.message;
    },
    "Validation error:"
  );
  return new AppError(message, 400);
};

const errorController = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, response, request);
  } else if (process.env.NODE_ENV === "production") {
    let prodError = { ...error };
    prodError.message = error.message;
    if (prodError.kind === "ObjectId") {
      prodError = handleIDErrorDb(prodError);
    }
    if (prodError._message === "Validation failed") {
      prodError = handleValidationErrorDb(prodError);
    }
    sendErrorProd(prodError, response, request);
  }
};

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default errorController;
