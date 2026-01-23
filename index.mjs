/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import schedule from "node-schedule";
import morgan from "morgan";
import compression from "compression";
import "dotenv/config";
import {
  clearDownloadsFolder,
  downloadZIP,
  extractZIPtoCSV,
  deleteZIP,
  findCSV,
  readDatasFromCSV,
  formatCSVDatas,
  insertToDatabase,
  deleteCSV,
  deleteFromDatabase,
} from "./utilities/serverprocesselements.mjs";
import { withRetry, catchAsync } from "./utilities/asynchelpers.mjs";
import {
  isNetworkError,
  isFileHandlingError,
  isFileSystemError,
} from "./utilities/errorclassifier.mjs";
import { serverLogging } from "./utilities/helperfunctions.mjs";
import constantRouter from "./routes/constantroutes.mjs";
import staticdataRouter from "./routes/staticdataroutes.mjs";
import metdataRouter from "./routes/metdataroutes.mjs";
import errorController from "./controllers/errorcontroller.mjs";
import AppError from "./utilities/apperror.mjs";

/*-------------------------------*/
/*GLOBAL VARIABLES*/
/*-------------------------------*/
const server = express();
server.use(cors()); //Routerben is használható!

const port = process.env.PORT ?? 3333;
const accessLogStream = fs.createWriteStream("./logs/access.log", {
  flags: "a",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*-------------------------------*/
/*SERVER MIDDLEWARES*/
/*-------------------------------*/
/*server.use(express.json());*/
server.use(
  morgan(
    ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: accessLogStream }
  )
);
// Statikus fájlok kiszolgálása a public mappából
server.use(express.static(path.join(__dirname, "./public")));
//Routing middlewares
server.get("/aerodromes", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/aerodromes/index.html"));
});
server.use("/api/v1/stationdatas/constants", constantRouter);
server.use("/api/v1/stationdatas/staticdatas", staticdataRouter);
server.use("/api/v1/stationdatas/metdatas", metdataRouter);
server.all("*", (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server!`, 404));
});
//Data compression middleware
server.use(compression());
//Error handling middleware
server.use(errorController);

/*-------------------------------*/
/*SERVER LISTENING*/
/*-------------------------------*/
server.listen(port, () => {
  const message = `✅ The server is listening on port ${port}.`;
  serverLogging(message);
});

/*-------------------------------*/
/*DATABASE CONNECTION*/
/*-------------------------------*/
const connectToDatabase = async () => {
  const dbname = "metDatas";
  await mongoose.connect(process.env.DATABASE_URL);
  const connectionMessage = `✅ Csatlakozás sikerült a ${dbname} adatbázishoz.`;
  serverLogging(connectionMessage);
  return;
};

await withRetry(async () => await connectToDatabase(), {
  subject: "Adatbázis csatlakozás",
  retries: 5,
  shouldRetry: (error) => isNetworkError(error),
});

/*-------------------------------*/
/*AUTOMATIC SERVER PROCESS*/
/*-------------------------------*/
//Ez a függvény a szerver automatikus folyamatait fogja össze
const serverProcess = async () => {
  try {
    await withRetry(async () => await clearDownloadsFolder(), {
      subject: "Downloads mappa kiürítés",
      shouldRetry: (error) => isFileHandlingError(error),
    });

    await withRetry(async () => await downloadZIP(), {
      subject: "ZIP file letöltés",
      retries: 5,
      shouldRetry: (error) => isNetworkError(error),
    });

    await withRetry(async () => await extractZIPtoCSV(), {
      subject: "ZIP file kicsomagolás",
      shouldRetry: (error) => isFileHandlingError(error),
    });

    await withRetry(async () => await deleteZIP(), {
      subject: "ZIP file törlés",
      shouldRetry: (error) => isFileHandlingError(error),
    });

    const csvFilePath = await withRetry(async () => await findCSV(), {
      subject: "CSV file keresés",
      shouldRetry: (error) => isFileHandlingError(error),
    });

    const rawDatas = await withRetry(
      async () => await readDatasFromCSV(csvFilePath),
      {
        subject: "CSV file beolvasás",
        shouldRetry: (error) => isFileSystemError(error),
      }
    );

    const [metDatas, staticDatas] = formatCSVDatas(rawDatas);

    await withRetry(async () => await deleteFromDatabase(), {
      subject: "Adatbázisból törlés",
      retries: 5,
    });

    await withRetry(async () => await insertToDatabase(metDatas, staticDatas), {
      subject: "Adatbázisba mentés",
      retries: 5,
    });

    await withRetry(async () => await deleteCSV(csvFilePath), {
      subject: "CSV file törlés",
      shouldRetry: (error) => isFileHandlingError(error),
    });

    const message = `✅ A szerver folyamat lefutott.`;
    serverLogging(message);
  } catch (error) {
    const message = `❌ Hiba a szerver folyamat során: ${error}`;
    serverLogging(message);
  } finally {
    console.log("------------------------------------------------------");
  }
};
/* serverProcess(); */

//Ez a függvény szerverfolyamatok 10 percenkénti ütemezését végzi
/* const scheduleRule = new schedule.RecurrenceRule();
scheduleRule.minute = [0, 10, 20, 30, 40, 50];
scheduleRule.second = 50;
const job = schedule.scheduleJob(scheduleRule, () => {
  serverProcess();
}); */

/*TODO:
1. Frontend rész elkészítése
2. Mértékegység átváltás
3. Hatékony naplózás
4. 
5. 
6. 
7. 
8. 
*/
