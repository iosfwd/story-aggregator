import { prisma } from "@/lib/prisma";
import Stories from "@/components/stories";
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

  const stories = await prisma.story.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    skip: offset,
    include: {
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const commentCount = await prisma.story.count({
    where: { authorId: user.id },
  });

  const pageCount = Math.ceil(commentCount / 30);

  return (
    <div>
      <h1>
        stories submitted by <Link href={`/user/${username}`}>{username}</Link>
      </h1>

      <Stories stories={stories} />

      <PaginationNavigation currentPage={currentPage} pageCount={pageCount} />
    </div>
  );
}
