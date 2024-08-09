// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      page?: number;
      productId?: number;
      userId?: number;
      orderId?: number;
    }
  }
}
