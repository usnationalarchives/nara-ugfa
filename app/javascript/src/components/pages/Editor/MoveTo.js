import React, { useState, useRef } from "react";
import Popover from "react-tiny-popover";
import styled from "styled-components";

// API
import {
  removeDescriptions,
  addDescriptions,
} from "#api/internal/guideSection";

// styles
import { buttonReset } from "#styles/mixins";

const Move = styled.button``;

const MenuWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  border-radius: 10px;
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const MoveToSection = styled.button`
  ${buttonReset}

  color: ${(props) => props.theme.colors.blue};
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 0;
  margin-top: 5px;
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

    removeDescriptions(guide.data.id, section.id, [description.id])
      .then(() => {
        dispatchDescriptions({
          type: "remove",
          sectionId: section.id,
          value: description,
        });

        addDescriptions(guide.data.id, targetSectionId, [description.id])
          .then(() => {
            dispatchDescriptions({
              type: "add",
              sectionId: targetSectionId,
              value: description,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PopoverContent = () => {
    return (
      <MenuWrapper>
        <p style={{ marginBottom: "20px" }}>Move to Section</p>
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
      position={"bottom"}
      disableReposition
      onClickOutside={() => setOpen(false)}
      contentLocation={{ top: 40, left: -20 }}
      content={<PopoverContent />}
      contentDestination={popoverEl.current}
      containerStyle={{ overflow: "visible", zIndex: "100" }}
    >
      <span style={{ position: "relative" }}>
        <Move onClick={() => setOpen(!open)}>Move</Move>
        <span ref={popoverEl}></span>
      </span>
    </Popover>
  );
};

export default MoveTo;
