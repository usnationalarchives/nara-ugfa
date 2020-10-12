import React, { useState, useContext } from "react";
import { debounce } from "lodash";
import styled from "styled-components";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import Form, { TextInput } from "#components/shared/Form";
import * as Text from "#components/shared/Text";

// API
import { updateGuide } from "#api/internal/guide";

// styles
import { fl_absoluteFill } from "#styles/frontline";
import { buttonReset } from "#styles/mixins";

// assets
import ImageIcon from "#assets/icons/image.svg";
import EditIcon from "#assets/icons/edit.svg";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  height: 100%;
`;

const StyledForm = styled(Form)`
  border: 1px dashed ${(props) => props.theme.colors.blue};
  height: 100%;
  padding: 50px 80px;
  position: relative;
`;

const Title = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;

  svg {
    fill: ${(props) => props.theme.colors.blue};
    height: 30px;
    vertical-align: middle;
    width: 30px;
    margin-right: 10px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledTextInput = styled(TextInput)`
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  display: block;
  width: 100%;
  padding-right: 40px;
`;

const Preview = styled.div`
  ${fl_absoluteFill}

  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  position: relative;
`;

const Edit = styled.button`
  ${buttonReset}
  position: absolute;
  right: 10px;
  top: 10px;

  svg {
    fill: ${(props) => props.theme.colors.white};
    height: 20px;
    width: 20px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Submit = styled.button`
  ${buttonReset}

  content: "";
  display: block;
  height: 12px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;

  border: 6px solid ${(props) => props.theme.colors.blue};
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

const CoverImage = ({ guide, defaultValue, defaultImageUrl }) => {
  const editorContext = useContext(EditorContext);
  const [value, setValue] = useState(defaultValue);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [editing, setEditing] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editorContext.actions.setSaving(true);

    updateGuide(guide.data.id, {
      background_image: value,
    }).then((response) => {
      setImageUrl(response.data.data.attributes.background_image_url);
      setEditing(false);
      editorContext.actions.setSaving(false);
      editorContext.actions.setLastSaved(
        response.data.data.attributes.updatedAgo
      );
    });
  };

  return (
    <Root>
      {imageUrl && !editing && (
        <Preview imageUrl={imageUrl}>
          <Edit onClick={() => setEditing(true)}>
            <EditIcon />
            <Text.Screenreader>Edit Cover Image</Text.Screenreader>
          </Edit>
        </Preview>
      )}

      {(!imageUrl || editing) && (
        <StyledForm onSubmit={handleSubmit}>
          <Title>
            <ImageIcon />
            Cover Image
          </Title>

          <Label htmlFor="coverImage">Add an Image From the Catalog</Label>
          <InputWrapper>
            <StyledTextInput
              id="coverImage"
              placeholder="Enter Catalog URL"
              name="catalogUrl"
              defaultValue={value}
              onChange={handleChange}
            />
            <Submit type="submit" />
          </InputWrapper>
        </StyledForm>
      )}
    </Root>
  );
};

export default CoverImage;
