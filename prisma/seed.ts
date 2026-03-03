import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const postData: Prisma.PostCreateInput[] = [
  { title: "Hello world" },
  { title: "Goodbye world" },
];

export async function main() {
  await prisma.post.deleteMany({});
  for (const p of postData) {
    await prisma.post.create({ data: p });
  }
}

main();
