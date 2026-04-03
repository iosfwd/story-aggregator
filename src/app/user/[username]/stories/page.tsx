import { prisma } from "@/lib/prisma";
import Stories from "@/components/stories";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) {
    notFound();
  }

  const stories = await prisma.story.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return (
    <div>
      <h1>
        stories submitted by <Link href={`/user/${username}`}>{username}</Link>
      </h1>
      <Stories stories={stories} />
    </div>
  );
}
