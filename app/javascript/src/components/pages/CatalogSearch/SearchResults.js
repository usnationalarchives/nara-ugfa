import React from "react";
import styled from "styled-components";

// components
import { Screenreader } from "#components/shared/Text";
import Description from "./Description";
import AddToGuideButton from "#components/shared/AddToGuideButton";

export const Root = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;
  position: relative;

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    padding: 50px;
  }
`;

const SearchResults = ({ results, response }) => {
  return (
    <Root>
      <Screenreader aria-live="assertive">Results Loaded</Screenreader>
      <div
        style={{
          display: "inline-block",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        {results.length > 1 && (
          <AddToGuideButton
            context="addAll"
            menuPosition="right"
            descriptionIds={results.map((r) => r.id)}
            text="Add all to Guide"
          />
        )}
      </div>
      {results.map((description) => (
        <Description
          key={description.id}
          description={description}
          response={response}
        />
      ))}
    </Root>
  );
};

export default SearchResults;
