import React, { useEffect, Fragment, useReducer } from "react";

// API
import { createBlock } from "#api/internal/block";

// components
import Block from "./Block";

const Context = ({ guide, description }) => {
  const sectionDescription = guide.included.filter(
    (i) =>
      i.type === "guide_section_descriptions" &&
      i.attributes.description_id === parseInt(description.id)
  )[0];

  const initialBlocks = guide.included.filter(
    (i) =>
      i.type === "blocks" &&
      i.attributes.blockable_type === "GuideSectionDescription" &&
      i.attributes.blockable_id === parseInt(sectionDescription.id)
  );

  const [blocks, dispatchBlocks] = useReducer((blocks, { type, value }) => {
    switch (type) {
      case "add":
        return [...blocks, value];
      case "remove":
        return blocks.filter((b) => b.id !== value);
      case "update":
        return blocks.map((block) => (block.id === value.id ? value : block));
      default:
        return blocks;
    }
  }, initialBlocks);

  const addBlock = ({ type }) => {
    createBlock({
      blockable_type: "GuideSectionDescription",
      blockable_id: sectionDescription.id,
      block_type: type,
    }).then((response) => {
      dispatchBlocks({
        type: "add",
        value: response.data.data,
      });
    });
  };

  return (
    <Fragment>
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          dispatchBlocks={dispatchBlocks}
          sectionDescriptionId={sectionDescription.id}
          initialBlock={initialBlocks
            .map((ib) => parseInt(ib.id))
            .includes(parseInt(block.id))}
        />
      ))}
      <br />
      <button onClick={() => addBlock({ type: "summary" })}>Add Summary</button>
      <button onClick={() => addBlock({ type: "research_highlight" })}>
        Add Research Highlight
      </button>
    </Fragment>
  );
};

export default Context;
