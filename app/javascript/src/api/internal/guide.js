import client from "./client";

export const createGuide = (attributes) => {
  return client.post("/guides", { guide: attributes });
};

export const updateGuide = (id, attributes) => {
  return client.put(`/guides/${id}`, { guide: attributes });
};

export const deleteGuide = (id) => {
  return client.delete(`/guides/${id}`);
};

export const addDescriptions = (id, descriptionIds) => {
  return client.put(`/guides/${id}/add-descriptions`, {
    description_ids: descriptionIds,
  });
};
