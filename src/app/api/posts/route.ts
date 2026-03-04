import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [{ score: "desc" }, { createdAt: "desc" }],
    });

    return Response.json(posts, { status: 200 });
  } catch (error) {
    console.error("GET /api/posts failed:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.title) {
      return Response.json({ error: "Title missing" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        url: body.url ?? null,
      },
    });

    return Response.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts failed:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
