import { Prisma } from "@/app/generated/prisma/client";

type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: { author: true };
}>;

type CommentItem = CommentWithAuthor & {
  children: CommentItem[];
};

type Props = {
  comment: CommentItem;
  depth: number;
};

export default function Comment({ comment, depth }: Props) {
  return (
    <div style={{ marginLeft: depth * 16 }}>
      <div>{comment.author.username}</div>
      <div>{comment.content}</div>

      {comment.children.map((child) => (
        <Comment key={child.id} comment={child} depth={depth + 1} />
      ))}
    </div>
  );
}
