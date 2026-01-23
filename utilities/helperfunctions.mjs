/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import fs from "fs";
import AppError from "../utilities/apperror.mjs";

/*-------------------------------*/
/*HELPERFUNCTIONS*/
/*-------------------------------*/
//A megfelelő időformátum kialakítását végző függvény
const createTimeFormat = (string) => {
  const year = Number(string.slice(0, 4));
  const month = Number(string.slice(4, 6)) - 1;
  const day = Number(string.slice(6, 8));
  const hour = Number(string.slice(8, 10));
  const minute = Number(string.slice(10));
  const utcDateTime = new Date(Date.UTC(year, month, day, hour, minute));
  return utcDateTime;
};

//A naplózási időt generáló függvény
const logDateTime = () => {
  return new Date(Date.now()).toISOString();
};

//Az adatok törlési időpontját generáló függvény (24 órával korábbi adatok)
const getdeletingUtcDataTime = () => {
  const actualUtcDataTime = new Date(logDateTime());
  actualUtcDataTime.setMinutes(
    Math.floor(actualUtcDataTime.getMinutes() / 10) * 10 - 10
  );
  actualUtcDataTime.setSeconds(0);
  actualUtcDataTime.setMilliseconds(0);
  return new Date(actualUtcDataTime.getTime() - 3 * 60 * 60 * 1000);
};

//A szerver naplózási fájlt szerkesztő függvény
const serverLogging = (message) => {
  fs.writeFileSync("./logs/server.log", `${logDateTime()} ${message}\n`, {
    flag: "a",
  });
  if (process.env.NODE_ENV === "development") {
    console.log(`${logDateTime()} ${message}`);
  }
};

//StationId validáció
const validateStationId = (req, res, next) => {
  const { stationid } = req.params;
  if (!/^\d{5}$/.test(stationid)) {
    return next(new AppError("A stationId csak ötjegyű szám lehet.", 400));
  }
  next();
};

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export {
  createTimeFormat,
  logDateTime,
  getdeletingUtcDataTime,
  serverLogging,
  validateStationId,
};
