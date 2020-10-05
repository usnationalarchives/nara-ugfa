import React from "react";
import styled from "styled-components";

// components
import { TextInput } from "#components/shared/Form";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    flex-direction: row;
    margin-top: 0;
  }
`;

const StyledLabel = styled.label`
  text-transform: uppercase;
  font-size: 0.75rem;
  margin-bottom: 10px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const BackgroundImage = ({ backgroundImage, setBackgroundImage, block }) => {
  return (
    <Root>
      <StyledLabel htmlFor={`block-${block.id}-bgImage`}>
        Add Background Image
      </StyledLabel>
      <TextInput
        id={`block-${block.id}-bgImage`}
        type="text"
        defaultValue={backgroundImage}
        placeholder="Catalog URL or NAID"
        onChange={(event) => setBackgroundImage(event.target.value)}
      />
    </Root>
  );
};

export default BackgroundImage;
