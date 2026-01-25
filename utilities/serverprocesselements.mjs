/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import got from "got";
import unzipper from "unzipper";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import {
  createTimeFormat,
  logDateTime,
  getdeletingUtcDataTime,
  serverLogging,
} from "./helperfunctions.mjs";
import { staticDataSample, metDataSample } from "./datasamples.mjs";
import Staticdata from "../models/staticdatamodel.mjs";
import Metdata from "../models/metdatamodel.mjs";
import AppError from "./apperror.mjs";

/*-------------------------------*/
/*GLOBAL VARIABLES*/
/*-------------------------------*/
const zipUrl =
  "https://odp.met.hu/weather/weather_reports/synoptic/hungary/10_minutes/csv/HABP_10M_SYNOP_LATEST.csv.zip";
const destinationFolder = "./downloads/";
const zipFilename = "latest_datas.zip";
const zipPath = destinationFolder + zipFilename;

/*-------------------------------*/
/*SERVER PROCESS ELEMENTS*/
/*-------------------------------*/
const clearDownloadsFolder = async () => {
  const files = await fs.promises.readdir(destinationFolder);
  for (const file of files) {
    await fs.promises.unlink(path.join(destinationFolder, file));
  }
  const message = `✅ Downloads folder has been emptied.`;
  serverLogging(message);
  return;
};

const downloadZIP = async () => {
  await fs.promises.mkdir(destinationFolder, { recursive: true });
  await new Promise((resolve, reject) => {
    const zipDownloadStream = got.stream(zipUrl);
    const fileStream = fs.createWriteStream(zipPath);
    zipDownloadStream.on("error", (err) => {
      zipDownloadStream.destroy(); //Félbehagyott stream elkerülése
      reject(err);
    });
    fileStream.on("finish", () => resolve());
    fileStream.on("error", reject);
    zipDownloadStream.pipe(fileStream);
  });
  const message = `✅ The ZIP file was successfully downloaded here: ${zipPath}.`;
  serverLogging(message);
  return;
};

//Ez a függvény kicsomagolja a ZIP file-ban lévő CSV fájlt
const extractZIPtoCSV = async () => {
  await fs.promises.access(zipPath, fs.constants.F_OK);
  const directory = await unzipper.Open.file(zipPath);
  await directory.extract({ path: destinationFolder });
  const message = `✅ The ZIP file was successfully extracted to: ${destinationFolder}.`;
  serverLogging(message);
  return;
};

//Ez a függvény törli a már szükségtelen ZIP file-t
const deleteZIP = async () => {
  await fs.promises.access(zipPath, fs.constants.F_OK);
  await fs.promises.unlink(zipPath);
  const message = `✅ The following ZIP file was successfully deleted: ${zipPath}.`;
  serverLogging(message);
  return;
};

//Ez a függvény a kicsomagolt CSV fájlt keresi meg
const findCSV = async () => {
  const files = await fs.promises.readdir(destinationFolder);
  const csvFile = files.find((file) => path.extname(file) === ".csv");
  if (!csvFile) {
    const message = `❌ No CSV file found in the extracted folder.`;
    serverLogging(message);
    throw new Error("❌ No CSV file found in the extracted folder.");
  }
  const csvFilePath = path.join(destinationFolder, csvFile);
  const message = `✅ The CSV file was successfully identified: ${csvFilePath}.`;
  serverLogging(message);
  return csvFilePath;
};

//Ez a függvény beolvassa a CSV fájl adatait
const readDatasFromCSV = async (csvFilePath) => {
  const results = await new Promise((resolve, reject) => {
    const dataRows = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => dataRows.push(data))
      .on("end", () => resolve(dataRows))
      .on("error", reject);
  });
  const message = `✅ CSV read succesful (${results.length} rows).`;
  serverLogging(message);
  return results;
};

