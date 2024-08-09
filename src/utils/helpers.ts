import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { promisify } from "util";
import redis from "../config/redis";

const COOKIE_MAX_AGE = 3 * 24 * 60 * 60 * 1000; // 3 days (milliseconds)
const MAX_AGE_FOR_CACHE = 24 * 60 * 60; // 1 day (seconds);

// eslint-disable-next-line no-unused-vars
type SignFunction = (payload: string | Buffer | object, secretOrPublicKey: Secret, options?: SignOptions) => Promise<never>;

const signAsync: SignFunction = promisify(jwt.sign) as never;

export async function getHashedPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

export async function isPasswordCorrect(password: string, hashedPassword: string) {
  const isSame = await bcrypt.compare(password, hashedPassword);
  return isSame;
}

export async function createToken(userId: number): Promise<string> {
  const token = await signAsync({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "3d",
  });
  return token;
}

export function createCookieTokenOnRes(res: ExpressResponse, token: string) {
  res.cookie("token", token, {
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
  });
}

export async function cache(key: string, value: string) {
  await redis.setEx(key, MAX_AGE_FOR_CACHE, value);
}

export async function getFromCache(key: string) {
  return await redis.get(key);
}
