import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const id = parseInt(slug);

    if (!Number.isInteger(id)) {
      return Response.json({ error: "Invalid post id" }, { status: 400 });
    }

    const body = await request.json();

    if (!body?.value) {
      return Response.json({ error: "Value missing" }, { status: 400 });
    }

    const value = body.value;

    if (value !== 1 && value !== -1) {
      return Response.json({ error: "Invalid value" }, { status: 400 });
    }

    const updatePost = await prisma.post.update({
      where: { id: id },
      data: { score: { increment: value } },
    });

    if (!updatePost) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(updatePost, { status: 200 });
  } catch (error) {
    console.error("POST /api/posts/[id]/upvote failed:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
