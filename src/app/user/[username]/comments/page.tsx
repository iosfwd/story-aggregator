import { prisma } from "@/lib/prisma";
import UserComments from "@/components/user-comments";
import { notFound } from "next/navigation";
import Link from "next/link";
import PaginationNavigation from "@/components/pagination-navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { username } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1"));
  const offset = (currentPage - 1) * 30;

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
    skip: offset,
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

  const commentCount = await prisma.comment.count({
    where: { authorId: user.id },
  });

  const pageCount = Math.ceil(commentCount / 30);

  const parentIds = new Set(
    comments.map((comment) => comment.parentId).filter(Boolean),
  );

  const deduplicated = comments.filter((comment) => !parentIds.has(comment.id));

  const flattened = deduplicated.flatMap((comment) =>
    comment.parent ? [comment, comment.parent] : comment,
  );

  return (
    <div>
      <h1>
        comments submitted by <Link href={`/user/${username}`}>{username}</Link>
      </h1>

      <UserComments comments={flattened} />

      <PaginationNavigation currentPage={currentPage} pageCount={pageCount} />
    </div>
  );
}
