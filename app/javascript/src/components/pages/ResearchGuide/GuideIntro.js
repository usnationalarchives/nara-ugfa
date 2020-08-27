import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";

// styles
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding: 0 20px;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    padding: 0;
  }
`;

export const IntroSection = styled.div`
  margin: auto;
  padding: 20px 0;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    padding: 40px 0;
  }

  & + & {
    border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
  }
`;

export const IntroHeading = styled.h3`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 1.4em;
  font-weight: bold;
`;

export const BackgroundItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    flex-direction: row;
  }
`;

export const Label = styled.p`
  color: ${(props) => props.theme.colors.darkGrey};
  text-transform: uppercase;
  opacity: 0.7;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    width: 10%;
  }
`;

export const BackgroundInfo = styled.p`
  color: ${(props) => props.theme.colors.darkGrey};

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    width: 80%;
  }
`;

export const SectionTitle = styled.h4`
  color: ${(props) => props.theme.colors.darkGrey};
  font-weight: bold;
  margin-top: 20px;
`;

export const SectionItem = styled(Link)`
  display: block;
  margin-top: 15px;

  ${fl_static(css`
    color: ${(props) => props.theme.colors.blue};
    text-decoration: none;
  `)}
  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

const GuideIntro = () => {
  return (
    <Root>
      <Layout.Wrapper narrow={true}>
        <IntroSection>
          <IntroHeading>Guide Background</IntroHeading>
          <BackgroundItem>
            <Label>Topic</Label>
            <BackgroundInfo>March on Washington</BackgroundInfo>
          </BackgroundItem>
          <BackgroundItem>
            <Label>Purpose</Label>
            <BackgroundInfo>I want to gather records of this historic event, including images and speeches, as well as any records related to the planning of the march, national response to the march, and what took place afterward.</BackgroundInfo>
          </BackgroundItem>
          <BackgroundItem>
            <Label>Audience</Label>
            <BackgroundInfo>Anyone</BackgroundInfo>
          </BackgroundItem>
        </IntroSection>
        <IntroSection>
          <IntroHeading>Table of Contents</IntroHeading>
          <SectionTitle>Leaders of the March</SectionTitle>
          <SectionItem to="/">Civil Rights March on Washignton [Leaders Marching from the Washington Monument to the Lincoln Memorial]</SectionItem>
          <SectionItem to="/">Civil Rights March on Washignton [Leaders Marching from the Washington Monument to the Lincoln Memorial]</SectionItem>
          <SectionItem to="/">Civil Rights March on Washignton [Leaders Marching from the Washington Monument to the Lincoln Memorial]</SectionItem>
          <SectionItem to="/">Civil Rights March on Washignton [Leaders Marching from the Washington Monument to the Lincoln Memorial]</SectionItem>
          <SectionItem to="/">Civil Rights March on Washignton [Leaders Marching from the Washington Monument to the Lincoln Memorial]</SectionItem>
          <SectionTitle>Planning Documents</SectionTitle>
          <SectionItem to="/">March on Washignton Program</SectionItem>
          <SectionItem to="/">Committee Papers, 1945-1975</SectionItem>
          <SectionItem to="/">Final Plans for the March on Washington for Jobs and Freedom</SectionItem>
        </IntroSection>
      </Layout.Wrapper>
    </Root>
  );
};

export default GuideIntro;
