import { AppError } from "../utils/app-error";
import { catchAsyncError } from "../utils/catch-async-error";

export const pagination = catchAsyncError(async (req, _, next) => {
  const page = Number(req.query.page) || 1;

  if (page <= 0) {
    return next(new AppError("Invalid page", 400));
  }

  req.page = page;
  next();
});
