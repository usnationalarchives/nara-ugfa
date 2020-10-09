import React from "react";
import styled, { css } from "styled-components";

import SummaryBlock from "./SummaryBlock";
import ResearchHighlightBlock from "./ResearchHighlightBlock";

const Root = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding: 40px 25px;

  &:last-child {
    ${(props) =>
      props.context !== "section" &&
      css`
        padding-bottom: 10px;
      `}
  }

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin: 0 -25px;
  }
`;

const Block = ({ block, context }) => {
  return (
    <Root context={context}>
      {block.attributes.block_type === "summary" && (
        <SummaryBlock block={block} />
      )}

      {block.attributes.block_type === "research_highlight" && (
        <ResearchHighlightBlock block={block} />
      )}
    </Root>
  );
};

export default Block;
