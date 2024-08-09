import { catchAsyncError } from "../utils/catch-async-error";
import * as productService from "../services/product.service";
import send from "../utils/send-res";
import { cache, getFromCache } from "../utils/helpers";

export const getProducts = catchAsyncError(async (req, res) => {
  const key = `products?page=${req.page}`;
  const cachedData = await getFromCache(key);
  if (cachedData) {
    return send(res, JSON.parse(cachedData));
  }
  const data = await productService.getProducts(req.page!);
  cache(key, JSON.stringify(data));
  send(res, data);
});

export const createProduct = catchAsyncError(async (req, res) => {
  const newProduct = await productService.createProduct(req.body);
  send(res, { newProduct }, 201);
});

export const getProduct = catchAsyncError(async (req, res) => {
  const key = `products:${req.productId}`;
  const cachedData = await getFromCache(key);
  if (cachedData) {
    return send(res, JSON.parse(cachedData));
  }
  const product = await productService.getProduct(req.productId!);
  cache(key, JSON.stringify({ product }));
  send(res, { product });
});

export const deleteProduct = catchAsyncError(async (req, res) => {
  const deletedProduct = await productService.deleteProduct(req.productId!);

  send(res, { deletedProduct });
});

export const updateProduct = catchAsyncError(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.productId!, req.body);

  send(res, { updatedProduct });
});
