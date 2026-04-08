import { Prisma } from "@/app/generated/prisma/client";
import Comment from "@/components/comment";

type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: { author: { select: { username: true } } };
}>;

type Props = {
  comments: CommentWithAuthor[];
};

function buildCommentTree(comments: CommentWithAuthor[]) {
  const map = new Map();
  const topLevelComments = [];

  for (const comment of comments) {
    map.set(comment.id, { ...comment, children: [] });
  }

  for (const comment of comments) {
    if (comment.parentId === null) {
      topLevelComments.push(map.get(comment.id));
    } else {
      map.get(comment.parentId)?.children.push(map.get(comment.id));
    }
  }

  return topLevelComments;
}

export default function Comments({ comments }: Props) {
  const commentTree = buildCommentTree(comments);

  return (
    <div>
      {commentTree.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}
