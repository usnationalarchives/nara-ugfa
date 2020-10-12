import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import Popover from "react-tiny-popover";
import styled from "styled-components";

// contexts
import { EditorContext } from "#contexts/Editor";

// API
import {
  removeDescriptions,
  moveDescriptions,
} from "#api/internal/bulkDescriptions";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import TrashIcon from "#assets/icons/trash.svg";
import MoveIcon from "#assets/icons/move-to-section.svg";

const Root = styled.div`
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledButton = styled.button`
  ${buttonReset}

  color: ${(props) => props.theme.colors.white};
  font-size: 0.8rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    display: inline-block;
    height: 12px;
    margin-left: 10px;
    width: 10px;

    border: 6px solid ${(props) => props.theme.colors.white};
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
`;

const PopoverWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  bottom: 15px;
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  left: 0;
  padding: 20px;
  position: absolute;
  text-align: left;
  width: 200px;
`;

const Action = styled.button`
  ${buttonReset}

  align-items: center;
  display: flex;
  font-size: 1rem;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  svg {
    fill: ${(props) => props.theme.colors.blue};
    height: 20px;
    margin-right: 10px;
    width: 20px;
  }
`;

const BulkActions = () => {
  const editorContext = useContext(EditorContext);
  const rootEl = useRef();
  const popoverEl = useRef();
  const [open, setOpen] = useState(false);
  const [moving, setMoving] = useState(false);

  const handleRemove = () => {
    editorContext.actions.setSaving(true);

    const guideId = editorContext.state.guide.data.id;
    const descriptionIds = editorContext.state.bulkItems;

    removeDescriptions(guideId, descriptionIds).then((response) => {
      editorContext.actions.dispatchBulkItems({ type: "clear" });
      editorContext.actions.dispatchDescriptions({
        type: "bulkRemove",
        value: descriptionIds,
      });
      editorContext.actions.setSaving(false);
      editorContext.actions.setLastSaved(
        response.data.data.attributes.updatedAgo
      );
    });
  };

  const handleMove = (sectionId) => {
    editorContext.actions.setSaving(true);

    const guideId = editorContext.state.guide.data.id;
    const descriptionIds = editorContext.state.bulkItems;

    moveDescriptions(guideId, descriptionIds, sectionId).then((response) => {
      editorContext.actions.dispatchBulkItems({ type: "clear" });
      editorContext.actions.dispatchDescriptions({
        type: "bulkMove",
        value: descriptionIds,
        sectionId: sectionId,
      });
      editorContext.actions.setSaving(false);
      editorContext.actions.setLastSaved(
        response.data.data.attributes.updatedAgo
      );
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootEl.current && !rootEl.current.contains(event.target)) {
        setOpen(false);
        setMoving(false);
      }
    };

    // listen for click events on the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootEl]);

  const PopoverContent = () => {
    return (
      <PopoverWrapper>
        {!moving && (
          <Fragment>
            <Action
              onClick={() => {
                setMoving(true);
                setOpen(true);
              }}
            >
              <MoveIcon />
              Move to Section
            </Action>
            <Action onClick={handleRemove}>
              <TrashIcon />
              Remove
            </Action>
          </Fragment>
        )}

        {moving && (
          <div>
            {editorContext.state.sections.map((section) => (
              <Action key={section.id} onClick={() => handleMove(section.id)}>
                {section.attributes.title || "Untitled Section"}
              </Action>
            ))}
          </div>
        )}
      </PopoverWrapper>
    );
  };

  return (
    <Root ref={rootEl}>
      <Popover
        isOpen={open}
        position="top"
        disableReposition
        contentLocation={{ top: 0, left: 0 }}
        content={<PopoverContent />}
        contentDestination={popoverEl.current}
        containerStyle={{
          overflow: "visible",
          zIndex: "600",
        }}
      >
        <div>
          <StyledButton onClick={() => setOpen(!open)}>
            {editorContext.state.bulkItems.length} item
            {editorContext.state.bulkItems.length > 1 ? "s" : null} selected
          </StyledButton>
          <div ref={popoverEl}></div>
        </div>
      </Popover>
    </Root>
  );
};

export default BulkActions;