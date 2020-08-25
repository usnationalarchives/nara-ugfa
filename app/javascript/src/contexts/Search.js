import React, { useState } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";

const SearchContext = React.createContext();

const SearchProvider = ({ children }) => {
  const location = useLocation();

  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [query, setQuery] = useState(params.q || null);
  const [page, setPage] = useState(params.page || 1);
  const [rows, setRows] = useState(params.rows || 20);

  const state = {
    query,
    page,
    rows,
  };

  const actions = {
    setQuery,
    setPage,
    setRows,
  };

  return (
    <SearchContext.Provider value={{ state, actions }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
