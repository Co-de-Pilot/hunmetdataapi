/*-------------------------------*/
/*MODUL IMPORT*/
/*-------------------------------*/
import { catchAsync } from "../utilities/asynchelpers.mjs";
import { staticDataSample, metDataSample } from "../utilities/datasamples.mjs";
import AppError from "../utilities/apperror.mjs";

/*-------------------------------*/
/*CREATE CONSTANT OBJECT*/
/*-------------------------------*/
const constantObject = {
  staticSample: staticDataSample,
  metSample: metDataSample,
};

/*-------------------------------*/
/*ROUTE HANDLERS*/
/*-------------------------------*/
const getConstant = catchAsync(async (request, response, next) => {
  const constants = constantObject[request.params.constant];
  if (!constants) {
    return next(new AppError("❌ No constant found with that key!", 404));
  }
  response.status(200).json({
    status: "success",
    results: constants.length,
    data: { constants },
  });
});

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export { getConstant };
