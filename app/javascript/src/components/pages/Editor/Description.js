import React, { useState, Fragment } from "react";
import styled from "styled-components";

// components
import DescriptionActions from "./DescriptionActions";

const Root = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
  margin-top: 8px;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 25px;
  }

  &:last-child {
    border: 0;
  }
`;

const Inner = styled.div`
  border: 1px solid transparent;
  position: relative;
  transition: border-color 200ms ease-in-out;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 25px;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.blue};
  }
`;

const Level = styled.p`
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.blue};
  font-size: 1.1rem;
  font-weight: bold;
`;

const Ancestors = styled.ol`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

const Ancestor = styled.li``;

const DesktopThumbnail = styled.img`
  display: none;
  float: right;
  margin-bottom: 20px;
  margin-left: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: block;
  }
`;
const MobileThumbnail = styled.img`
  margin-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;
  }
`;

const Meta = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const MetaTerm = styled.dt`
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 0.75rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 20%;
  }
`;

const MetaDefinition = styled.dd`
  width: 100%;
  margin-bottom: 20px;
  font-size: 0.8rem;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 80%;
  }
`;

const Description = ({
  guide,
  section,
  sections,
  description,
  dispatchDescriptions,
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <Root>
      <Inner
        onMouseEnter={(event) => setHovering(true)}
        onMouseLeave={(event) => setHovering(false)}
      >
        {hovering && (
          <DescriptionActions
            guide={guide}
            section={section}
            sections={sections}
            description={description}
            dispatchDescriptions={dispatchDescriptions}
          />
        )}

        <Ancestors>
          {description.attributes.ancestors.map((ancestor) => (
            <Ancestor key={ancestor.naId}>
              {ancestor.level}: {ancestor.title}
            </Ancestor>
          ))}
        </Ancestors>

        <Level>{description.attributes.level} </Level>

        {description.attributes.thumbnailUrl && (
          <DesktopThumbnail
            src={description.attributes.thumbnailUrl}
            alt=""
            aria-hidden="true"
            role="presentation"
          />
        )}

        <Title>{description.attributes.title}</Title>

        {description.attributes.thumbnailUrl && (
          <MobileThumbnail
            src={description.attributes.thumbnailUrl}
            alt=""
            aria-hidden="true"
            role="presentation"
          />
        )}

        <Meta>
          <MetaTerm>NAID</MetaTerm>
          <MetaDefinition>{description.attributes.naId}</MetaDefinition>

          <MetaTerm>Creator(s)</MetaTerm>
          <MetaDefinition>{description.attributes.creators}</MetaDefinition>

          {description.attributes.scopeContent && (
            <Fragment>
              <MetaTerm>Scope &amp; Content</MetaTerm>
              <MetaDefinition>FIXME</MetaDefinition>
            </Fragment>
          )}
        </Meta>
      </Inner>
    </Root>
  );
};

export default Description;
