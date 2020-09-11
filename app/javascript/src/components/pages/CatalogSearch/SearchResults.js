import React from "react";
import styled from "styled-components";

// components
import SearchResultListing from "./SearchResultListing";

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
      {results.map((description) => (
        <SearchResultListing
          key={description.attributes.naId}
          id={description.id}
          naId={description.attributes.naId}
          title={description.attributes.title}
          hierarchy="Ut enim ad minim veniam."
          identifier={description.attributes.scopeContent}
          added={false}
          recordType={description.attributes.level}
        />
      ))}
    </Root>
  );
};

export default SearchResults;
