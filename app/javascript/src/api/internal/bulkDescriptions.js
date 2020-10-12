import client from "./client";

export const removeDescriptions = (guideId, descriptionIds) => {
  return client.put(`/bulk/${guideId}/remove-descriptions`, {
    description_ids: descriptionIds,
  });
};

export const moveDescriptions = (guideId, descriptionIds, targetSectionId) => {
  return client.put(`/bulk/${guideId}/move-descriptions`, {
    description_ids: descriptionIds,
    target_section_id: targetSectionId,
  });
};
