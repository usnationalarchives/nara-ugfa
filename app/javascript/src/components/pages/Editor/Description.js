import React, { useState, Fragment } from "react";
import styled from "styled-components";
import useCollapse from "react-collapsed";

// components
import * as Layout from "#components/shared/Layout";
import DescriptionActions from "./DescriptionActions";
import Triangle from "#components/shared/Triangle";

// styles
import { buttonReset } from "#styles/mixins";

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
  padding: 20px 0;
  position: relative;
  transition: border-color 200ms ease-in-out;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 25px;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.blue};
  }
`;

export const Level = styled.p`
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

export const Title = styled.p`
  color: ${(props) => props.theme.colors.blue};
  font-size: 1.1rem;
  font-weight: bold;
`;

export const Ancestors = styled.ol`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

export const Ancestor = styled.li``;

export const DesktopThumbnail = styled.img`
  display: none;
  float: right;
  margin-bottom: 20px;
  margin-left: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: block;
  }
`;

export const MobileThumbnail = styled.img`
  margin-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;
  }
`;

const ExpandToggle = styled.button`
  ${buttonReset}

  color: ${(props) => props.theme.colors.blue};
  font-size: 0.8rem;
  text-transform: uppercase;
  vertical-align: middle;
`;

export const Meta = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const MetaTerm = styled.dt`
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 0.75rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 20%;
  }
`;

export const MetaDefinition = styled.dd`
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
  first,
  last,
}) => {
  const [hovering, setHovering] = useState(false);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: false,
  });

  const {
    ancestors,
    creators,
    level,
    naId,
    scopeContent,
    thumbnailUrl,
    title,
  } = description.attributes;

  const Metadata = () => {
    return (
      <Meta>
        <MetaTerm>NAID</MetaTerm>
        <MetaDefinition>{naId}</MetaDefinition>

        <MetaTerm>Creator(s)</MetaTerm>
        <MetaDefinition>{creators}</MetaDefinition>

        {scopeContent && (
          <Fragment>
            <MetaTerm>Scope &amp; Content</MetaTerm>
            <MetaDefinition>{scopeContent}</MetaDefinition>
          </Fragment>
        )}
      </Meta>
    );
  };

  return (
    <Root>
      <Inner
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {hovering && (
          <DescriptionActions
            guide={guide}
            section={section}
            sections={sections}
            description={description}
            dispatchDescriptions={dispatchDescriptions}
            first={first}
            last={last}
          />
        )}

        <Ancestors>
          {ancestors.map((ancestor) => (
            <Ancestor key={ancestor.naId}>
              {ancestor.level}: {ancestor.title}
            </Ancestor>
          ))}
        </Ancestors>

        <Level>{level} </Level>

        {thumbnailUrl && (
          <DesktopThumbnail
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
            role="presentation"
          />
        )}

        <Title>{title}</Title>

        {thumbnailUrl && (
          <MobileThumbnail
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
            role="presentation"
          />
        )}

        <Layout.Mobile>
          <ExpandToggle {...getToggleProps()}>
            Metadata <Triangle toggleOpen={isExpanded} />
          </ExpandToggle>
          <div {...getCollapseProps()}>
            <Metadata />
          </div>
        </Layout.Mobile>

        <Layout.Desktop>
          <Metadata />
        </Layout.Desktop>
      </Inner>
    </Root>
  );
};

export default Description;
