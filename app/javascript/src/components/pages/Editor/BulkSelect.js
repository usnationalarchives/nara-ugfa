import React, { useContext } from "react";
import styled from "styled-components";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import * as Text from "#components/shared/Text";

// assets
import CheckIcon from "#assets/icons/check.svg";

const Root = styled.div`
  position: absolute;
  left: -25px;
  top: 20px;
`;

const Input = styled.input`
  display: none;

  + label {
    border: 1px solid ${(props) => props.theme.colors.blue};
    content: "";
    display: block;
    height: 15px;
    width: 15px;

    svg {
      display: none;
    }
  }

  &:checked + label {
    background-color: ${(props) => props.theme.colors.blue};

    svg {
      display: block;
      fill: ${(props) => props.theme.colors.white};
      height: 11px;
      width: 14px;
    }
  }
`;

const BulkSelect = ({ description }) => {
  const editorContext = useContext(EditorContext);

  const handleChange = (event) => {
    editorContext.actions.dispatchBulkItems({
      value: parseInt(event.target.value),
      type: event.target.checked ? "add" : "remove",
    });
  };

  return (
    <Root>
      <Input
        id={`bulkSelect-${description.id}`}
        type="checkbox"
        onChange={handleChange}
        defaultChecked={editorContext.state.bulkItems.includes(description.id)}
        value={description.id}
      />
      <label htmlFor={`bulkSelect-${description.id}`}>
        <Text.Screenreader>
          Select Description for Bulk Action
        </Text.Screenreader>
        <CheckIcon />
      </label>
    </Root>
  );
};

export default BulkSelect;
