import React from "react";
import styled from "styled-components";

// components
import SearchTabs from "#components/shared/SearchTabs";
import Pagination from "./Pagination";

export const Root = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
`;

export const Wrap = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 0;
  }
`;

const ResultsNavigation = ({ data }) => {
  return (
    <Root>
      <Wrap>
        <SearchTabs />
        <Pagination data={data} />
      </Wrap>
    </Root>
  );
};

export default ResultsNavigation;
