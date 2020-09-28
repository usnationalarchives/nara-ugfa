import React, { useState } from "react";

const GuideContext = React.createContext();

const GuideProvider = ({ children }) => {
  const [showHierarchy, setShowHierarchy] = useState(true);

  const state = {
    showHierarchy,
  };

  const actions = {
    setShowHierarchy,
  };

  return (
    <GuideContext.Provider value={{ state, actions }}>
      {children}
    </GuideContext.Provider>
  );
};

export { GuideContext, GuideProvider };
