import express from "express";
import { isAuth, restrictTo } from "../middleware/auth.middleware";
import { deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/order.controller";
import { pagination } from "../middleware/pagination";
import { isValidOrderId } from "../middleware/order-validation";
import { validateUpdatePayload } from "../middleware/order-validation";

const router = express.Router();

router.route("/orders").all(isAuth, restrictTo("ADMIN")).get(pagination, getOrders);

router
  .route("/orders/:id")
  .all(isAuth, restrictTo("ADMIN"), isValidOrderId)
  .get(getOrder)
  .patch(validateUpdatePayload, updateOrder)
  .delete(deleteOrder);

export default router;
