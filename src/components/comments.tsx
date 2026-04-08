import Comment from "@/components/comment";
import type { CommentWithAuthor } from "@/lib/types";
import { buildCommentTree } from "@/lib/utils";

type Props = {
  comments: CommentWithAuthor[];
};

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
