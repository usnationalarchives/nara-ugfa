import React from "react";
import styled from 'styled-components';

// components
import AddToGuideButton from '../../shared/AddToGuideButton';
import InfoToggle from './InfoToggle';
import ImageViewer from "./ImageViewer";

export const Root = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 40px;

  button {
    margin-right: 0;
    margin-left: auto;
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
      <AddToGuideButton added={false} text="Add to Guide"/>
      <p>Item</p>
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
