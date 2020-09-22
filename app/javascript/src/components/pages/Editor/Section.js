import React, { useContext } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import * as Text from "#components/shared/Text";
import Description from "./Description";
import SectionActions from "./SectionActions";
import SectionAuthoring from "./SectionAuthoring";

// API
import { updateGuideSection } from "#api/internal/guideSection";

// assets
import EditIcon from "#assets/icons/edit.svg";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  margin: 20px 0;
`;

const Inner = styled.div`
  padding: 20px 16px;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 50px;
  }
`;

const TitleWrapper = styled.div`
  position: relative;

  @media ${(props) => props.theme.breakpoints.medium} {
    margin: 0 50px;
  }
`;

const TitleInput = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 1px dashed ${(props) => props.theme.colors.darkGrey};
  display: block;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.625;
  outline: 0;
  padding: 4px 0;
  position: relative;
  width: 100%;
  z-index: 10;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 1.375rem;
    line-height: 1.18;
  }
`;

const StyledEditIcon = styled(EditIcon)`
  fill: ${(props) => props.theme.colors.textLightGrey};
  height: 20px;
  position: absolute;
  opacity: 0.7;
  right: 0;
  top: 6px;
  width: 20px;
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
    editorContext.actions.setSaving(true);
    updateGuideSection(guide.data.id, section.id, {
      [property]: value,
    })
      .then((response) => {
        dispatchSections({ type: "update", value: response.data.data });
        editorContext.actions.setLastSaved(
          response.data.data.attributes.updatedAgo
        );
        editorContext.actions.setSaving(false);
      })
      .catch((error) => {
        console.log(error);
        editorContext.actions.setSaving(false);
      });
  }, 300);

  return (
    <Root>
      <SectionActions
        guide={guide}
        section={section}
        dispatchSections={dispatchSections}
        first={first}
        last={last}
      />

      <Inner>
        <TitleWrapper>
          <label htmlFor={`section-title-${section.id}`}>
            <Text.Screenreader>Title</Text.Screenreader>
          </label>
          <TitleInput
            id={`section-title-${section.id}`}
            type="text"
            defaultValue={section.attributes.title}
            onChange={(event) => handleChange("title", event.target.value)}
            placeholder="Add a Section Title"
          />
          <StyledEditIcon />
        </TitleWrapper>

        <SectionAuthoring section={section} />

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
