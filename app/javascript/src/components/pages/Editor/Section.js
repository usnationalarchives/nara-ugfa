import React, { useReducer } from "react";
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

const Section = ({ guide, section, dispatchSections, first, last }) => {
  let descriptionIds;
  if (section.relationships) {
    descriptionIds = section.relationships.descriptions.data.map((r) => r.id);
  }

  const [descriptions, dispatchDescriptions] = useReducer(
    (descriptions, { type, value }) => {
      switch (type) {
        case "add":
          return [...descriptions, value];
        case "remove":
          return descriptions.filter((d) => d.id !== value.id);
        default:
          return descriptions;
      }
    },
    guide.included
      ? guide.included.filter(
          (i) => i.type === "descriptions" && descriptionIds.includes(i.id)
        )
      : []
  );

  const handleChange = debounce((property, value) => {
    updateGuideSection(guide.data.id, section.id, {
      [property]: value,
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
          description={description}
          dispatchDescriptions={dispatchDescriptions}
        />
      ))}
    </Root>
  );
};

export default Section;
