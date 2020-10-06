import React from "react";
import styled from "styled-components";

// assets
import ImageIcon from "#assets/icons/image.svg";
import Form, { TextInput } from "#components/shared/Form";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border: 1px dashed ${(props) => props.theme.colors.blue};
  padding: 50px 80px;
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
`;

const InputWrapper = styled.div`
  position: relative;

  &:after {
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
  }
`;

const CoverImage = ({ handleChange, defaultValue }) => {
  return (
    <Root>
      <Form>
        <Title>
          <ImageIcon />
          Cover Image
        </Title>

        <Label htmlFor="coverImage">Add an Image From the Catalog</Label>
        <InputWrapper>
          <StyledTextInput
            id="coverImage"
            placeholder="Enter Catalog URL"
            defaultValue={defaultValue}
            onChange={(event) =>
              handleChange("background_image", event.target.value)
            }
          />
        </InputWrapper>
      </Form>
    </Root>
  );
};

export default CoverImage;
