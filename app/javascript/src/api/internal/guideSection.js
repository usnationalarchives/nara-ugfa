import client from "./client";

export const createGuideSection = (guide_id) => {
  return client.post(
    `/guides/${guide_id}/sections`,
    {} // no request body
  );
};

export const updateGuideSection = (guide_id, section_id, attributes) => {
  return client.put(`/guides/${guide_id}/sections/${section_id}`, {
    guide_section: attributes,
  });
};

export const deleteGuideSection = (guide_id, section_id) => {
  return client.delete(`/guides/${guide_id}/sections/${section_id}`);
};

export const moveUpGuideSection = (guide_id, section_id) => {
  return client.put(`/guides/${guide_id}/sections/${section_id}/move-up`);
};

export const moveDownGuideSection = (guide_id, section_id) => {
  return client.put(`/guides/${guide_id}/sections/${section_id}/move-down`);
};
