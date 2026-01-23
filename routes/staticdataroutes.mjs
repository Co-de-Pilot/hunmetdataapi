/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import express from "express";
import {
  getAllStaticdata,
  getSingleStaticdataBystationId,
  getAllAerodromedata,
} from "../controllers/staticdatacontroller.mjs";
import { validateStationId } from "../utilities/helperfunctions.mjs";

/*-------------------------------*/
/*GLOBAL VARIABLES*/
/*-------------------------------*/
const router = express.Router();

/*-------------------------------*/
/*SERVER ROUTING*/
/*-------------------------------*/
router.route("/").get(getAllStaticdata);
router.route("/aerodromes").get(getAllAerodromedata);
router
  .route("/:stationid")
  .get(validateStationId, getSingleStaticdataBystationId);

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default router;
