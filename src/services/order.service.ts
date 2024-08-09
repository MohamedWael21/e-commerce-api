import prisma from "../config/prisma";
import { ORDERS_PER_PAGE } from "../constants";

export async function createOrder(order: OrderCreatePayload) {
  const newOrder = await prisma.order.create({
    data: order,
  });
  return newOrder;
}

export async function createOrderItem({ orderId, productId, quantity }: OrderItemCreatePayload) {
  const newOrderItem = await prisma.orderItem.create({
    data: {
      orderId,
      productId,
      quantity,
    },
  });

  return newOrderItem;
}

export async function getOrders(page: number) {
  const totalOrders = await prisma.order.count();

  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);

  const skip = (page - 1) * ORDERS_PER_PAGE;

  const orders = await prisma.order.findMany({
    skip,
    take: ORDERS_PER_PAGE,
  });

  return {
    orders,
    totalPages,
    currentPage: page,
    totalItems: totalOrders,
    itemsPerPage: ORDERS_PER_PAGE,
  };
}

export async function getOrder(id: number) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return order;
}

export async function updateOrder(id: number, order: OrderUpdatePayload) {
  const updatedOrder = await prisma.order.update({
    where: {
      id,
    },
    data: order,
  });
  return updatedOrder;
}

export async function deleteOrder(id: number) {
  const deletedOrder = await prisma.order.delete({
    where: {
      id,
    },
  });
  return deletedOrder;
}

export async function isOrderExist(id: number) {
  const count = await prisma.order.count({
    where: {
      id,
    },
  });
  return count > 0;
}

export async function getUserOrders(userId: number) {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItem: true,
    },
  });

  return orders;
}
