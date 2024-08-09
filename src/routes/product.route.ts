import { pagination } from "./../middleware/pagination";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./../controllers/product.controller";
import express from "express";
import { isValidProductId, validateCreatePayload, validateUpdatePayload } from "../middleware/product-validation";
import { isAuth, restrictTo } from "../middleware/auth.middleware";

const router = express.Router();
router.use(isAuth);
router.route("/products").get(pagination, getProducts).post(isAuth, restrictTo("ADMIN"), validateCreatePayload, createProduct);

router
  .route("/products/:id")
  .all(isValidProductId)
  .get(getProduct)
  .all(isAuth, restrictTo("ADMIN"))
  .delete(deleteProduct)
  .patch(validateUpdatePayload, updateProduct);

export default router;
