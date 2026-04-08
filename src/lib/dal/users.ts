import "server-only";
import { prisma } from "@/lib/prisma";

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    omit: { passwordHash: true },
  });
}

export async function createUser(username: string, passwordHash: string) {
  return await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });
}
