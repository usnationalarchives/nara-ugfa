import React from "react";
import styled from "styled-components";
import { debounce } from "lodash";

// components
import Description from "./Description";

// API
import {
  updateGuideSection,
  deleteGuideSection,
  moveUpGuideSection,
  moveDownGuideSection,
} from "#api/internal/guideSection";

const Root = styled.div`
  margin: 20px 0;
`;

const Section = ({
  guide,
  section,
  sections,
  descriptions,
  dispatchDescriptions,
  dispatchSections,
  first,
  last,
}) => {
  const handleChange = debounce((property, value) => {
    updateGuideSection(guide.data.id, section.id, {
      [property]: value,
    })
      .then((response) => {
        dispatchSections({ type: "update", value: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, 300);

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
      <label htmlFor={`section-title-${section.id}`}>Title</label>
      <br />
      <input
        id={`section-title-${section.id}`}
        type="text"
        defaultValue={section.attributes.title}
        onChange={(event) => handleChange("title", event.target.value)}
      />
      <br />
      <button onClick={removeSection}>Delete</button>
      <button disabled={first} onClick={moveUp}>
        Move Up
      </button>
      <button disabled={last} onClick={moveDown}>
        Move Down
      </button>

      {descriptions.map((description) => (
        <Description
          key={description.id}
          guide={guide}
          section={section}
          sections={sections}
          description={description}
          dispatchDescriptions={dispatchDescriptions}
        />
      ))}
    </Root>
  );
};

export default Section;
