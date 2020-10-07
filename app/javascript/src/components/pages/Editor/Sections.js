import React, { useContext, Fragment, useReducer } from "react";
import styled from "styled-components";
import arrayMove from "array-move";
import { uniqBy } from "lodash";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import Section from "./Section";
import Button from "#components/shared/Button";
import PlusCircle from "#components/shared/PlusCircle";

// API
import { createGuideSection } from "#api/internal/guideSection";

const StyledButton = styled(Button)`
  align-items: center;
  border: 0;
  display: block;
  display: flex;
  justify-content: space-between;
  line-height: 1;
  margin: 20px 0 80px;
  padding: 0;
  width: 100%;

  span {
    align-items: center;
    display: flex;
  }

  &:before,
  &:after {
    background-color: ${(props) => props.theme.colors.textLightGrey};
    content: "";
    display: inline-block;
    height: 1px;
    width: calc(50% - 85px);
  }
`;

const Sections = ({ guide }) => {
  const editorContext = useContext(EditorContext);

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
      let currentIndex;
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
        case "moveUp":
          currentIndex = descriptions[sectionId].findIndex(
            (d) => d.id === value.id
          );

          return {
            ...descriptions,
            [sectionId]: arrayMove(
              descriptions[sectionId],
              currentIndex,
              currentIndex - 1
            ),
          };
        case "moveDown":
          currentIndex = descriptions[sectionId].findIndex(
            (d) => d.id === value.id
          );

          return {
            ...descriptions,
            [sectionId]: arrayMove(
              descriptions[sectionId],
              currentIndex,
              currentIndex + 1
            ),
          };
        case "sortSectionByNaid":
          return {
            ...descriptions,
            [sectionId]: descriptions[sectionId].sort((a, b) =>
              parseInt(a.attributes.naId) > parseInt(b.attributes.naId) ? 1 : -1
            ),
          };

        default:
          return descriptions;
      }
    },
    initialDescriptions
  );

  const addSection = () => {
    editorContext.actions.setSaving(true);
    createGuideSection(guide.data.id)
      .then((response) => {
        dispatchSections({ type: "add", value: response.data.data });
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
        editorContext.actions.setSaving(false);
      })
      .catch((error) => {
        console.log(error);
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
        editorContext.actions.setSaving(false);
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

      <StyledButton onClick={addSection}>
        <span>
          Add Section
          <PlusCircle grey />
        </span>
      </StyledButton>
    </Fragment>
  );
};

export default Sections;
