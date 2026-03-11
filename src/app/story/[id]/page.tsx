import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!story) {
    notFound();
  }

  return <div>{story.title} {story.author.username}</div>;
}
