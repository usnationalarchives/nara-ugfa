import React, { useState } from "react";
import * as User from "#api/internal/user";
import Cookies from "js-cookie";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const userCookie = Cookies.get("user");
  const userJSON = decodeURIComponent(userCookie).replace("+", " ");
  const [user, setUser] = useState(userCookie ? JSON.parse(userJSON) : null);

  const authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
      User.authenticateUser(username, password)
        .then((response) => {
          setUser(response.data.user);
          resolve("authenticated");
        })
        .catch(() => {
          console.log("fail");
          logout();
          reject("session_authError");
        });
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      User.logout()
        .then((response) => {
          setUser(null);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const actions = {
    authenticate,
    logout,
  };

  const state = {
    user,
  };

  return (
    <UserContext.Provider value={{ state, actions }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
