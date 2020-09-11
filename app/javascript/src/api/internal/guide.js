import client from "./client";

// TODO: accept parameters for descriptions that are added at creationi
export const createGuide = () => {
  return client.post(
    "/guides",
    {} // no request body
  );
};

export const updateGuide = (id, attributes) => {
  return client.put(`/guides/${id}`, { guide: attributes });
};
