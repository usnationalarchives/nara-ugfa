import React, { Fragment, useReducer } from "react";
import arrayMove from "array-move";
import { uniqBy } from "lodash";

// components
import Button from "#components/shared/Button";
import Section from "./Section";

// API
import { createGuideSection } from "#api/internal/guideSection";
import { size } from "lodash";

const Sections = ({ guide }) => {
  const [sections, dispatchSections] = useReducer(
    (sections, { type, value }) => {
      let currentIndex;
      switch (type) {
        case "add":
          return [...sections, value];
        case "remove":
          return sections.filter((s) => s.id !== value.id);
        case "update":
          const updatedIndex = sections.findIndex((s) => s.id === value.id);
          sections[updatedIndex] = value;
          return sections;
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

  let initialDescriptions = {};
  for (let section of sections) {
    let descriptionIds = [];
    if (section.relationships) {
      descriptionIds = section.relationships.descriptions.data.map((r) => r.id);
    }
    if (guide.included) {
      initialDescriptions[section.id] = guide.included.filter(
        (i) => i.type === "descriptions" && descriptionIds.includes(i.id)
      );
    }
  }

  const [descriptions, dispatchDescriptions] = useReducer(
    (descriptions, { type, sectionId, value }) => {
      switch (type) {
        case "add":
          return {
            ...descriptions,
            [sectionId]: descriptions[sectionId]
              ? uniqBy([...descriptions[sectionId], value], (d) => d.id)
              : [value],
          };
        case "remove":
          return {
            ...descriptions,
            [sectionId]: descriptions[sectionId].filter(
              (d) => d.id !== value.id
            ),
          };

        default:
          return descriptions;
      }
    },
    initialDescriptions
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
          sections={sections}
          descriptions={descriptions[section.id] || []}
          dispatchDescriptions={dispatchDescriptions}
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
