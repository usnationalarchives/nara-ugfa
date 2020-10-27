import React, { useContext, useState, Fragment } from "react";
import styled, { css } from "styled-components";
import useCollapse from "react-collapsed";

// context
import { EditorContext } from "#contexts/Editor";

// components
import * as Layout from "#components/shared/Layout";
import DescriptionActions from "./DescriptionActions";
import Creators from "#components/shared/Creators";
import Triangle from "#components/shared/Triangle";
import DescriptionHierarchy from "#components/shared/DescriptionHierarchy";
import BulkSelect from "./BulkSelect";
import Blocks from "./Blocks";
import Comments from "./Comments";
import Authoring from "./Authoring";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_attention, fl_allStates } from "#styles/frontline";

const Bulk = styled.div`
  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;

    ${(props) =>
      props.show &&
      css`
        display: block;
      `}
  }
`;

const Actions = styled.div`
  display: none;
`;

const Root = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
  margin-bottom: 20px;
  margin-top: 8px;
  padding: 20px 0;
  position: relative;

  &:first-child {
    border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
    @media ${(props) => props.theme.breakpoints.medium} {
      padding-top: 40px;
    }
  }

  &:hover {
    ${Bulk} {
      display: block;
    }
  }

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 25px;
  }
`;

const Inner = styled.div`
  border: 1px solid transparent;
  position: relative;
  transition: border-color 200ms ease-in-out;

  @media ${(props) => props.theme.breakpoints.medium} {
    padding: 20px 25px;

    &:hover {
      border-color: ${(props) => props.theme.colors.blue};

      ${Actions} {
        display: block;
      }
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
  margin: 10px 0 20px;
  text-transform: uppercase;
  vertical-align: middle;
`;

const MetaToggleInner = styled.span`
  display: flex;
  align-items: center;
`;

export const Meta = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const MetaTerm = styled.dt`
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 0.75rem;
  margin-bottom: 5px;
  text-transform: uppercase;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 20%;
    margin-bottom: 20px;
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
  const editorContext = useContext(EditorContext);

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: false,
  });

  const [commenting, setCommenting] = useState(false);

  const sectionDescription = (editorContext.state.guide.included || []).filter(
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

  const handleAddRecords = () => {
    editorContext.actions.setActiveGuide(guide.data.id);
    editorContext.actions.setActiveSection(
      sectionDescription.attributes.guide_section_id
    );
    editorContext.actions.setActiveDescription(
      sectionDescription.attributes.description_id
    );
    editorContext.actions.setAddingRecords(true);
  };

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
            setCommenting={setCommenting}
          />
        </Actions>

        <Bulk show={editorContext.state.bulkItems.length}>
          <BulkSelect description={description} />
        </Bulk>

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
            <MetaToggleInner>
              Metadata{" "}
              <Triangle style={{ marginLeft: "5px" }} toggleOpen={isExpanded} />
            </MetaToggleInner>
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
        commentableId={(sectionDescription || {}).id}
        commenting={commenting}
        setCommenting={setCommenting}
      />

      <Blocks
        blockableType="GuideSectionDescription"
        blockableId={(sectionDescription || {}).id}
      />

      <Authoring
        handleAddRecords={handleAddRecords}
        resourceType="GuideSectionDescription"
        resourceId={(sectionDescription || {}).id}
        context="description"
      />
    </Root>
  );
};

export default Description;
