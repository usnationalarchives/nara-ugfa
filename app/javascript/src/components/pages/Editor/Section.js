import React, { useContext } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

// context
import { EditorContext } from "#contexts/Editor";

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
  border: 1px solid ${(props) => props.theme.colors.blue};
`;

const Inner = styled.div`
  padding: 20px;
`;

const Actions = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  padding: 10px;
  text-align: right;

  button {
    padding: 4px 8px;
    margin-left: 10px;
    font-size: 0.8rem;
  }
`;

const Authoring = styled.div`
  margin: 20px 20px 0;
  text-align: center;

  button {
    padding: 4px 8px;
    margin: 0 6px;
  }
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
  const editorContext = useContext(EditorContext);

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

  const handleAddRecords = (activeSectionId) => {
    editorContext.actions.setAddingRecords(true);
    editorContext.actions.setActiveSection(activeSectionId);
  };

  return (
    <Root>
      <Actions>
        <button onClick={removeSection}>Delete</button>
        <button disabled={first} onClick={moveUp}>
          Move Up
        </button>
        <button disabled={last} onClick={moveDown}>
          Move Down
        </button>
      </Actions>

      <Inner>
        <label htmlFor={`section-title-${section.id}`}>Title</label>
        <br />
        <input
          id={`section-title-${section.id}`}
          type="text"
          defaultValue={section.attributes.title}
          onChange={(event) => handleChange("title", event.target.value)}
        />

        <Authoring>
          <button>Add Context</button>
          <button onClick={(event) => handleAddRecords(section.id)}>
            Add Records
          </button>
        </Authoring>

        <div style={{ marginTop: "20px" }}>
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
        </div>
      </Inner>
    </Root>
  );
};

export default Section;
