import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "#contexts/User";

const AnonymousRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        context.state.user ? (
          <Redirect to={rest.redirect} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AnonymousRoute;
