import React from "react";
import styled from 'styled-components';

// components
import AddToGuideButton from '../../shared/AddToGuideButton';
import InfoToggle from './InfoToggle';
import ImageViewer from "./ImageViewer";

export const Root = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;

  @media all and (min-width: ${props => props.theme.layout.catalogColumnMin}) {
    padding: 40px;
  }
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  @media all and (min-width: ${props => props.theme.layout.catalogColumnMin}) {
    align-items: center;
    flex-direction: row;
  }

  p {
    font-size: 1.2em;
    font-weight: bold;
    width: 75%;
  }

  button {
    margin-top: 20px;

    @media all and (min-width: ${props => props.theme.layout.catalogColumnMin}) {
      margin: 0 auto 0 0;
    }
  }
`;

export const InspectArea = styled.div`
  border: 1px solid ${props => props.theme.colors.mediumGrey};
  content: '';
  height: 500px;
  width: 100%;
`;

const Record = () => {
  return (
    <Root>
      <Heading>
        <p>Civil Rights March on Washington, DC [Leaders marching from the Washington Monument to the Lincoln Memorial.]</p>
        <AddToGuideButton added={false} text="Add to Guide" />
      </Heading>
      <InspectArea>
        <ImageViewer />
      </InspectArea>
      <InfoToggle heading="Additional Information About this Item"/>
      <InfoToggle heading="Details"/>
      <InfoToggle heading="Scope and Content"/>
      <InfoToggle heading="Variant Control Numbers"/>
      <InfoToggle heading="Archived Copies" />
    </Root>
  );
};

export default Record;
