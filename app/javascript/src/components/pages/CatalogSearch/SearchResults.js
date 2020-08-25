import React from "react";
import styled from "styled-components";

// components
import SearchResultListing from "./SearchResultListing";
import AddToGuideButton from "../../shared/AddToGuideButton";

export const Root = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;
  position: relative;

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    padding: 50px;
  }
`;

const SearchResults = ({ results }) => {
  return (
    <Root>
      {results.descriptions.map((description) => (
        <SearchResultListing
          key={description.naId}
          title={description.title}
          hierarchy="Ut enim ad minim veniam."
          identifier={description.scopeContent}
          added={false}
          recordType={description.level}
        />
      ))}
    </Root>
  );
};

export default SearchResults;
