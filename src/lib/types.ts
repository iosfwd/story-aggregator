import { Prisma } from "@/app/generated/prisma/client";

export type StoryWithMeta = Prisma.StoryGetPayload<{
  include: {
    author: { select: { username: true } };
    _count: { select: { comments: true } };
  };
}>;

export type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: { author: true };
}>;

export type CommentItem = CommentWithAuthor & {
  children: CommentItem[];
};

export type CommentWithStory = Prisma.CommentGetPayload<{
  include: {
    story: { select: { id: true; title: true } };
    author: { select: { username: true } };
  };
}>;

export type UserCommentItem = CommentWithStory & {
  children: UserCommentItem[];
};
