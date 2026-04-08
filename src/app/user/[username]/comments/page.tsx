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

  const commentsPromise = prisma.comment.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    skip: offset,
    include: {
      author: { select: { username: true } },
      parent: {
        include: {
          story: true,
          author: { select: { username: true } },
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

  const commentCountPromise = prisma.comment.count({
    where: { authorId: user.id },
  });

  const [comments, commentCount] = await Promise.all([
    commentsPromise,
    commentCountPromise,
  ]);

  const pageCount = Math.ceil(commentCount / 30);

  const flattened = comments.flatMap((comment) =>
    comment.parent ? [comment, comment.parent] : comment,
  );

  const ids = new Set<number>();
  const deduplicated = flattened.filter((comment) => {
    if (ids.has(comment.id)) {
      return false;
    }
    ids.add(comment.id);
    return true;
  });

  return (
    <div>
      <h1>
        comments submitted by <Link href={`/user/${username}`}>{username}</Link>
      </h1>

      <UserComments comments={deduplicated} />

      <PaginationNavigation currentPage={currentPage} pageCount={pageCount} />
    </div>
  );
}
