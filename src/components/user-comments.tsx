import { Prisma } from "@/app/generated/prisma/client";
import UserComment from "@/components/user-comment";

type CommentWithStory = Prisma.CommentGetPayload<{
  include: {
    story: { select: { id: true; title: true } };
    author: { select: { username: true } };
  };
}>;

type Props = {
  comments: CommentWithStory[];
};

function buildCommentTree(comments: CommentWithStory[]) {
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

export default function UserComments({ comments }: Props) {
  const commentTree = buildCommentTree(comments);

  return (
    <div>
      {commentTree.map((comment) => (
        <UserComment key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}
