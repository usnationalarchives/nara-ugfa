import React from "react";
import styled from 'styled-components';

// components
import UtilityBar from './UtilityBar';
import FilterColumn from './FilterColumn';
import ResultsColumn from './ResultsColumn';

export const Root = styled.div`
`;

export const ColumnWrap = styled.div`
  display: flex;
`;

const CatalogSearch = () => {
  return (
    <Root>
      <UtilityBar/>
      <ColumnWrap>
        <FilterColumn />
        <ResultsColumn/>
      </ColumnWrap>
    </Root>
  );
};

export default CatalogSearch;
