import React, { Fragment, useState } from "react";

// components
import SummaryBlock from "./SummaryBlock";
import ResearchHighlightBlock from "./ResearchHighlightBlock";

// API
import { updateBlock, deleteBlock } from "#api/internal/block";

const Block = ({
  block,
  initialBlock,
  dispatchBlocks,
  sectionDescriptionId,
}) => {
  const [editing, setEditing] = useState(!initialBlock);

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
      blockable_id: sectionDescriptionId,
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
    <Fragment>
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

      <button type="button" onClick={() => setEditing(true)}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </Fragment>
  );
};

export default Block;
