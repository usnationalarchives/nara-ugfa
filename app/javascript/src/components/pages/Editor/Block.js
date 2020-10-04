import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

// components
import SummaryBlock from "./SummaryBlock";
import ResearchHighlightBlock from "./ResearchHighlightBlock";
import BlockActions from "./BlockActions";

// API
import { updateBlock, deleteBlock } from "#api/internal/block";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_static, fl_attention } from "#styles/frontline";

const Root = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding: 40px 25px;
`;

const Inner = styled.div`
  border: 1px solid transparent;
  padding: 0 25px;
  position: relative;
  transition: border-color 200ms ease-in-out;

  ${(props) =>
    !props.editing &&
    css`
      &:hover {
        border-color: ${(props) => props.theme.colors.blue};
      }
    `}
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Actions = styled.div``;

export const Counter = styled.p`
  font-size: 0.8em;
  margin-bottom: 10px;
  text-transform: uppercase;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin: 0;
  }
`;

export const Cancel = styled.button`
  ${buttonReset}
  font-size: 0.8em;
  margin-right: 20px;
  text-transform: uppercase;

  ${fl_static(css`
    color: ${(props) => props.theme.colors.darkrGrey};
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

export const Textarea = styled.textarea`
  color: ${(props) => props.textColor || "#000000"};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.textLightGrey};
  border-color: ${(props) =>
    props.textColor || props.theme.colors.textLightGrey};
  padding: 12px 20px;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
`;

const Block = ({ block, initialBlock, dispatchBlocks, blockableId }) => {
  const [editing, setEditing] = useState(!initialBlock);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!editing) {
      setHovering(false);
    }
  }, [editing]);

  const handleDelete = () => {
    deleteBlock(block.id).then(() => {
      dispatchBlocks({
        type: "remove",
        value: block.id,
      });
    });
  };

  const handleUpdate = (data = {}) => {
    updateBlock(block.id, {
      blockable_type: "GuideSectionDescription",
      blockable_id: blockableId,
      data: data,
    }).then((response) => {
      dispatchBlocks({
        type: "update",
        value: response.data.data,
      });
      setEditing(false);
    });
  };

  return (
    <Root>
      <Inner
        editing={editing}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {block.attributes.block_type === "summary" && (
          <SummaryBlock
            block={block}
            editing={editing}
            setEditing={setEditing}
            handleUpdate={handleUpdate}
          />
        )}

        {block.attributes.block_type === "research_highlight" && (
          <ResearchHighlightBlock
            block={block}
            editing={editing}
            setEditing={setEditing}
            handleUpdate={handleUpdate}
          />
        )}

        {!editing && hovering && (
          <BlockActions handleDelete={handleDelete} setEditing={setEditing} />
        )}
      </Inner>
    </Root>
  );
};

export default Block;