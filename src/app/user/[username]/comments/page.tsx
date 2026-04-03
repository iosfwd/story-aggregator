import { prisma } from "@/lib/prisma";
import UserComments from "@/components/user-comments";
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

  const comments = await prisma.comment.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      author: true,
      parent: {
        include: {
          story: true,
          author: true,
        },
      },
      story: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  // TODO: add deduplication
  const flattened = comments.flatMap((comment) =>
    comment.parent ? [comment, comment.parent] : comment,
  );

  return (
    <div>
      <h1>
        comments submitted by <Link href={`/user/${username}`}>{username}</Link>
      </h1>

      <UserComments comments={flattened} />
    </div>
  );
}
