import UserComment from "@/components/user-comment";
import type { CommentWithStory } from "@/lib/types";
import { buildCommentTree } from "@/lib/utils";

type Props = {
  comments: CommentWithStory[];
};

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
