import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// styles
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  margin: 40px 0;
  padding: 20px 10px;
  text-align: center;

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
  
  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    font-size: 1.2em;
  }
`;


const ResearchHighlight = () => {
  return (
    <Root>
      <Label>Rearch Highlight</Label>
      <Highlight>At the age of 23, John Lewis, of the Student Nonviolent Coordinating Committee, was the youngest speaker at the March on Washington.</Highlight>
    </Root>
  );
};

export default ResearchHighlight;
