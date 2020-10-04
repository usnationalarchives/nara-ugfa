import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

// components
import Button from "#components/shared/Button";
import { Controls, Actions, Cancel, Counter, Textarea } from "./Block";

const Display = styled.p`
  padding: 15px 0;
`;

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
          <Textarea
            name="summary"
            defaultValue={block.attributes.data.summary}
            rows="6"
            maxLength="280"
            onChange={(event) => setSummary(event.target.value)}
          />

          <Controls>
            <Counter>{(summary || "").length} / 280 Characters</Counter>

            <Actions>
              <Cancel type="button" onClick={() => setEditing(false)}>
                cancel
              </Cancel>
              <Button type="submit" scheme="green">
                save summary
              </Button>
            </Actions>
          </Controls>
        </form>
      )}
      {!editing && (
        <Display>{block.attributes.data.summary || "empty summary"}</Display>
      )}
    </Fragment>
  );
};

export default SummaryBlock;
