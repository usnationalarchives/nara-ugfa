import React, { Fragment, useState, useEffect } from "react";

const SummaryBlock = ({ block, editing, setEditing, handleUpdate }) => {
  const [summary, setSummary] = useState(block.attributes.data.summary || "");

  useEffect(() => {
    setSummary(block.attributes.data.summary);
  }, [editing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdate({
      summary: summary,
    });
  };

  return (
    <Fragment>
      {editing && (
        <form onSubmit={handleSubmit}>
          <textarea
            name="summary"
            defaultValue={block.attributes.data.summary}
            rows="6"
            maxLength="280"
            onChange={(event) => setSummary(event.target.value)}
          />
          <p>{(summary || "").length} / 280</p>
          <button type="button" onClick={() => setEditing(false)}>
            cancel
          </button>
          <button type="submit">save summary</button>
        </form>
      )}
      {!editing && <p>{block.attributes.data.summary || "empty summary"}</p>}
    </Fragment>
  );
};

export default SummaryBlock;
