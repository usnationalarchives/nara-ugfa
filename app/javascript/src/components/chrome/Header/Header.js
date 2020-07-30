import React, { useContext } from "react";
import { Link } from "react-router-dom";

// contexts
import { UserContext } from "#contexts/User";

const Header = () => {
  const context = useContext(UserContext);

  const logout = () => {
    window.location = "/";
    context.actions.logout();
  };

  return (
    <div>
      <p>Header</p>
      {context.state.user && <button onClick={logout}>Log Out</button>}
      {!context.state.user && <Link to="/login">Login</Link>}
    </div>
  );
};

export default Header;
