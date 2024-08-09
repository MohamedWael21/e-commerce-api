import Joi from "joi";
import { catchAsyncError } from "../utils/catch-async-error";
import { ValidationError } from "../utils/app-error";
import formatValidationErrors from "../utils/joi-helper";
import { isUserExist } from "../services/user.service";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

export const validateLoginPayload = catchAsyncError(async (req, _, next) => {
  const { username, password } = req.body;

  const { error, value } = loginSchema.validate({ username, password }, { abortEarly: false });

  if (error) {
    return next(new ValidationError(formatValidationErrors(error.details), 400));
  }

  req.body = value;
  next();
});

export const validateSignupPayload = catchAsyncError(async (req, _, next) => {
  const { username, password } = req.body;

  const { error, value } = signupSchema.validate({ username, password }, { abortEarly: false });
  if (error) {
    return next(new ValidationError(formatValidationErrors(error.details), 400));
  }

  req.body = value;
  next();
});

export const validateUsernameIfUnique = catchAsyncError(async (req, _, next) => {
  const isExist = await isUserExist({ username: req.body.username });

  if (isExist) return next(new ValidationError({ username: "username is exists" }, 400));

  next();
});
