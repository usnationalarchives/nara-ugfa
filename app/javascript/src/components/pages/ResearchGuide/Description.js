import React, { Fragment } from "react";
import styled from "styled-components";
import useCollapse from "react-collapsed";

// components
import * as Layout from "#components/shared/Layout";
import Triangle from "#components/shared/Triangle";
import Creators from "#components/shared/Creators";
import DescriptionHierarchy from "#components/shared/DescriptionHierarchy";
import Context from "./Context";

// styles
import { buttonReset } from "#styles/mixins";
import {
  DesktopThumbnail,
  Meta,
  MetaDefinition,
  MetaTerm,
  MobileThumbnail,
  Title,
} from "#components/pages/Editor/Description";

const Root = styled.div`
  padding: 30px 0;
  margin-bottom: 30px;

  &:after {
    background-color: ${(props) => props.theme.colors.mediumGrey};
    content: "";
    display: block;
    height: 1px;
    left: -5%;
    top: 30px;
    position: relative;
    width: 110%;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }
`;

const Inner = styled.div``;

const ExpandToggle = styled.button`
  ${buttonReset}

  color: ${(props) => props.theme.colors.blue};
  font-size: 0.8rem;
  text-transform: uppercase;
  vertical-align: middle;
`;

const Description = ({ description, guide }) => {
  const {
    creators,
    naId,
    scopeContent,
    thumbnailUrl,
    title,
  } = description.attributes;

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: false,
  });

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
    <Root id={`description-${description.id}`}>
      <Inner>
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
            style={{ marginBottom: "10px" }}
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

      <Context guide={guide} description={description} />
    </Root>
  );
};

export default Description;
