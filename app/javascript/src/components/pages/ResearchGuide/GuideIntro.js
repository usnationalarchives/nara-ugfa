import React from "react";
import styled, { css } from "styled-components";

// components
import * as Layout from "#components/shared/Layout";
import TableOfContents from "./TableOfContents";
import SectionSelect from "./SectionSelect";

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

const GuideIntro = ({ guide }) => {
  return (
    <Root>
      <Layout.Wrapper narrow={true}>
        <IntroSection>
          <IntroHeading>Guide Background</IntroHeading>
          {guide.data.attributes.about && (
            <BackgroundItem>
              <Label>About</Label>
              <BackgroundInfo>{guide.data.attributes.about}</BackgroundInfo>
            </BackgroundItem>
          )}
          {guide.data.attributes.purpose && (
            <BackgroundItem>
              <Label>Purpose</Label>
              <BackgroundInfo>{guide.data.attributes.purpose}</BackgroundInfo>
            </BackgroundItem>
          )}
          {guide.data.attributes.audience_names && (
            <BackgroundItem>
              <Label>Audience</Label>
              <BackgroundInfo>
                {guide.data.attributes.audience_names}
              </BackgroundInfo>
            </BackgroundItem>
          )}
        </IntroSection>
        <IntroSection>
          <SectionSelect guide={guide} />
          <TableOfContents guide={guide} />
        </IntroSection>
      </Layout.Wrapper>
    </Root>
  );
};

export default GuideIntro;
