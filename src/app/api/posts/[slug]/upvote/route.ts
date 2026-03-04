import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const id = parseInt(slug)

    const updatePost = await prisma.post.update({
      where: { id: id },
      data: { score: { increment: 1 } },
    });

    return Response.json(updatePost, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts/[id]/vote failed:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
