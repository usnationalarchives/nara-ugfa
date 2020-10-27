import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import Popover from "react-tiny-popover";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";
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
import Ellipsis from "#assets/icons/ellipsis.svg";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > * {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: block;
    > button,
    > span {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }
`;

const ActionButton = styled.button`
  ${buttonReset}

  svg {
    display: inline-block;
    fill: ${(props) => props.theme.colors.blue};
    height: 17px;
    margin-right: 10px;
    width: 17px;

    @media all and ${(props) => props.theme.breakpoints.medium} {
      margin-right: 0;
    }
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
        <Comment aria-hidden="true" focusable="false" />
        <Layout.InlineDesktop>
          <Text.Screenreader>Add Comment</Text.Screenreader>
        </Layout.InlineDesktop>
        <Layout.Mobile inline>Add Comment</Layout.Mobile>
      </ActionButton>

      <MoveTo
        guide={guide}
        section={section}
        sections={sections}
        description={description}
        dispatchDescriptions={dispatchDescriptions}
      />

      <ActionButton disabled={first} onClick={moveUp}>
        <ArrowUp aria-hidden="true" focusable="false" />
        <Layout.InlineDesktop>
          <Text.Screenreader>Move Up</Text.Screenreader>
        </Layout.InlineDesktop>
        <Layout.Mobile inline>Move Up</Layout.Mobile>
      </ActionButton>

      <ActionButton disabled={last} onClick={moveDown}>
        <ArrowDown aria-hidden="true" focusable="false" />
        <Layout.InlineDesktop>
          <Text.Screenreader>Move Down</Text.Screenreader>
        </Layout.InlineDesktop>
        <Layout.Mobile inline>Move Down</Layout.Mobile>
      </ActionButton>

      <ActionButton onClick={handleRemove}>
        <Trash aria-hidden="true" focusable="false" />
        <Layout.InlineDesktop>
          <Text.Screenreader>Remove</Text.Screenreader>
        </Layout.InlineDesktop>
        <Layout.Mobile inline>Remove</Layout.Mobile>
      </ActionButton>
    </Root>
  );
};

/* Desktop-specific components */

const DesktopRoot = styled.div`
  display: none;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 100;
  }
`;

export const DesktopDescriptionActions = ({ ...props }) => {
  return (
    <DesktopRoot>
      <DescriptionActions {...props} />
    </DesktopRoot>
  );
};

/* Mobile-specific components */

const MobileRoot = styled.div`
  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;
  }
`;

const PopoverWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  width: 200px;
  padding: 20px;
  text-align: left;
`;

const IconWrapper = styled.span`
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  border-radius: 100%;
  height: 40px;
  width: 40px;
  padding: 10px;
  margin-left: 10px;
`;

const MobileActionsButton = styled.button`
  ${buttonReset}

  color: ${(props) => props.theme.colors.blue};
  font-size: 0.8rem;
  text-transform: uppercase;
  vertical-align: middle;

  svg {
    fill: ${(props) => props.theme.colors.blue};
    position: relative;
    top: -3px;
  }
`;

export const MobileDescriptionActions = ({ ...props }) => {
  const popoverEl = useRef();
  const [open, setOpen] = useState(false);

  const PopoverContent = () => {
    return (
      <PopoverWrapper role="dialog" aria-live="polite">
        <DescriptionActions {...props} />
      </PopoverWrapper>
    );
  };

  return (
    <MobileRoot>
      <Popover
        isOpen={open}
        position="top"
        disableReposition
        onClickOutside={() => setOpen(false)}
        content={<PopoverContent />}
        contentDestination={popoverEl.current}
        contentLocation={{ top: -185, left: -90 }}
        containerStyle={{ overflow: "visible", zIndex: "100" }}
      >
        <div style={{ position: "relative" }}>
          <MobileActionsButton onClick={() => setOpen(!open)}>
            Actions
            <IconWrapper>
              <Ellipsis />
            </IconWrapper>
          </MobileActionsButton>
          <div ref={popoverEl}></div>
        </div>
      </Popover>
    </MobileRoot>
  );
};
