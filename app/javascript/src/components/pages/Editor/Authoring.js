import React, { useState, useContext, useRef } from "react";
import styled, { css } from "styled-components";
import Popover from "react-tiny-popover";

// context
import { EditorContext } from "#contexts/Editor";

// API
import { createBlock } from "#api/internal/block";

// components
import Button from "#components/shared/Button";
import PlusCircle from "#components/shared/PlusCircle";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import SummaryIcon from "#assets/icons/summary.svg";
import StarIcon from "#assets/icons/star.svg";

const Root = styled.div`
  position: relative;
  z-index: 50;
`;

const Inner = styled.div`
  @media all and ${(props) => props.theme.breakpoints.medium} {
    background-color: ${(props) => props.theme.colors.white};
    left: 50%;
    min-height: 40px;
    padding: 0 10px;
    position: absolute;
    transform: translateX(-50%);
    bottom: 20px;
    bottom: -32px;

    ${(props) =>
      props.context === "description" &&
      css`
        bottom: -42px;
      `}
  }
`;

const ButtonWrapper = styled.div`
  position: relative;

  @media ${(props) => props.theme.breakpoints.medium} {
    display: flex;
  }
`;

const AddContextPopover = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  width: 300px;
  padding: 20px;
  text-align: left;
`;

const ContextTypeButton = styled.button`
  ${buttonReset}
  font-size: 0.9rem;
  margin-top: 20px;
  padding-left: 24px;
  position: relative;
  text-align: left;

  &:first-child {
    margin-top: 0;
  }

  svg {
    fill: ${(props) => props.theme.colors.blue};
    height: 16px;
    left: 0;
    position: absolute;
    top: -2px;
    width: 16px;
  }
`;

const ContextTypeButtonHelp = styled.span`
  color: ${(props) => props.theme.colors.textLightGrey};
  display: block;
  font-size: 0.6rem;
  margin-top: 5px;
`;

const StyledButton = styled(Button)`
  align-items: center;
  border-color: ${(props) => props.theme.colors.mediumGrey};
  color: ${(props) => props.theme.colors.textLightGrey};
  display: flex;
  justify-content: space-between;
  margin: 0 0 10px;
  padding: 4px 4px 4px 20px;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin: 0 10px;
    width: auto;
  }
`;

const Authoring = ({ handleAddRecords, resourceType, resourceId, context }) => {
  const popoverEl = useRef();
  const [open, setOpen] = useState(false);
  const editorContext = useContext(EditorContext);

  const addBlock = ({ type }) => {
    createBlock({
      blockable_type: resourceType,
      blockable_id: resourceId,
      block_type: type,
    }).then((response) => {
      editorContext.actions.dispatchBlocks({
        type: "add",
        value: response.data.data,
      });
    });
  };

  const PopoverContent = () => {
    return (
      <AddContextPopover>
        <ContextTypeButton onClick={() => addBlock({ type: "summary" })}>
          <SummaryIcon />
          Add Summary
          <ContextTypeButtonHelp>
            Add a brief summary to a section.
          </ContextTypeButtonHelp>
        </ContextTypeButton>

        <ContextTypeButton
          onClick={() => addBlock({ type: "research_highlight" })}
        >
          <StarIcon />
          Add Research Highlight
          <ContextTypeButtonHelp>
            Call out key research takeaways.
          </ContextTypeButtonHelp>
        </ContextTypeButton>
      </AddContextPopover>
    );
  };

  return (
    <Root>
      <Inner context={context}>
        <Popover
          isOpen={open}
          disableReposition
          onClickOutside={() => setOpen(false)}
          content={<PopoverContent />}
          contentDestination={popoverEl.current}
          contentLocation={{ top: -30, left: -20 }}
          containerStyle={{ overflow: "visible", zIndex: "500" }}
        >
          <ButtonWrapper>
            <StyledButton scheme="outline" onClick={handleAddRecords}>
              Add Records
              <PlusCircle grey />
            </StyledButton>
            <StyledButton scheme="outline" onClick={() => setOpen(!open)}>
              Add Context
              <PlusCircle grey />
            </StyledButton>
            <div ref={popoverEl}></div>
          </ButtonWrapper>
        </Popover>
      </Inner>
    </Root>
  );
};

export default Authoring;
