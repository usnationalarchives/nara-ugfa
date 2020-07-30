import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "#contexts/User";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        context.state.user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
