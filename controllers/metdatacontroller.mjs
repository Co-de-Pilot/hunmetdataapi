/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import Metdata from "../models/metdatamodel.mjs";
import APIFeatures from "../utilities/apifeatures.mjs";
import { withRetry, catchAsync } from "../utilities/asynchelpers.mjs";
import AppError from "../utilities/apperror.mjs";

/*-------------------------------*/
/*ROUTE HANDLERS*/
/*-------------------------------*/
const getAllMetdata = catchAsync(async (request, response, next) => {
  const features = new APIFeatures(Metdata.find(), request.query)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();
  const metdatas = await features.query;
  response.status(200).json({
    status: "success",
    results: metdatas.length,
    data: { metdatas },
  });
});

const getWinddirectionByStationId = catchAsync(
  async (request, response, next) => {
    const result = await Metdata.findOne(
      {
        stationId: request.params.stationid,
        winddirection: { $exists: true, $ne: null },
      },
      { winddirection: 1, stationId: 1 },
    ).sort({ utcDataTime: -1 });
    if (!result) {
      return next(
        new AppError(
          "❌ No wind direction data found for this stationId!",
          404,
        ),
      );
    }
    const metdatas = {
      stationId: result.stationId,
      winddirection: result.winddirection,
    };
    response.status(200).json({
      status: "success",
      data: { metdatas },
    });
  },
);

const getAllMetdataBystationId = catchAsync(async (request, response, next) => {
  const features = new APIFeatures(
    Metdata.find({
      stationId: request.params.stationid,
    }),
    request.query,
  )
    .filter()
    .sort()
    .fieldLimit()
    .paginate();
  const metdatas = await features.query;
  if (metdatas.length === 0) {
    return next(
      new AppError("❌ No meteorological data found with that stationId!", 404),
    );
  }
  response.status(200).json({
    status: "success",
    results: metdatas.length,
    data: { metdatas },
  });
});

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export { getAllMetdata, getWinddirectionByStationId, getAllMetdataBystationId };
