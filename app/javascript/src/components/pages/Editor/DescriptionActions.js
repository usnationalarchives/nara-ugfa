import React, { useContext } from "react";
import styled from "styled-components";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import * as Text from "#components/shared/Text";
import MoveTo from "./MoveTo";

// API
import { removeDescriptions } from "#api/internal/guideSection";
import {
  moveUpDescription,
  moveDownDescription,
} from "#api/internal/guideSectionDescription";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import Comment from "#assets/icons/comment.svg";
import Trash from "#assets/icons/trash.svg";
import ArrowUp from "#assets/icons/arrow-up.svg";
import ArrowDown from "#assets/icons/arrow-down.svg";

const Root = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 100;

  > button,
  > span {
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

const DescriptionActions = ({
  guide,
  section,
  sections,
  description,
  dispatchDescriptions,
  first,
  last,
  setCommenting,
}) => {
  const editorContext = useContext(EditorContext);

  const handleRemove = () => {
    editorContext.actions.setSaving(true);
    removeDescriptions(guide.data.id, section.id, [description.id])
      .then((response) => {
        dispatchDescriptions({
          type: "remove",
          sectionId: section.id,
          value: description,
        });
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
    moveUpDescription(guide.data.id, section.id, description.id)
      .then((response) => {
        dispatchDescriptions({
          type: "moveUp",
          sectionId: section.id,
          value: description,
        });
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
        editorContext.actions.setSaving(false);
      })
      .catch((error) => {
        console.log(error);
        editorContext.actions.setSaving(false);
      });
  };

  const moveDown = () => {
    editorContext.actions.setSaving(true);
    moveDownDescription(guide.data.id, section.id, description.id)
      .then((response) => {
        dispatchDescriptions({
          type: "moveDown",
          sectionId: section.id,
          value: description,
        });
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
        editorContext.actions.setSaving(false);
      })
      .catch((error) => {
        console.log(error);
        editorContext.actions.setSaving(false);
      });
  };

  const comment = (event) => {
    event.stopPropagation();
    setCommenting(true);
  };

  return (
    <Root>
      <ActionButton onClick={comment}>
        <Comment />
        <Text.Screenreader>Add Comment</Text.Screenreader>
      </ActionButton>

      <MoveTo
        guide={guide}
        section={section}
        sections={sections}
        description={description}
        dispatchDescriptions={dispatchDescriptions}
      />

      <ActionButton disabled={first} onClick={moveUp}>
        <ArrowUp />
        <Text.Screenreader>Move Up</Text.Screenreader>
      </ActionButton>

      <ActionButton disabled={last} onClick={moveDown}>
        <ArrowDown />
        <Text.Screenreader>Move Down</Text.Screenreader>
      </ActionButton>

      <ActionButton onClick={handleRemove}>
        <Trash />
        <Text.Screenreader>Remove</Text.Screenreader>
      </ActionButton>
    </Root>
  );
};

export default DescriptionActions;
