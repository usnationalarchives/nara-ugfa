import React from "react";
import styled from "styled-components";

// components
import Description from "./Description";

export const Root = styled.div`
  &:last-of-type {
    margin-bottom: 50px;
  }
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 1.6em;
  font-weight: bold;
  margin: 30px 0 10px 0;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    font-size: 2em;
    margin: 50px 0 20px 0;
    padding: 0;
  }
`;

const Section = ({ guide, section }) => {
  const { title } = section.attributes;
  const descriptions = guide.included.filter(
    (i) =>
      i.type === "descriptions" &&
      section.relationships.descriptions.data.map((r) => r.id).includes(i.id)
  );

  return (
    <Root>
      <Title>{title}</Title>
      {descriptions.map((description) => (
        <Description
          key={description.id}
          description={description}
          guide={guide}
        />
      ))}
    </Root>
  );
};

export default Section;
