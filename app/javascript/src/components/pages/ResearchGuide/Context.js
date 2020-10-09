import React from "react";
import styled from "styled-components";

// components
import Block from "./Block";

const Root = styled.div``;

const Context = ({ guide, blockableType, blockableId, context }) => {
  const blocks = guide.included.filter(
    (i) =>
      i.type === "blocks" &&
      i.attributes.blockable_type === blockableType &&
      parseInt(i.attributes.blockable_id) === parseInt(blockableId)
  );

  return (
    <Root>
      {blocks.map((block) => (
        <Block key={block.id} block={block} context={context} />
      ))}
    </Root>
  );
};

export default Context;
