import client from "./client";

export const createGuide = (attributes) => {
  return client.post("/guides", { guide: attributes });
};

export const updateGuide = (id, attributes) => {
  return client.put(`/guides/${id}`, { guide: attributes });
};
