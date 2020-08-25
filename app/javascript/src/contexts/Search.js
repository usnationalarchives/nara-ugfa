import React, { useState } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";

const SearchContext = React.createContext();

const SearchProvider = ({ children }) => {
  const location = useLocation();
  console.log(location);
  const [query, setQuery] = useState(
    qs.parse(location.search, { ignoreQueryPrefix: true }).q || null
  );

  const state = {
    query,
  };

  const actions = {
    setQuery,
  };

  return (
    <SearchContext.Provider value={{ state, actions }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
