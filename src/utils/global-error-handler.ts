import { NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";

export default function (err: AppError, req: Request, res: Response, _: NextFunction) {
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Invalid token. Please Log in again!", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new AppError("Your token has expired. Please Log in again!", 401);
  }

  // don't leaks internal error details in production
  if (!err.isOperational && process.env.NODE_ENV === "production") {
    err.message = "Something went wrong. Please try again later.";
  }

  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    status: "error",
    error: {
      message: err.message,
    },
  });
}
