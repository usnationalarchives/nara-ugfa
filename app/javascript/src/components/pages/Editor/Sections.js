import React, { Fragment, useReducer } from "react";
import arrayMove from "array-move";

// components
import Button from "#components/shared/Button";
import Section from "./Section";

// API
import { createGuideSection } from "#api/internal/guideSection";

const Sections = ({ guide }) => {
  const [sections, dispatchSections] = useReducer(
    (sections, { type, value }) => {
      let currentIndex;
      switch (type) {
        case "add":
          return [...sections, value];
        case "remove":
          return sections.filter((s) => s.id !== value.id);
        case "moveUp":
          currentIndex = sections.findIndex((s) => s.id === value.id);
          return arrayMove(sections, currentIndex, currentIndex - 1);
        case "moveDown":
          currentIndex = sections.findIndex((s) => s.id === value.id);
          return arrayMove(sections, currentIndex, currentIndex + 1);
        default:
          return sections;
      }
    },
    guide.included
      ? guide.included.filter((s) => s.type === "guide_sections")
      : []
  );

  const addSection = () => {
    createGuideSection(guide.data.id)
      .then((response) => {
        dispatchSections({ type: "add", value: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      {sections.map((section, i) => (
        <Section
          first={i === 0}
          last={i === sections.length - 1}
          key={section.id}
          guide={guide}
          section={section}
          dispatchSections={dispatchSections}
        />
      ))}

      <Button onClick={addSection} scheme="outline">
        Add Section
      </Button>
    </Fragment>
  );
};

export default Sections;