//Ez a függvény a CSV fájlból kiolvasott adatokat formázza meg
const formatCSVDatas = (rawDatas) => {
  try {
    //Az adatbázisba mentendő meteo adat objektumok tömbje
    let metDatas = [];
    //Az adatbázisba mentendő állomás statikus adat objektumok tömbje
    let staticDatas = [];
    rawDatas
      .map((station) => Object.values(station))
      .map((stationdatas) =>
        stationdatas[0].split(";").map((item) => item.trim()),
      )
      .map((stationdatas, index) => {
        staticDatas.push({});
        staticDataSample.map((staticdata, staticdataIndex) => {
          if (staticdataIndex === 0 || staticdataIndex === 1) {
            staticDatas[index][staticdata.key] =
              stationdatas[staticdata.stationdataindex];
          } else if (staticdataIndex === 2) {
            staticDatas[index].location = { type: "Point", coordinates: [] };
            staticDatas[index].location.coordinates.push(
              Number(stationdatas[staticdata.stationdataindex]),
            );
          } else if (staticdataIndex === 3) {
            staticDatas[index].location.coordinates.unshift(
              Number(stationdatas[staticdata.stationdataindex]),
            );
          } else if (staticdataIndex === 5) {
            staticDatas[index].datasAvailable = [];
            staticDatas[index].datasAvailable.push(
              createTimeFormat(stationdatas[staticdata.stationdataindex]),
            );
          } else {
            staticDatas[index][staticdata.key] = Number(
              stationdatas[staticdata.stationdataindex],
            );
          }
        });
        metDatas.push({});
        metDataSample.map((metdata, metdataIndex) => {
          if (metdataIndex === 0) {
            metDatas[index][metdata.key] =
              stationdatas[metdata.stationdataindex];
          } else if (metdataIndex === 1) {
            metDatas[index][metdata.key] = createTimeFormat(
              stationdatas[metdata.stationdataindex],
            );
          } else if (stationdatas[metdata.stationdataindex] !== "-999") {
            metDatas[index][metdata.key] = Number(
              stationdatas[metdata.stationdataindex],
            );
          }
        });
      });
    const message = `✅ CSV data formatting succeeded. Number of formatted elements:\n1. static data: ${staticDatas.length}.\n2. meteo data: ${metDatas.length}.`;
    serverLogging(message);
    return [metDatas, staticDatas];
  } catch (error) {
    const message = `❌ Error formatting CSV data: ${error}.`;
    serverLogging(message);
  }
};

//Ez a függvény a 24 órával korábbi adatokat törli a MongoDB adatbázisból
const deleteFromDatabase = async () => {
  const metResult = await Metdata.deleteMany({
    utcDataTime: { $lt: getdeletingUtcDataTime() },
  });
  const staticResult = await Staticdata.updateMany(
    {},
    {
      $pull: {
        datasAvailable: { $lt: getdeletingUtcDataTime() },
      },
    },
  );
  const message = `✅ The deletion from the database was successful. The number of deleted meteo objects is ${metResult.deletedCount}, and the datasAvailable array has been updated at ${staticResult.modifiedCount} stations.`;
  serverLogging(message);
  return;
};

//Ez a függvény az adatokat a MongoDB adatbázisba menti
const insertToDatabase = async (metDatas, staticDatas) => {
  //Az állomások statikus adatainak adatbázisba mentése
  const staticOperations = staticDatas.map((staticdata) => ({
    updateOne: {
      filter: {
        stationId: staticdata.stationId,
      },
      update: {
        $setOnInsert: {
          stationId: staticdata.stationId,
          stationname: staticdata.stationname,
          location: staticdata.location,
          elevation: staticdata.elevation,
        },
        $addToSet: {
          datasAvailable: { $each: staticdata.datasAvailable },
        },
      },
      upsert: true,
    },
  }));
  const staticResult = await Staticdata.bulkWrite(staticOperations);
  const insertedStaticDatas = staticResult.upsertedCount;
  const modifiedStaticDatas = staticResult.modifiedCount;
  //Az állomások meteo adatainak adatbázisba mentése
  const metOperations = metDatas.map((metdata) => ({
    updateOne: {
      filter: {
        stationId: metdata.stationId,
        utcDataTime: metdata.utcDataTime,
      },
      update: { $set: metdata },
      upsert: true,
    },
  }));
  const metResult = await Metdata.bulkWrite(metOperations);
  const insertedMetDatas = metResult.upsertedCount;
  const modifiedMetDatas = metResult.modifiedCount;
  const message = `✅ The database was successfully saved as follows:\n1. new static data: ${insertedStaticDatas}.\n2. modified static data: ${modifiedStaticDatas}.\n3. new meteo data: ${insertedMetDatas}.\n4. modified meteo data: ${modifiedMetDatas}.`;
  serverLogging(message);
  return;
};

//Ez a függvény törli a már szükségtelen CSV file-t
const deleteCSV = async (csvFilePath) => {
  await fs.promises.access(csvFilePath, fs.constants.F_OK);
  await fs.promises.unlink(csvFilePath);
  const message = `✅ Successfully deleted CSV file: ${csvFilePath}.`;
  serverLogging(message);
};

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export {
  clearDownloadsFolder,
  downloadZIP,
  extractZIPtoCSV,
  deleteZIP,
  findCSV,
  readDatasFromCSV,
  formatCSVDatas,
  deleteFromDatabase,
  insertToDatabase,
  deleteCSV,
};
