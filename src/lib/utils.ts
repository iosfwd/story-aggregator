export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

interface Comment {
  id: number;
  parentId: number | null;
}

type WithChildren<T> = T & {
  children: WithChildren<T>[];
};

export function buildCommentTree<Type extends Comment>(
  comments: Type[],
): WithChildren<Type>[] {
  const map = new Map<number, WithChildren<Type>>();

  for (const comment of comments) {
    map.set(comment.id, { ...comment, children: [] });
  }

  for (const comment of comments) {
    if (comment.parentId !== null) {
      map.get(comment.parentId)?.children.push(map.get(comment.id)!);
    }
  }

  const topLevelComments: WithChildren<Type>[] = [];
  for (const comment of comments) {
    if (comment.parentId === null) {
      topLevelComments.push(map.get(comment.id)!);
    }
  }

  return topLevelComments;
}
