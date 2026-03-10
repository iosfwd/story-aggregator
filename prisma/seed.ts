import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.vote.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.story.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      { username: "alice" },
      { username: "bob" },
      { username: "charlie" },
      { username: "diana" },
    ],
  });

  const users = await prisma.user.findMany();

  const alice = users.find((u) => u.username === "alice")!;
  const bob = users.find((u) => u.username === "bob")!;
  const charlie = users.find((u) => u.username === "charlie")!;
  const diana = users.find((u) => u.username === "diana")!;

  const story1 = await prisma.story.create({
    data: {
      slug: "prisma-orm",
      title: "Prisma ORM Overview",
      url: "https://www.prisma.io",
      authorId: alice.id,
      score: 0,
    },
  });

  const story2 = await prisma.story.create({
    data: {
      slug: "nextjs-docs",
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      authorId: bob.id,
      score: 0,
    },
  });

  const votes = [
    { userId: bob.id, storyId: story1.id, value: 1 },
    { userId: charlie.id, storyId: story1.id, value: 1 },
    { userId: diana.id, storyId: story1.id, value: -1 },

    { userId: alice.id, storyId: story2.id, value: 1 },
    { userId: charlie.id, storyId: story2.id, value: 1 },
  ];

  await prisma.vote.createMany({
    data: votes,
  });

  const score1 = votes
    .filter((v) => v.storyId === story1.id)
    .reduce((sum, v) => sum + v.value, 0);

  const score2 = votes
    .filter((v) => v.storyId === story2.id)
    .reduce((sum, v) => sum + v.value, 0);

  await prisma.story.update({
    where: { id: story1.id },
    data: { score: score1 },
  });

  await prisma.story.update({
    where: { id: story2.id },
    data: { score: score2 },
  });

  const comment1 = await prisma.comment.create({
    data: {
      content: "Prisma has made database work much easier.",
      authorId: bob.id,
      storyId: story1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: "The Next.js docs are actually very good.",
      authorId: charlie.id,
      storyId: story2.id,
    },
  });

  const reply1 = await prisma.comment.create({
    data: {
      content: "Agreed. Type safety is great.",
      authorId: alice.id,
      storyId: story1.id,
      parentId: comment1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "I still prefer raw SQL sometimes.",
      authorId: diana.id,
      storyId: story1.id,
      parentId: reply1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Their routing explanation helped me a lot.",
      authorId: alice.id,
      storyId: story2.id,
      parentId: comment2.id,
    },
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
