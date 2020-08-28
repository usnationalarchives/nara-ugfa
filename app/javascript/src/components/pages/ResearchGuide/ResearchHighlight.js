import React from "react";
import styled, { css } from 'styled-components';


export const Root = styled.div`
  margin: 40px 0;
`;

export const Content = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 30px 10px;
  text-align: center;

  @media all and (min-width: 650px) {
    padding: 50px 20px;
  }

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    padding: 70px 20px;
  }
`;

export const Label = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8em;
  padding-bottom: 20px;
  text-transform: uppercase;
`;

export const Highlight = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: 1em;
  margin: auto;
  max-width: 500px;

  @media all and (min-width: 650px) {
    font-size: 1.1em;
  }
  
  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    font-size: 1.2em;
  }
`;

export const MobileImage = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  height: 150px;
  width: 100%;

  @media all and (min-width: 650px) {
    display: none;
  }
`;

const ResearchHighlight = () => {
  return (
    <Root>
      <MobileImage></MobileImage>
      <Content>
        <Label>Rearch Highlight</Label>
        <Highlight>At the age of 23, John Lewis, of the Student Nonviolent Coordinating Committee, was the youngest speaker at the March on Washington.</Highlight>
      </Content>
    </Root>
  );
};

export default ResearchHighlight;
