import React from "react";
import styled from "styled-components";

// components
import * as Text from "#components/shared/Text";

// API
import {
  deleteGuideSection,
  moveUpGuideSection,
  moveDownGuideSection,
} from "#api/internal/guideSection";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import Trash from "#assets/icons/trash.svg";
import ArrowUp from "#assets/icons/arrow-up.svg";
import ArrowDown from "#assets/icons/arrow-down.svg";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue};
  padding: 8px;
  text-align: right;
`;

const ActionButton = styled.button`
  ${buttonReset}
  margin-left: 10px;

  svg {
    fill: ${(props) => props.theme.colors.blue};
    height: 17px;
    width: 17px;
  }
`;

const SectionActions = ({ guide, section, dispatchSections, first, last }) => {
  const removeSection = () => {
    deleteGuideSection(guide.data.id, section.id)
      .then((response) => {
        dispatchSections({ type: "remove", value: section });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const moveUp = () => {
    moveUpGuideSection(guide.data.id, section.id)
      .then((response) => {
        dispatchSections({ type: "moveUp", value: section });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const moveDown = () => {
    moveDownGuideSection(guide.data.id, section.id)
      .then((response) => {
        dispatchSections({ type: "moveDown", value: section });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Root>
      <ActionButton disabled={first} onClick={moveUp}>
        <ArrowUp />
        <Text.Screenreader>Move Up</Text.Screenreader>
      </ActionButton>
      <ActionButton disabled={last} onClick={moveDown}>
        <ArrowDown />
        <Text.Screenreader>Move Down</Text.Screenreader>
      </ActionButton>
      <ActionButton onClick={removeSection}>
        <Trash />
        <Text.Screenreader>Delete</Text.Screenreader>
      </ActionButton>
    </Root>
  );
};

export default SectionActions;
