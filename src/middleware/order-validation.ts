import Joi from "joi";
import { isOrderExist } from "../services/order.service";
import { AppError, ValidationError } from "../utils/app-error";
import { catchAsyncError } from "../utils/catch-async-error";
import formatValidationErrors from "../utils/joi-helper";
import { ORDER_STATUS } from "../constants";

const updatePayloadSchema = Joi.object<OrderUpdatePayload>({
  totalPrice: Joi.number(),
  status: Joi.string().valid(...ORDER_STATUS),
  date: Joi.date(),
})
  .min(1)
  .message("You must specify at least one field to update");

export const validateUpdatePayload = catchAsyncError(async (req, _, next) => {
  const { error, value } = updatePayloadSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(new ValidationError(formatValidationErrors(error.details), 400));
  }

  req.body = value;
  next();
});

export const isValidOrderId = catchAsyncError(async (req, _, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return next(new AppError("Invalid Id", 400));
  }

  const isExist = await isOrderExist(id);
  if (!isExist) return next(new AppError("Product Not Found", 404));

  req.orderId = id;
  next();
});
