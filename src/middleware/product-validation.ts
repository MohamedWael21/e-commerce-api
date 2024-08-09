import Joi from "joi";
import { catchAsyncError } from "../utils/catch-async-error";
import { AppError, ValidationError } from "../utils/app-error";
import formatValidationErrors from "../utils/joi-helper";
import { isProductExist } from "../services/product.service";

const createPayloadSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  stock: Joi.number(),
  price: Joi.number().required(),
});
const updatePayloadSchema = createPayloadSchema
  .fork(["name", "description", "price", "stock"], (schema) => schema.optional())
  .min(1)
  .message("You must specify at least one field to update");

export const validateCreatePayload = catchAsyncError(async (req, _, next) => {
  const { error, value } = createPayloadSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(new ValidationError(formatValidationErrors(error.details), 400));
  }

  req.body = value;
  next();
});

export const validateUpdatePayload = catchAsyncError(async (req, _, next) => {
  const { error, value } = updatePayloadSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(new ValidationError(formatValidationErrors(error.details), 400));
  }

  req.body = value;
  next();
});

export const isValidProductId = catchAsyncError(async (req, _, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return next(new AppError("Invalid Id", 400));
  }

  const isExist = await isProductExist(id);
  if (!isExist) return next(new AppError("Product Not Found", 404));

  req.productId = id;
  next();
});
