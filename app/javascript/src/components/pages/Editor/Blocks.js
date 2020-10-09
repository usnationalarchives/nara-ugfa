import React, { useContext } from "react";
import styled from "styled-components";

// context
import { EditorContext } from "#contexts/Editor";

// components
import Block from "./Block";

const Root = styled.div``;

const Blocks = ({ blockableType, blockableId }) => {
  const editorContext = useContext(EditorContext);

  const blocks = editorContext.state.blocks.filter(
    (b) =>
      b.attributes.blockable_type === blockableType &&
      b.attributes.blockable_id === parseInt(blockableId)
  );

  return (
    <Root>
      {blocks.map((block) => (
        <Block
          key={block.id}
          guide={editorContext.state.guide}
          block={block}
          dispatchBlocks={editorContext.actions.dispatchBlocks}
          blockableId={blockableId}
          blockableType={blockableType}
          setInitialBlocks={editorContext.actions.setInitialBlocks}
          initialBlocks={editorContext.state.initialBlocks}
        />
      ))}
    </Root>
  );
};

export default Blocks;
