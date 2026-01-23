/*-------------------------------*/
/*APPERROR CLASS*/
/*-------------------------------*/
class AppError extends Error {
  constructor(message, statusCode, cause = null) {
    super(message, { cause });

    this.name = this.constructor.name;
    this.statusCode = statusCode ?? 500;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    if (cause) this.cause = cause;

    Error.captureStackTrace(this, this.constructor);
  }
}

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default AppError;
