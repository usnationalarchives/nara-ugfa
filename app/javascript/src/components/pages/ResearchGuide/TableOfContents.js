import React from "react";
import styled, { css } from "styled-components";
import AnchorLink from "react-anchor-link-smooth-scroll";

// components

// styles
import { fl_static, fl_attention } from "#styles/frontline";

export const Root = styled.div`
  display: none;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    display: block;
  }
`;

export const IntroHeading = styled.h3`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 1.4em;
  font-weight: bold;
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

const TableOfContents = ({ guide }) => {
  const sections = (guide.included || []).filter(
    (s) => s.type === "guide_sections"
  );

  const Section = ({ section }) => {
    const descriptions = guide.included.filter(
      (i) =>
        i.type === "descriptions" &&
        section.relationships.descriptions.data.map((r) => r.id).includes(i.id)
    );

    return (
      <div>
        <SectionTitle>{section.attributes.title}</SectionTitle>
        {descriptions.map((description) => (
          <SectionItem
            key={description.id}
            href={`#description-${description.id}`}
          >
            {description.attributes.title}
          </SectionItem>
        ))}
      </div>
    );
  };

  return (
    <Root>
      <IntroHeading>Table of Contents</IntroHeading>
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </Root>
  );
};

export default TableOfContents;
