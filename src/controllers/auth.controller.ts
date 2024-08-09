import { catchAsyncError } from "../utils/catch-async-error";
import * as authService from "../services/auth.service";
import send from "../utils/send-res";
import { createCookieTokenOnRes } from "../utils/helpers";

export const signup = catchAsyncError(async (req, res) => {
  const { newUser, token } = await authService.signup(req.body);
  createCookieTokenOnRes(res, token);
  send(res, { newUser, token }, 201);
});

export const login = catchAsyncError(async (req, res) => {
  const { loggedInUser, token } = await authService.login(req.body.username, req.body.password);
  createCookieTokenOnRes(res, token as string);
  send(res, { loggedInUser, token }, 201);
});
