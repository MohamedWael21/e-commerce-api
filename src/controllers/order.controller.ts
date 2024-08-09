import * as orderService from "../services/order.service";
import * as paymentService from "../services/payment.service";
import { catchAsyncError } from "../utils/catch-async-error";
import send from "../utils/send-res";

export const getOrders = catchAsyncError(async (req, res) => {
  const data = await orderService.getOrders(req.page!);

  send(res, data);
});

export const getOrder = catchAsyncError(async (req, res) => {
  const order = await orderService.getOrder(req.orderId!);

  send(res, { order });
});

export const updateOrder = catchAsyncError(async (req, res) => {
  const updatedOrder = await orderService.updateOrder(req.orderId!, req.body);

  send(res, { updatedOrder });
});

export const deleteOrder = catchAsyncError(async (req, res) => {
  const deletedOrder = await orderService.deleteOrder(req.orderId!);

  send(res, { deletedOrder });
});

export const getUserOrders = catchAsyncError(async (req, res) => {
  const orders = await orderService.getUserOrders(req.userId!);

  send(res, { orders });
});

export const createOrder = catchAsyncError(async (req, res) => {
  await paymentService.createOrder(req.userId!);

  send(res, { message: "Order Created successfully" });
});
