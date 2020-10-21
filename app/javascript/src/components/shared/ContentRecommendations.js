import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { Get } from "react-axios";

// components
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import DescriptionIcon from "#components/shared/DescriptionIcon";
import AddRecommendation from "./AddRecommendation";
import { Grid, NarrowGridItem } from "#components/shared/Grid";

// styles
import * as Layout from "#components/shared/Layout";
import { buttonReset } from "#styles/mixins";
import { fl_static, fl_attention } from "#styles/frontline";

// assets
import Close from "#assets/icons/close-x.svg";

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  padding: 20px;
  position: relative;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    padding: 40px;
  }
`;

const OpenButton = styled.button`
  ${buttonReset}
  background-color: ${(props) => props.theme.colors.blue};
  bottom: 56px;
  color: ${(props) => props.theme.colors.textLightBlue};
  font-size: 0.8em;
  height: fit-content;
  padding: 10px;
  position: fixed;
  right: 0;
  text-transform: uppercase;
  z-index: 50;

  svg {
    fill: ${(props) => props.theme.colors.yellow};
  }
`;

const Triangle = styled.div`
  border-style: solid;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent
    ${(props) => props.theme.colors.textLightBlue} transparent;
  display: inline-block;
  height: 0;
  margin: 0 5px 3px 0;
  width: 0;
`;

const CloseButton = styled.button`
  ${buttonReset}
  height: 30px;
  position: absolute;
  right: 40px;
  top: 25px;
  width: 30px;
`;

export const Heading = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

export const Subheading = styled.h4`
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
  }
`;

export const CatalogContent = styled.div`
  @media ${(props) => props.theme.breakpoints.medium} {
    border-right: 1px solid ${(props) => props.theme.colors.borderGrey};
    padding-right: 5%;
    width: 50%;
  }

  ul {
    li {
      border-top: 1px solid ${(props) => props.theme.colors.borderGrey};
      margin-bottom: 30px;
      padding-top: 30px;

      &:first-of-type {
        border-top: none;
      }
    }
  }
`;

export const IconWrap = styled.p`
  display: flex;
  font-size: 0.8em;
  font-weight: normal;
  margin-bottom: 10px;
  text-transform: uppercase;

  svg {
    fill: ${(props) => props.theme.colors.textLightBlue};
    margin-right: 10px;
    width: 20px;
  }
`;

const CatalogItemTitle = styled(Link)`
  color: ${(props) => props.theme.colors.white};
  display: inline-block;
  font-size: 1.1em;
  font-weight: bold;
  margin: 5px 0 10px;

  ${fl_static(css`
    text-decoration: none;
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

const CatalogItemUtilities = styled.div``;

export const GuidesContent = styled.div`
  @media ${(props) => props.theme.breakpoints.medium} {
    padding-left: 5%;
    width: 50%;
  }
`;

export const ResearchGuideGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const customStyles = {
  content: {
    bottom: "56px",
    border: "none",
    left: "0",
    maxHeight: "70%",
    overflow: "auto",
    padding: "0",
    right: "0",
    top: "initial",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: "100",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ContentRecommendations = ({ guideId }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <OpenButton onClick={openModal}>
        <Triangle />
        Content Recommendations
      </OpenButton>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Content Recommendations"
      >
        <ModalContent>
          <CloseButton onClick={closeModal}>
            <Close />
          </CloseButton>
          <Layout.Center>
            <Heading>Content Recommendations</Heading>
          </Layout.Center>

          <ContentWrap>
            <CatalogContent>
              <Subheading>Catalog Content</Subheading>
              <ul>
                <Get url={`/guides/${guideId}/recommended-descriptions`}>
                  {(error, response, isLoading) => {
                    if (error) {
                      return <div>Error</div>;
                    } else if (isLoading) {
                      return <div>Loading...</div>;
                    } else if (response !== null) {
                      if (response.data.data.length) {
                        return (
                          <Fragment>
                            <p>
                              Based on your added records, you might be
                              interested in the following catalog content.
                            </p>
                            {response.data.data.map((description) => (
                              <li key={description.attributes.naId}>
                                <IconWrap>
                                  <DescriptionIcon
                                    level={description.attributes.level}
                                  />
                                  {description.attributes.level}
                                </IconWrap>
                                <CatalogItemTitle
                                  to={`/${description.attributes.naId}`}
                                >
                                  {description.attributes.title} (NAID{" "}
                                  {description.attributes.naId})
                                </CatalogItemTitle>
                                <CatalogItemUtilities>
                                  <AddRecommendation
                                    description={description}
                                    guideId={guideId}
                                  />
                                </CatalogItemUtilities>
                              </li>
                            ))}
                          </Fragment>
                        );
                      } else {
                        return (
                          <Fragment>
                            <p>
                              There is not enough information to make Catalog
                              recommendations yet. Continuing to add records to
                              your guide will help us learn what you are looking
                              for. Once we have recommendations for records and
                              other guides, we will share them here.
                            </p>
                          </Fragment>
                        );
                      }
                    } else {
                      return <div>Something went wrong</div>;
                    }
                  }}
                </Get>
              </ul>
            </CatalogContent>

            <GuidesContent>
              <Subheading>Guides to Records</Subheading>
              <p>
                These guides to records have some records in common with your
                guide.
              </p>
              <Grid>
                <Get url={`/guides/${guideId}/recommended-guides`}>
                  {(error, response, isLoading) => {
                    if (error) {
                      return <div>Error</div>;
                    } else if (isLoading) {
                      return <div>Loading...</div>;
                    } else if (response !== null) {
                      if (response.data.data.length) {
                        return (
                          <Fragment>
                            {response.data.data.map((guide) => (
                              <NarrowGridItem key={guide.attributes.id}>
                                <ResearchGuideCard
                                  narrow={true}
                                  title={
                                    guide.attributes.title || "Untitled Guide"
                                  }
                                  image={guide.attributes.background_image_url}
                                  link={`/guides/${guide.attributes.id}`}
                                  approved={guide.attributes.nara_approved}
                                  status={guide.attributes.status}
                                  pending={guide.attributes.pending}
                                  updated={guide.attributes.updated_at}
                                  demo={false}
                                />
                              </NarrowGridItem>
                            ))}
                          </Fragment>
                        );
                      } else {
                        return (
                          <Fragment>
                            <p>
                              There is not enough information to make Guides to
                              Records recommendations yet. Continuing to add
                              records to your guide will help us learn what you
                              are looking for. Once we have recommendations for
                              records and other guides, we will share them here.
                            </p>
                          </Fragment>
                        );
                      }
                    } else {
                      return <div>Something went wrong</div>;
                    }
                  }}
                </Get>
              </Grid>
            </GuidesContent>
          </ContentWrap>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContentRecommendations;
