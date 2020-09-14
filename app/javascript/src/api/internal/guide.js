import client from "./client";

export const createGuide = (attributes) => {
  return client.post("/guides", { guide: attributes });
};

export const updateGuide = (id, attributes) => {
  return client.put(`/guides/${id}`, { guide: attributes });
};

export const addDescriptions = (id, descriptionIds) => {
  return client.put(`/guides/${id}/add-descriptions`, {
    description_ids: descriptionIds,
  });
};

export const removeDescriptions = (id, sectionId, descriptionIds) => {
  console.log(descriptionIds);
  return client.put(`/guides/${id}/remove-descriptions/${sectionId}`, {
    description_ids: descriptionIds,
  });
};
