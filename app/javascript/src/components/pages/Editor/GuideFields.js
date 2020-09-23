import React, { useState, useContext } from "react";
import { debounce } from "lodash";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

// API
import { updateGuide } from "#api/internal/guide";

// modules
import backgroundColors from "#modules/backgroundColors";

// components
import * as Text from "#components/shared/Text";
import Select from "#components/shared/Select";
import BackgroundColor from "./BackgroundColor";
import AudienceSelect from "./AudienceSelect";

// contexts
import { EditorContext } from "#contexts/Editor";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
`;

const Hero = styled.div`
  background-color: ${(props) => props.backgroundColor};
`;

const HeroInner = styled.div`
  padding: 16px;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 60px;
  }
`;

const TitleInput = styled(TextareaAutosize)`
  background-color: transparent;
  border: 0;
  border-bottom: 1px dashed ${(props) => props.textcolor};
  color: ${(props) => props.textcolor};
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.3;
  margin: 40px 0;
  outline: 0;
  overflow-y: hidden;

  ::placeholder {
    color: ${(props) => props.textcolor};
    opacity: 0.75;
  }

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 2rem;
    line-height: 1.18;
    margin: 60px 0;
  }
`;

const Fieldset = styled.fieldset`
  margin-top: 30px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 24px;

  @media ${(props) => props.theme.breakpoints.medium} {
    margin-top: 60px;
    padding-left: 100px;
    padding-right: 100px;
  }
`;

const Legend = styled.legend`
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.625;
  margin: 0;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 1.375rem;
    line-height: 1.18;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Textarea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding: 12px 16px;
`;

const GuideFields = ({ guide }) => {
  const editorContext = useContext(EditorContext);

  const [backgroundColor, setBackgroundColor] = useState(
    backgroundColors.filter(
      (c) => c.value === guide.data.attributes.background_color
    )[0].code
  );

  const [textColor, setTextColor] = useState(
    backgroundColors.filter(
      (c) => c.value === guide.data.attributes.background_color
    )[0].text
  );

  const handleChange = debounce((property, value) => {
    editorContext.actions.setSaving(true);
    updateGuide(guide.data.id, {
      [property]: value,
    }).then((response) => {
      editorContext.actions.setSaving(false);
      editorContext.actions.setLastSaved(
        response.data.data.attributes.updatedAgo
      );
    });
  }, 300);

  return (
    <Root>
      <Hero backgroundColor={backgroundColor}>
        <HeroInner>
          <div style={{ marginBottom: "20px" }}>
            <Label htmlFor="title">
              <Text.Screenreader>Title</Text.Screenreader>
            </Label>
            <TitleInput
              id="title"
              defaultValue={guide.data.attributes.title}
              type="text"
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Click to Add Title"
              textcolor={textColor}
            />
          </div>

          <BackgroundColor
            guide={guide}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            textColor={textColor}
            setTextColor={setTextColor}
          />
        </HeroInner>
      </Hero>

      <Fieldset>
        <Legend>Guide to Records Background</Legend>
        <div style={{ marginBottom: "40px" }}>
          <Label htmlFor="about">What is your guide to records about?</Label>
          <Textarea
            id="about"
            rows="6"
            defaultValue={guide.data.attributes.about}
            onChange={(event) => handleChange("about", event.target.value)}
          />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <Label htmlFor="purpose">
            Why did you create your guide to records?
          </Label>
          <Textarea
            id="purpose"
            rows="6"
            defaultValue={guide.data.attributes.purpose}
            onChange={(event) => handleChange("purpose", event.target.value)}
          />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <Label htmlFor="looking_for_collaborators">
            Are you looking for collaborators from the Catalog / History Hub
            community to help with your guide to records? If you are seeking
            help on a guide, you can indicate that so other users of the Catalog
            or History Hub can request to participate in updating the guide.
          </Label>
          <Select
            style={{ width: "50%" }}
            id="looking_for_collaborators"
            defaultValue={guide.data.attributes.looking_for_collaborators}
            onChange={(event) =>
              handleChange("looking_for_collaborators", event.target.value)
            }
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </Select>
        </div>

        <AudienceSelect guide={guide} />

        <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          <Label htmlFor="looking_for_collaborators">
            Is your guide to records complete or in progress?
          </Label>
          <Select
            style={{ width: "50%" }}
            id="complete_or_wip"
            defaultValue={guide.data.attributes.complete_or_wip}
            onChange={(event) =>
              handleChange("complete_or_wip", event.target.value)
            }
          >
            <option value="wip">In Progress</option>
            <option value="complete">Complete</option>
          </Select>
        </div>
      </Fieldset>
    </Root>
  );
};

export default GuideFields;
