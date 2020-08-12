import React from "react";
import styled from 'styled-components';

// components
import ResultsNavigation from './ResultsNavigation';
import ResearchGuideResults from './ResearchGuideResults';
import SearchResults from './SearchResults';

export const Root = styled.div`
  border-left: 1px solid ${props => props.theme.colors.mediumGrey};
  overflow: hidden;
  width: 90%;
`;

const ResultsColumn = () => {
  return (
    <Root>
      <ResultsNavigation/>
      <ResearchGuideResults />
      <SearchResults/>
    </Root>
  );
};

export default ResultsColumn;
