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

const getAllMetdataBystationId = catchAsync(async (request, response, next) => {
  const features = new APIFeatures(
    Metdata.find({
      stationId: request.params.stationid,
    }),
    request.query
  )
    .filter()
    .sort()
    .fieldLimit()
    .paginate();
  const metdatas = await features.query;
  if (metdatas.length === 0) {
    return next(
      new AppError("No meteorological data found with that stationId!", 404)
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
export { getAllMetdata, getAllMetdataBystationId };
