/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import express from "express";
import {
  getAllMetdata,
  getWinddirectionByStationId,
  getAllMetdataBystationId,
} from "../controllers/metdatacontroller.mjs";
import { validateStationId } from "../utilities/helperfunctions.mjs";

/*-------------------------------*/
/*GLOBAL VARIABLES*/
/*-------------------------------*/
const router = express.Router();

/*-------------------------------*/
/*SERVER ROUTING*/
/*-------------------------------*/
router.route("/").get(getAllMetdata);
router
  .route("/winddirection/:stationid")
  .get(validateStationId, getWinddirectionByStationId);
router.route("/:stationid").get(validateStationId, getAllMetdataBystationId);

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default router;
