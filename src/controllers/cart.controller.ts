import * as cartService from "../services/cart.service";
import * as paymentService from "../services/payment.service";
import { catchAsyncError } from "../utils/catch-async-error";
import send from "../utils/send-res";

export const getCartItems = catchAsyncError(async (req, res) => {
  const cartItems = await cartService.getCartItems(req.userId!);

  send(res, { cartItems });
});

export const updateCart = catchAsyncError(async (req, res) => {
  await cartService.updateCart(req.userId!, req.body);

  send(res, { message: "Cart updated successfully" });
});
export const deleteCartItem = catchAsyncError(async (req, res) => {
  await cartService.deleteCartItem(req.userId!, req.productId!);

  send(res, { message: "Cart deleted successfully" });
});

export const checkout = catchAsyncError(async (req, res) => {
  const session = await paymentService.createCheckoutSession(req.userId!);

  res.redirect(303, session.url!);
});
