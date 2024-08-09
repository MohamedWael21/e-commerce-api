import express from "express";
import { checkout, deleteCartItem, getCartItems, updateCart } from "../controllers/cart.controller";
import { isProductInCart, validateBeforeCheckout, validateUpdatePayload } from "../middleware/cart-validation";

const router = express.Router();

router.route("/carts").get(getCartItems).put(validateUpdatePayload, updateCart);
router.route("/carts/:id").delete(isProductInCart, deleteCartItem);
router.post("/carts/checkout", validateBeforeCheckout, checkout);
export default router;
