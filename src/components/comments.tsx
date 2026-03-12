import Comment from "@/components/comment";

export default function Comments({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
}
