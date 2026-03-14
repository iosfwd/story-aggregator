import { Prisma } from "@/app/generated/prisma/client";
import Comment from "@/components/comment";

type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: { author: true };
}>;

type CommentItem = CommentWithAuthor & {
  children: CommentItem[];
};

type Props = {
  comments: CommentItem[];
};

export default function Comments({ comments }: Props) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}
