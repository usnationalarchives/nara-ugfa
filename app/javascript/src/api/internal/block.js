import client from "./client";

export const createBlock = (attributes) => {
  return client.post(`/blocks`, {
    block: attributes,
  });
};

export const updateBlock = (blockId, attributes) => {
  return client.put(`/blocks/${blockId}`, {
    block: attributes,
  });
};

export const deleteBlock = (blockId) => {
  return client.delete(`/blocks/${blockId}`);
};
