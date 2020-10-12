import React, { useContext } from "react";
import styled from "styled-components";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import * as Text from "#components/shared/Text";

const Root = styled.div``;

const BulkSelect = ({ description, guideSectionDescription }) => {
  const editorContext = useContext(EditorContext);

  const handleChange = (event) => {
    editorContext.actions.dispatchBulkItems({
      value: parseInt(event.target.value),
      type: event.target.checked ? "add" : "remove",
    });
  };

  return (
    <Root>
      <label htmlFor={`bulkSelect-${description}`}>
        <Text.Screenreader>
          Select Description for Bulk Action
        </Text.Screenreader>
      </label>
      <input
        id={`bulkSelect-${description}`}
        type="checkbox"
        onChange={handleChange}
        defaultChecked={editorContext.state.bulkItems.includes(
          guideSectionDescription.id
        )}
        value={guideSectionDescription.id}
      />
    </Root>
  );
};

export default BulkSelect;
