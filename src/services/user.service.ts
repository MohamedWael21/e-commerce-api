import prisma from "../config/prisma";

export async function isUserExist(filteredField: FilteredUsersField) {
  const count = await prisma.user.count({
    where: filteredField,
  });

  return count > 0;
}

export async function getUser(filteredField: FilteredUsersField) {
  return await prisma.user.findFirst({
    where: filteredField,
  });
}
