import client from "./client";

export const authenticateUser = (username, password) => {
  const encodedCredentials = btoa(`${username}:${password}`);

  return client.post(
    "/authenticate",
    {}, // no request body
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    }
  );
};

export const currentUser = () => {
  return client.get("/current-user");
};

export const logout = () => {
  return client.delete("/logout");
};
