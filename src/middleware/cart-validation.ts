import Joi from "joi";
import { catchAsyncError } from "../utils/catch-async-error";
import formatValidationErrors from "../utils/joi-helper";
import { AppError, ValidationError } from "../utils/app-error";
import { isInStock, isProductExist } from "../services/product.service";
import { getCartItems, isProductExistInCart } from "../services/cart.service";

const updatePayloadSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(0).required(),
});

export const validateUpdatePayload = catchAsyncError(async (req, _, next) => {
  const { error, value } = updatePayloadSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(new ValidationError(formatValidationErrors(error.details), 400));
  }

  await validateCartItem(req.body);

  req.body = value;
  next();
});

async function validateCartItem(cartItem: { productId: number; quantity: number }) {
  let isValid = await isProductExist(cartItem.productId);
  if (!isValid) throw new AppError("Product doesn't exists", 404);
  isValid = await isInStock(cartItem.productId, cartItem.quantity);
  if (!isValid) throw new AppError("The quantity is out of stock", 400);
}

export const isProductInCart = catchAsyncError(async (req, _, next) => {
  const productId = Number(req.params.id);
  if (isNaN(productId)) {
    return next(new AppError("id isn't a number", 400));
  }
  let isValid = await isProductExist(productId);

  isValid = await isProductExistInCart(req.userId!, productId);

  if (!isValid) {
    return next(new AppError("Product doesn't exist", 404));
  }

  req.productId = productId;
  next();
});

export const validateBeforeCheckout = catchAsyncError(async (req, _, next) => {
  const cartItems = await getCartItems(req.userId!);
  if (cartItems.length === 0) return next(new AppError("Cart is empty", 400));
  for (const { product, quantity } of cartItems) {
    await validateCartItem({ productId: product.id, quantity });
  }
  next();
});
