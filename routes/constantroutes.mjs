/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import express from "express";
import { getConstant } from "../controllers/constantcontroller.mjs";

/*-------------------------------*/
/*GLOBAL VARIABLES*/
/*-------------------------------*/
const router = express.Router();

/*-------------------------------*/
/*SERVER ROUTING*/
/*-------------------------------*/
router.route("/:constant").get(getConstant);

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default router;
