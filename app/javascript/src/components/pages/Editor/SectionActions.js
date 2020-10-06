import React, { useContext } from "react";
import styled from "styled-components";

// contexts
import { EditorContext } from "#contexts/Editor";

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
import Comment from "#assets/icons/comment.svg";
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

const SectionActions = ({
  guide,
  section,
  dispatchSections,
  first,
  last,
  setCommenting,
}) => {
  const editorContext = useContext(EditorContext);

  const removeSection = () => {
    editorContext.actions.setSaving(true);
    deleteGuideSection(guide.data.id, section.id)
      .then((response) => {
        dispatchSections({ type: "remove", value: section });
        editorContext.actions.setSaving(false);
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
      })
      .catch((error) => {
        editorContext.actions.setSaving(false);
        console.log(error);
      });
  };

  const moveUp = () => {
    editorContext.actions.setSaving(true);
    moveUpGuideSection(guide.data.id, section.id)
      .then((response) => {
        dispatchSections({ type: "moveUp", value: section });
        editorContext.actions.setSaving(false);
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
      })
      .catch((error) => {
        console.log(error);
        editorContext.actions.setSaving(false);
      });
  };

  const moveDown = () => {
    editorContext.actions.setSaving(true);
    moveDownGuideSection(guide.data.id, section.id)
      .then((response) => {
        dispatchSections({ type: "moveDown", value: section });
        editorContext.actions.setSaving(false);
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
      })
      .catch((error) => {
        console.log(error);
        editorContext.actions.setSaving(false);
      });
  };

  return (
    <Root>
      <ActionButton onClick={() => setCommenting(true)}>
        <Comment />
        <Text.Screenreader>Comment</Text.Screenreader>
      </ActionButton>
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
