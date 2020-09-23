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
