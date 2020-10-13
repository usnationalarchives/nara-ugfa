import client from "./client";

export const createBookmark = (attributes) => {
  return client.post(`/bookmarks`, {
    bookmark: attributes,
  });
};

export const deleteBookmark = (guideId) => {
  return client.delete(`/bookmarks/${guideId}`);
};
