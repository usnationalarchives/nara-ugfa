import React, { Fragment, useState, useEffect } from "react";

// components
import BackgroundColor from "#components/pages/Editor/BackgroundColor";

const ResearchHighlightBlock = ({
  block,
  editing,
  setEditing,
  handleUpdate,
}) => {
  const [content, setContent] = useState(block.attributes.data.content || "");
  const [backgroundColor, setBackgroundColor] = useState(
    block.attributes.data.background_color || ""
  );

  useEffect(() => {
    setContent(block.attributes.data.content);
  }, [editing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdate({
      content: content,
    });
  };

  return (
    <Fragment>
      {editing && (
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            defaultValue={block.attributes.data.content}
            rows="6"
            maxLength="280"
            onChange={(event) => setContent(event.target.value)}
          />
          <p>{(content || "").length} / 280</p>

          <BackgroundColor
            backgroundColorValue={backgroundColor}
            textColor="#000000"
            handleChange={(event) => setBackgroundColor(event.target.value)}
          />
          <p>{backgroundColor}</p>

          <button type="button" onClick={() => setEditing(false)}>
            cancel
          </button>
          <button type="submit">save research highlight</button>
        </form>
      )}

      {!editing && (
        <p>{block.attributes.data.content || "empty research highlight"}</p>
      )}
    </Fragment>
  );
};

export default ResearchHighlightBlock;
