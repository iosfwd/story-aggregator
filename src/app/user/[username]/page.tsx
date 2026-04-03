import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: {
        select: { comments: true, stories: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div>
      <p>{user.username}</p>

      <p>joined {timeAgo(user.createdAt)} ago</p>

      <p>
        stories:{" "}
        <Link href={`/user/${username}/stories`}>{user._count.stories}</Link>
      </p>

      <p>
        comments:{" "}
        <Link href={`/user/${username}/comments`}>{user._count.comments}</Link>
      </p>
    </div>
  );
}
