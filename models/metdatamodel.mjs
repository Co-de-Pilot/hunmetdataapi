/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import mongoose from "mongoose";
import validator from "validator";

/*-------------------------------*/
/*DATABASE MODEL*/
/*-------------------------------*/
const metdataSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: [true, "Metdata must have an ID."],
      validate: {
        validator: (value) =>
          validator.isNumeric(value, ["hu-HU"], { no_symbols: false }),
        message: "Station ID must only contain numbers!",
      },
    },
    utcDataTime: {
      type: Date,
      required: [true, "Metdata must have a data time."],
    },
    precipitation: Number,
    temperature: Number,
    average10mintemperature: Number,
    minimum10mintemperature: Number,
    maximum10mintemperature: Number,
    horizontalvisibility: Number,
    airpressure: Number,
    relativehumidity: Number,
    average10mingammaradiation: Number,
    average10minglobalradiation: Number,
    average10minuvradiation: Number,
    average10minwindspeed: Number,
    winddirection: Number,
    maximum10minwindgustspeed: Number,
    maximum10minwindgustdirection: Number,
    maximum10minwindgustminute: Number,
    maximum10minwindgustsecond: Number,
    average10min5cmsoiltemperature: Number,
    average10min10cmsoiltemperature: Number,
    average10min20cmsoiltemperature: Number,
    average10min50cmsoiltemperature: Number,
    average10min100cmsoiltemperature: Number,
    average10mingroundtemperature: Number,
  },
  { timestamps: true }
);

//Indexálás
metdataSchema.index({ stationId: 1, utcDataTime: -1 });

const Metdata = mongoose.model("Metdata", metdataSchema);

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default Metdata;
