import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const story = await prisma.story.findUnique({
    where: { id: parseInt(slug) },
    include: {
      author: true,
    },
  });

  if (!story) {
    notFound();
  }

  return <div>{story.title} {story.author.username}</div>;
}
