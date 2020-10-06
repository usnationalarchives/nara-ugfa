import client from "./client";

export const createComment = (attributes) => {
  return client.post(`/comments`, {
    comment: attributes,
  });
};

export const resolveComments = (commentIds, commentableId, commentableType) => {
  return client.put(`/comments/resolve`, {
    commentable_id: commentableId,
    commentable_type: commentableType,
    comment_ids: commentIds,
  });
};
