import React, { useState, useRef } from "react";
import Popover from "react-tiny-popover";
import styled from "styled-components";

// components
import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";

// API
import { moveDescription } from "#api/internal/guideSectionDescription";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import Icon from "#assets/icons/move-to-section.svg";

const Move = styled.button`
  ${buttonReset}

  svg {
    display: inline-block;
    fill: ${(props) => props.theme.colors.blue};
    height: 17px;
    width: 17px;
    margin-right: 10px;

    @media all and ${(props) => props.theme.breakpoints.medium} {
      margin-right: 0;
    }
  }
`;

const MenuWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  width: 200px;
  padding: 20px;
  text-align: left;
`;

const MenuTitle = styled.p`
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const MoveToSection = styled.button`
  ${buttonReset}

  color: ${(props) => props.theme.colors.blue};
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 10px;
  text-align: left;
  text-decoration: none;
`;

const MoveTo = ({
  guide,
  sections,
  section,
  description,
  dispatchDescriptions,
}) => {
  const popoverEl = useRef();
  const [open, setOpen] = useState(false);

  const handleMove = (targetSectionId) => {
    setOpen(false);

    moveDescription(
      guide.data.id,
      section.id,
      [description.id],
      targetSectionId
    )
      .then(() => {
        dispatchDescriptions({
          type: "remove",
          sectionId: section.id,
          value: description,
        });
        dispatchDescriptions({
          type: "add",
          sectionId: targetSectionId,
          value: description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PopoverContent = () => {
    return (
      <MenuWrapper>
        <MenuTitle style={{ marginBottom: "20px" }}>Move to Section</MenuTitle>
        <ul>
          {sections.map((guideSection) => (
            <li key={guideSection.id}>
              <MoveToSection
                disabled={guideSection.id === section.id}
                onClick={(event) => handleMove(guideSection.id)}
              >
                {guideSection.attributes.title || "Untitled Section"}
              </MoveToSection>
            </li>
          ))}
        </ul>
      </MenuWrapper>
    );
  };

  return (
    <Popover
      isOpen={open}
      position={["bottom", "right"]}
      disableReposition
      onClickOutside={() => setOpen(false)}
      contentLocation={{ top: 40, left: -20 }}
      content={<PopoverContent />}
      contentDestination={popoverEl.current}
      containerStyle={{ overflow: "visible", zIndex: "100" }}
    >
      <span style={{ height: "19px", position: "relative" }}>
        <Move onClick={() => setOpen(!open)}>
          <Icon aria-hidden="true" focusable="false" />
          <Layout.InlineDesktop>
            <Text.Screenreader>Move</Text.Screenreader>
          </Layout.InlineDesktop>
          <Layout.Mobile inline>Move</Layout.Mobile>
        </Move>
        <span ref={popoverEl}></span>
      </span>
    </Popover>
  );
};

export default MoveTo;
