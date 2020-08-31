import React from "react";
import ReactDOM from "react-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Triangle from "../../shared/Triangle";

// styles
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding: 0 20px;

  @media all and (min-width: 820px) {
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
    border-top: none;

    @media all and (min-width: ${(props) =>
        props.theme.layout.maxWidthNarrow}) {
      border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
    }
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

export const SectionItem = styled(AnchorLink)`
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

export const SectionSelect = styled.select`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-color: ${(props) => props.theme.colors.textlightGrey};
  border-radius: 30px;
  color: ${(props) => props.theme.colors.textlightGrey};
  max-width: 400px;
  padding: 10px;
  width: 100%;

  dropdownIndicator {
    margin-left: 20px;
  }

  ${fl_attention(css`
    border-color: ${(props) => props.theme.colors.darkGrey};
  `)}
`;

export const Desktop = styled.div`
  display: none;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    display: block;
  }
`;

export const Mobile = styled.div`
  display: block;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    display: none;
  }
`;

const GuideIntro = ({ data }) => {
  return (
    <Root>
      <Layout.Wrapper narrow={true}>
        <IntroSection>
          <IntroHeading>Guide Background</IntroHeading>
          <BackgroundItem>
            <Label>About</Label>
            <BackgroundInfo>{data.attributes.about}</BackgroundInfo>
          </BackgroundItem>
          <BackgroundItem>
            <Label>Purpose</Label>
            <BackgroundInfo>{data.attributes.purpose}</BackgroundInfo>
          </BackgroundItem>
          {data.attributes.audience_names && (
            <BackgroundItem>
              <Label>Audience</Label>
              <BackgroundInfo>{data.attributes.audience_names}</BackgroundInfo>
            </BackgroundItem>
          )}
        </IntroSection>
        <IntroSection>
          <Mobile>
            <Layout.Center>
              <label>
                <Text.Screenreader>Jump to a Section</Text.Screenreader>
              </label>
              <SectionSelect>
                <option>Jump to a section</option>
                <option>March on Washignton Program</option>
                <option>Committee Papers, 1945-1975</option>
                <option>
                  Final Plans for the March on Washington for Jobs and Freedom
                </option>
              </SectionSelect>
            </Layout.Center>
          </Mobile>
          <Desktop>
            <IntroHeading>Table of Contents</IntroHeading>
            <SectionTitle>Leaders of the March</SectionTitle>
            <SectionItem href="#march">
              Civil Rights March on Washignton [Leaders Marching from the
              Washington Monument to the Lincoln Memorial]
            </SectionItem>
            <SectionItem href="#march-2">
              Civil Rights March on Washignton Civil Rights March on Washignton
              Civil Rights March on Washignton
            </SectionItem>
            <SectionItem href="#march-3">
              Photograph of Meeting with Leaders of the March on Washington Aug
              28, 1963
            </SectionItem>
            <SectionTitle>Planning Documents</SectionTitle>
            <SectionItem href="march-4">
              March on Washignton Program
            </SectionItem>
            <SectionItem href="march-5">
              Committee Papers, 1945-1975
            </SectionItem>
            <SectionItem href="march-6">
              Final Plans for the March on Washington for Jobs and Freedom
            </SectionItem>
          </Desktop>
        </IntroSection>
      </Layout.Wrapper>
    </Root>
  );
};

export default GuideIntro;
