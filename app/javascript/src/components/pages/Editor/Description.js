import React, { useState, Fragment } from "react";
import styled, { css } from "styled-components";
import useCollapse from "react-collapsed";

// components
import * as Layout from "#components/shared/Layout";
import DescriptionActions from "./DescriptionActions";
import Creators from "#components/shared/Creators";
import Triangle from "#components/shared/Triangle";
import DescriptionHierarchy from "#components/shared/DescriptionHierarchy";
import Context from "./Context";
import Comments from "./Comments";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_attention, fl_allStates } from "#styles/frontline";

const Root = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
  margin-bottom: 20px;
  margin-top: 8px;
  padding: 20px 0;
  position: relative;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 25px;
  }
`;

const Actions = styled.div`
  display: none;
`;

const Inner = styled.div`
  border: 1px solid transparent;
  padding: 20px 25px;
  position: relative;
  transition: border-color 200ms ease-in-out;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 25px;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.blue};

    ${Actions} {
      display: block;
    }
  }
`;

export const Title = styled.p`
  font-size: 1.1rem;
  font-weight: bold;

  a {
    ${fl_allStates(css`
      color: ${(props) => props.theme.colors.blue};
      text-decoration: none;
    `)}

    ${fl_attention(css`
      color: ${(props) => props.theme.colors.blue};
      text-decoration: underline;
    `)}
  }
`;

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
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: false,
  });

  const [commenting, setCommenting] = useState(false);

  const sectionDescription = guide.included.filter(
    (i) =>
      i.type === "guide_section_descriptions" &&
      i.attributes.description_id === parseInt(description.id)
  )[0];

  const {
    creators,
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
        <MetaDefinition>
          <Creators creators={creators} />
        </MetaDefinition>

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
      <Inner>
        <Actions>
          <DescriptionActions
            guide={guide}
            section={section}
            sections={sections}
            description={description}
            dispatchDescriptions={dispatchDescriptions}
            first={first}
            last={last}
            commenting={commenting}
            setCommenting={setCommenting}
          />
        </Actions>

        <DescriptionHierarchy description={description} />

        {thumbnailUrl && (
          <DesktopThumbnail
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
            role="presentation"
          />
        )}

        <Title>
          <a href={`/${naId}`}>{title}</a>
        </Title>

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

      <Comments
        commentableType="GuideSectionDescription"
        commentableId={sectionDescription.id}
        commenting={commenting}
        setCommenting={setCommenting}
      />

      <Context guide={guide} sectionDescription={sectionDescription} />
    </Root>
  );
};

export default Description;
