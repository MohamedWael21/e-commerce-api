import express from "express";
import { isAuth } from "../middleware/auth.middleware";
import cartRouter from "./cart.route";
import { getUserOrders, createOrder } from "../controllers/order.controller";

const router = express.Router();

router.use(isAuth);
router.use("/me", cartRouter);
router.get("/me/orders", getUserOrders);
router.post("/me/orders", createOrder);

export default router;
