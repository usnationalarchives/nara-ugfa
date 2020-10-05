import React from "react";
import styled from "styled-components";

// components
import Block from "./Block";

const Root = styled.div``;

const Context = ({ guide, description }) => {
  const sectionDescription = guide.included.filter(
    (i) =>
      i.type === "guide_section_descriptions" &&
      i.attributes.description_id === parseInt(description.id)
  )[0];

  const blocks = guide.included.filter(
    (i) =>
      i.type === "blocks" &&
      i.attributes.blockable_type === "GuideSectionDescription" &&
      i.attributes.blockable_id === parseInt(sectionDescription.id)
  );

  return (
    <Root>
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </Root>
  );
};

export default Context;
