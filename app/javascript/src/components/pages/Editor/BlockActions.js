import React from "react";
import styled from "styled-components";

// components
import * as Text from "#components/shared/Text";

// assets
import Trash from "#assets/icons/trash.svg";
import Edit from "#assets/icons/edit.svg";

// styles
import { buttonReset } from "#styles/mixins";

const Root = styled.div`
  position: absolute;
  right: 0;
  top: -25px;

  > button {
    margin-left: 10px;
  }
`;

const ActionButton = styled.button`
  ${buttonReset}

  svg {
    fill: ${(props) => props.theme.colors.blue};
    height: 17px;
    width: 17px;
  }
`;

const BlockActions = ({ setEditing, handleDelete }) => {
  return (
    <Root>
      <ActionButton type="button" onClick={() => setEditing(true)}>
        <Edit />
        <Text.Screenreader>Edit</Text.Screenreader>
      </ActionButton>
      <ActionButton type="button" onClick={handleDelete}>
        <Trash />
        <Text.Screenreader>Remove</Text.Screenreader>
      </ActionButton>
    </Root>
  );
};

export default BlockActions;
