import client from "./client";

export const createGuideSection = (guideId) => {
  return client.post(
    `/guides/${guideId}/sections`,
    {} // no request body
  );
};

export const updateGuideSection = (guideId, sectionId, attributes) => {
  return client.put(`/guides/${guideId}/sections/${sectionId}`, {
    guide_section: attributes,
  });
};

export const deleteGuideSection = (guideId, sectionId) => {
  return client.delete(`/guides/${guideId}/sections/${sectionId}`);
};

export const moveUpGuideSection = (guideId, sectionId) => {
  return client.put(`/guides/${guideId}/sections/${sectionId}/move-up`);
};

export const moveDownGuideSection = (guideId, sectionId) => {
  return client.put(`/guides/${guideId}/sections/${sectionId}/move-down`);
};

export const addDescriptionsToSection = (
  guideId,
  sectionId,
  descriptionIds
) => {
  return client.put(`/guides/${guideId}/add-descriptions/${sectionId}`, {
    description_ids: descriptionIds,
  });
};

export const removeDescriptions = (guideId, sectionId, descriptionIds) => {
  return client.put(`/guides/${guideId}/remove-descriptions/${sectionId}`, {
    description_ids: descriptionIds,
  });
};
