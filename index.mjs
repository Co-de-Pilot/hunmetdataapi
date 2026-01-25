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
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import "dotenv/config";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
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
  isMongoAuthError,
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "error",
    message: "Túl sok kérés, próbáld újra később.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

let isShuttingDown = false;

/*-------------------------------*/
/*SERVER MIDDLEWARES*/
/*-------------------------------*/
//HELMET XSS védelemre
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://unpkg.com", "https://cdn.jsdelivr.net"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://unpkg.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: [
          "'self'",
          "data:",
          "https://*.tile.openstreetmap.org",
          "https://tile.openstreetmap.org",
        ],
        connectSrc: [
          "'self'",
          "https://hunmetdataapi.hu",
          "http://localhost:3333", // Csak fejlesztéshez
          "https://unpkg.com", // .map fájlokhoz
          "https://cdn.jsdelivr.net", // .map fájlokhoz
        ],
      },
    },
  }),
);

//API ACCES LOG
server.use(
  morgan(
    ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: accessLogStream },
  ),
);

//NoSQL injection támadások ellen
//Jelenleg nem szükséges, mivel nincs POST/PUT body parsing
server.use(mongoSanitize());

//Data compression middleware
server.use(compression());

// Statikus fájlok kiszolgálása a public mappából
server.use(express.static(path.join(__dirname, "./public")));
server.get("/aerodromes", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/aerodromes/index.html"));
});

// Rate limiting csak az API-ra
server.use("/api", limiter);

// API routes
server.use("/api/v1/stationdatas/constants", constantRouter);
server.use("/api/v1/stationdatas/staticdatas", staticdataRouter);
server.use("/api/v1/stationdatas/metdatas", metdataRouter);
server.all("*", (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server!`, 404));
});

//Error handling middleware
server.use(errorController);

/*-------------------------------*/
/*SERVER LISTENING*/
/*-------------------------------*/
const httpServer = server.listen(port, () => {
  const message = `✅ The server is listening on port ${port}.`;
  serverLogging(message);
});

/*-------------------------------*/
/*DATABASE CONNECTION*/
/*-------------------------------*/
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const dbname = mongoose.connection.name;
    serverLogging(`✅ Connection to database ${dbname} successful.`);
  } catch (error) {
    if (isMongoAuthError(error)) {
      serverLogging(`⛔ CRITICAL: IP address not allowed in MongoDB Atlas!`);
      serverLogging(`🔃 Add current IP here: https://cloud.mongodb.com`);
      process.exit(1); // Ne próbálkozzon újra, azonnali leállás
    }
    throw error; // Egyéb hibáknál retry működhet
  }
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
      },
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

    const message = `✅ The server process has finished.`;
    serverLogging(message);
  } catch (error) {
    const message = `❌ Error during server process: ${error}`;
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

const gracefulShutdown = async (signal) => {
  if (isShuttingDown) return; // Már folyamatban van
  isShuttingDown = true;
  await serverLogging(`🔚 ${signal} received. Shutting down gracefully...`);
  try {
    await new Promise((resolve) => {
      httpServer.close(resolve);
    });
    await serverLogging("❎ HTTP server closed.");

    await mongoose.connection.close();
    await serverLogging("❎ MongoDB connection closed.");
  } catch (error) {
    await serverLogging(`❌ Error during shutdown: ${error.message}`);
  }
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", async (reason) => {
  await serverLogging(`❗ Unhandled Rejection: ${reason}`);
  gracefulShutdown("UNHANDLED_REJECTION");
});

process.on("uncaughtException", async (error) => {
  await serverLogging(`❗ Uncaught Exception: ${error.message}`);
  process.exit(1);
});
/*TODO:
1. Hatékony naplózás
2. 
3. 
4. 
5. 
6. 
7. 
8. 
*/
