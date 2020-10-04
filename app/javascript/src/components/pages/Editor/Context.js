import React, { Fragment, useRef, useState, useReducer } from "react";
import styled from "styled-components";
import Popover from "react-tiny-popover";

// API
import { createBlock } from "#api/internal/block";

// components
import Button from "#components/shared/Button";
import Block from "./Block";
import PlusCircle from "#components/shared/PlusCircle";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import SummaryIcon from "#assets/icons/summary.svg";
import StarIcon from "#assets/icons/star.svg";

const Root = styled.div``;

const AddContextRoot = styled.div`
  margin: 20px 0;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    padding: 0 50px;

    &:before,
    &:after {
      background-color: ${(props) => props.theme.colors.mediumGrey};
      content: "";
      display: inline-block;
      height: 1px;
      width: calc(50% - 100px);
    }
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

const Context = ({ guide, description }) => {
  const popoverEl = useRef();
  const sectionDescription = guide.included.filter(
    (i) =>
      i.type === "guide_section_descriptions" &&
      i.attributes.description_id === parseInt(description.id)
  )[0];

  const initialBlocks = guide.included.filter(
    (i) =>
      i.type === "blocks" &&
      i.attributes.blockable_type === "GuideSectionDescription" &&
      i.attributes.blockable_id === parseInt(sectionDescription.id)
  );

  const [blocks, dispatchBlocks] = useReducer((blocks, { type, value }) => {
    switch (type) {
      case "add":
        return [...blocks, value];
      case "remove":
        return blocks.filter((b) => b.id !== value);
      case "update":
        return blocks.map((block) => (block.id === value.id ? value : block));
      default:
        return blocks;
    }
  }, initialBlocks);

  const addBlock = ({ type }) => {
    createBlock({
      blockable_type: "GuideSectionDescription",
      blockable_id: sectionDescription.id,
      block_type: type,
    }).then((response) => {
      dispatchBlocks({
        type: "add",
        value: response.data.data,
      });
    });
  };

  const AddContext = () => {
    const [open, setOpen] = useState(false);

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
      <AddContextRoot>
        <Popover
          isOpen={open}
          disableReposition
          onClickOutside={() => setOpen(false)}
          content={<PopoverContent />}
          contentDestination={popoverEl.current}
          contentLocation={{ top: -30, left: -20 }}
          containerStyle={{ overflow: "visible", zIndex: "100" }}
        >
          <div style={{ position: "relative" }}>
            <StyledButton scheme="outline" onClick={() => setOpen(!open)}>
              Add Context
              <PlusCircle grey />
            </StyledButton>
            <div ref={popoverEl}></div>
          </div>
        </Popover>
      </AddContextRoot>
    );
  };

  return (
    <Root>
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          dispatchBlocks={dispatchBlocks}
          blockableId={sectionDescription.id}
          initialBlock={initialBlocks
            .map((ib) => parseInt(ib.id))
            .includes(parseInt(block.id))}
        />
      ))}
      <AddContext />
    </Root>
  );
};

export default Context;
