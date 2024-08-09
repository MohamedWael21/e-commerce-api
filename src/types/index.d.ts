import { Prisma, Role, Status } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

declare global {
  declare type ExpressRequest = Request & { userId?: number };
  declare type ExpressResponse = Response;
  declare type ExpressNextFunction = NextFunction;
  declare type AsyncRequestHandler = (_: ExpressRequest, _: ExpressResponse, _: ExpressNextFunction) => Promise<void>;

  type FilteredUsersField = Prisma.UserWhereInput;
  type ProductCreatePayload = Prisma.ProductCreateInput;
  type ProductUpdatePayload = Prisma.ProductUpdateInput;

  type OrderUpdatePayload = Prisma.OrderUpdateInput;
  type OrderCreatePayload = Prisma.OrderCreateInput;
  type OrderItemCreatePayload = {
    orderId: number;
    productId: number;
    quantity: number;
  };

  type UserRoles = Role;
  type OrderStatus = Status;

  type UserCreatePayload = Prisma.UserCreateInput;

  type CartItemsPayload = {
    productId: number;
    quantity: number;
  };
}
