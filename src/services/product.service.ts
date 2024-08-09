import prisma from "../config/prisma";
import { PRODUCTS_PER_PAGE } from "../constants";

export async function createProduct(product: ProductCreatePayload) {
  const newProduct = await prisma.product.create({
    data: product,
  });
  return newProduct;
}

export async function getProducts(page: number) {
  const totalProducts = await prisma.product.count();

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const products = await prisma.product.findMany({
    skip,
    take: PRODUCTS_PER_PAGE,
  });

  return {
    products,
    totalPages,
    currentPage: page,
    totalItems: totalProducts,
    itemsPerPage: PRODUCTS_PER_PAGE,
  };
}

export async function getProduct(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}

export async function updateProduct(id: number, product: ProductUpdatePayload) {
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: product,
  });
  return updatedProduct;
}

export async function deleteProduct(id: number) {
  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });
  return deletedProduct;
}

export async function isProductExist(id: number) {
  const count = await prisma.product.count({
    where: {
      id,
    },
  });
  return count > 0;
}

export async function isInStock(productId: number, quantity: number) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
  if (!product) return false;
  return product.stock >= quantity;
}
