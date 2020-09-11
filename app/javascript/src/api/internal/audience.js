import client from "./client";

export const listAudiences = () => {
  return client.get("/audiences");
};
