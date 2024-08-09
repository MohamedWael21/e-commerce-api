import express from "express";
import productRouter from "./product.route";
import authRouter from "./auth.route";
import orderRouter from "./order.route";
import userRouter from "./user.route";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/api", productRouter, orderRouter, userRouter);

export default router;
