import React from "react";
import styled from "styled-components";

// components
import SearchResultListing from "./SearchResultListing";
import AddToGuideButton from "#components/shared/AddToGuideButton";

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
      <div
        style={{
          display: "inline-block",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        {results.length > 1 && (
          <AddToGuideButton
            menuPosition="right"
            descriptionIds={results.map((r) => r.id)}
            text="Add all to Guide"
          />
        )}
      </div>
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
