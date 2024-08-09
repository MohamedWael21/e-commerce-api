import jwt, { Secret, VerifyOptions } from "jsonwebtoken";
import { promisify } from "util";
import { AppError } from "../utils/app-error";
import { catchAsyncError } from "../utils/catch-async-error";
import { getUser, isUserExist } from "../services/user.service";

// eslint-disable-next-line no-unused-vars
type VerifyFunction = (token: string, secretOrPublicKey: Secret, options?: VerifyOptions) => Promise<never>;

const verifyAsync: VerifyFunction = promisify(jwt.verify) as never;

export const isAuth = catchAsyncError(async (req, _, next) => {
  const { token } = req.cookies;

  if (!token) return next(new AppError("Token not Found. Please Log in.", 401));

  const { userId } = await verifyAsync(token, process.env.JWT_SECRET!);

  if (!isUserExist({ id: userId })) {
    return next(new AppError("User not exists", 401));
  }

  req.userId = userId;
  next();
});

export const restrictTo = (...roles: UserRoles[]) => {
  return catchAsyncError(async (req, _, next) => {
    const user = await getUser({ id: req.userId! });
    if (!user?.role || !roles.includes(user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  });
};
