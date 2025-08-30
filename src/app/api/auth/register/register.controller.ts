import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function userCreate(data: Prisma.UserCreateArgs) {
  return prisma.user.create(data);
}

export async function userUpdate(data: Prisma.UserUpdateArgs) {
  return prisma.user.update(data);
}

export async function userDelete(data: Prisma.UserDeleteArgs) {
  return prisma.user.delete(data);
}

export async function findUser(data: Prisma.UserFindUniqueArgs) {
  return prisma.user.findUnique(data);
}

export async function userUsers(data: Prisma.UserFindManyArgs) {
  return prisma.user.findMany(data);
}

export async function userCount(data: Prisma.UserCountArgs) {
  return prisma.user.count(data);
}
