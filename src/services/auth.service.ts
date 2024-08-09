import prisma from "../config/prisma";
import { AppError } from "../utils/app-error";
import { createToken, getHashedPassword, isPasswordCorrect } from "../utils/helpers";

export async function signup(user: UserCreatePayload) {
  user.password = await getHashedPassword(user.password);
  const newUser = await prisma.user.create({
    data: user,
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  const token = await createToken(newUser.id);

  return { newUser, token };
}

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  let isValid = false;
  let token;
  let loggedInUser;
  if (user) {
    isValid = await isPasswordCorrect(password, user.password);
    token = await createToken(user.id);

    loggedInUser = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        id: true,
        role: true,
      },
    });
  }

  if (!isValid) throw new AppError("username or password invalid", 401);

  return { token, loggedInUser };
}
