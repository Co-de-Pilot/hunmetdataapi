/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import Staticdata from "../models/staticdatamodel.mjs";
import APIFeatures from "../utilities/apifeatures.mjs";
import { withRetry, catchAsync } from "../utilities/asynchelpers.mjs";
import AppError from "../utilities/apperror.mjs";

/*-------------------------------*/
/*ROUTE HANDLERS*/
/*-------------------------------*/
const getAllStaticdata = catchAsync(async (request, response, next) => {
  const features = new APIFeatures(Staticdata.find(), request.query)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();
  const staticdatas = await features.query;
  response.status(200).json({
    status: "success",
    results: staticdatas.length,
    data: { staticdatas },
  });
});

const getSingleStaticdataBystationId = catchAsync(
  async (request, response, next) => {
    const features = new APIFeatures(
      Staticdata.find({
        stationId: request.params.stationid,
      }),
      request.query
    )
      .filter()
      .sort()
      .fieldLimit()
      .paginate();
    const staticdatas = await features.query;
    if (staticdatas.length === 0) {
      return next(new AppError("No data found with that stationId!", 404));
    }
    response.status(200).json({
      status: "success",
      results: staticdatas.length,
      data: { staticdatas },
    });
  }
);

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export { getAllStaticdata, getSingleStaticdataBystationId };
