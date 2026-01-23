/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import mongoose from "mongoose";
import validator from "validator";

/*-------------------------------*/
/*DATABASE MODEL*/
/*-------------------------------*/
const staticdataSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: [true, "Staticdata must have an ID."],
      validate: {
        validator: (value) =>
          validator.isNumeric(value, ["hu-HU"], { no_symbols: false }),
        message: "Station ID must only contain numbers!",
      },
    },
    stationname: {
      type: String,
      required: [true, "Staticdata must have a name."],
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    elevation: Number,
    datasAvailable: [Date],
  },
  { timestamps: true }
);

//Indexálás
staticdataSchema.index({ stationId: 1 });

const Staticdata = mongoose.model("Staticdata", staticdataSchema);

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default Staticdata;
