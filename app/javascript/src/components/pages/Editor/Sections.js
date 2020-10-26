import React, { useContext, Fragment } from "react";
import styled from "styled-components";

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

const Sections = () => {
  const editorContext = useContext(EditorContext);
  const guide = editorContext.state.guide;

  const addSection = () => {
    editorContext.actions.setSaving(true);
    createGuideSection(guide.data.id)
      .then((response) => {
        editorContext.actions.dispatchSections({
          type: "add",
          value: response.data.data,
        });
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
        editorContext.actions.setSaving(false);

        document
          .querySelector(`#section-title-${response.data.data.id}`)
          .focus();
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
      {editorContext.state.sections.map((section, i) => (
        <Section
          first={i === 0}
          last={i === editorContext.state.sections.length - 1}
          key={section.id}
          guide={guide}
          section={section}
          sections={editorContext.state.sections}
          descriptions={editorContext.state.descriptions[section.id] || []}
          dispatchDescriptions={editorContext.actions.dispatchDescriptions}
          dispatchSections={editorContext.actions.dispatchSections}
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
