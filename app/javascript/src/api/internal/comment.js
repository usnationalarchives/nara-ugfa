import client from "./client";

export const createComment = (attributes) => {
  return client.post(`/comments`, {
    comment: attributes,
  });
};

export const resolveComments = (commentIds) => {
  return client.put(`/comments/resolve`, {
    comment_ids: commentIds,
  });
};
