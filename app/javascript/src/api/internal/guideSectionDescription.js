import client from "./client";

export const moveUpDescription = (guideId, sectionId, descriptionId) => {
  return client.put(
    `/guides/${guideId}/sections/${sectionId}/descriptions/${descriptionId}/move-up`,
    {}
  );
};

export const moveDownDescription = (guideId, sectionId, descriptionId) => {
  return client.put(
    `/guides/${guideId}/sections/${sectionId}/descriptions/${descriptionId}/move-down`,
    {}
  );
};

export const moveDescription = (
  guideId,
  sectionId,
  descriptionId,
  targetSectionId
) => {
  return client.put(
    `/guides/${guideId}/sections/${sectionId}/descriptions/${descriptionId}/move`,
    { target_section_id: targetSectionId }
  );
};
