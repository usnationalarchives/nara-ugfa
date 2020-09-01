import React from "react";
import styled from "styled-components";

// components
import UtilityBar from "./UtilityBar";
import FilterColumn from "../../shared/FilterColumn";
import ResultsColumn from "./ResultsColumn";
import NavBar from "#components/shared/NavBar";

export const Root = styled.div``;

export const ColumnWrap = styled.div`
  display: flex;
`;

const CatalogSearch = () => {
  return (
    <Root>
      <NavBar />
      <UtilityBar />
      <ColumnWrap>
        <FilterColumn />
        <ResultsColumn />
      </ColumnWrap>
    </Root>
  );
};

export default CatalogSearch;
