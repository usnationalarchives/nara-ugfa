import React, { useContext, Fragment, useState, useRef } from "react";
import styled, { css } from "styled-components";
import Popover from "react-tiny-popover";
import { Link } from "react-router-dom";
import { startCase } from "lodash";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import { GuideTitle, GuideMeta } from "#components/shared/AddToGuideButton";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_static, fl_attention } from "#styles/frontline";

const StyledButton = styled.button`
  ${buttonReset}

  color: ${(props) => props.theme.colors.blue};
  font-size: 0.8rem;
  margin-top: 10px;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  ${fl_static(css`
    text-decoration: none;
    color: ${(props) => props.theme.colors.blue};
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

const Guide = styled.li`
  margin-top: 20px;

  &:first-child {
    margin: 0;
  }
`;

const ExistingGuidesPopover = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  width: 250px;
  padding: 20px;
  text-align: left;
`;

const ExistingGuides = ({ guides }) => {
  const editorContext = useContext(EditorContext);
  const [open, setOpen] = useState(false);
  const popoverEl = useRef();

  const PopoverContent = () => {
    return (
      <ExistingGuidesPopover>
        <ul>
          {guides.map((guide, i) => (
            <Guide key={i}>
              <GuideTitle>
                <StyledLink
                  to={`/guides/${guide.guide_id}/edit`}
                  onClick={() => editorContext.actions.setAddingRecords(false)}
                >
                  {guide.guide_title || "Untitled Guide"}
                </StyledLink>
              </GuideTitle>
              <GuideMeta>
                {startCase(guide.status)} | Last Edited on {guide.updated}
              </GuideMeta>
            </Guide>
          ))}
        </ul>
      </ExistingGuidesPopover>
    );
  };

  return (
    <Fragment>
      {guides.length > 0 && (
        <Popover
          isOpen={open}
          position="bottom"
          onClickOutside={() => setOpen(false)}
          content={<PopoverContent />}
          contentDestination={popoverEl.current}
          containerStyle={{ overflow: "visible", zIndex: "500" }}
          contentLocation={{ top: 10, left: -110 }}
        >
          <div style={{ position: "relative" }}>
            <StyledButton type="button" onClick={() => setOpen(!open)}>
              Added to {guides.length} guide{guides.length > 1 ? "s" : null}
            </StyledButton>
            <div
              style={{ position: "absolute", width: "100%", top: 0, right: 0 }}
              ref={popoverEl}
            ></div>
          </div>
        </Popover>
      )}
    </Fragment>
  );
};

export default ExistingGuides;
