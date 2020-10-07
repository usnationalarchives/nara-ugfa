import React, { useState } from "react";
import styled, { css } from 'styled-components';
import Modal from 'react-modal';
import { Link } from "react-router-dom";

// components
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';

// styles
import * as Layout from "#components/shared/Layout";
import { buttonReset } from '#styles/mixins';

// assets
import Close from '#assets/icons/close-x.svg';
import SeriesIcon from "#assets/icons/hierarchy-series.svg";
import ItemIcon from "#assets/icons/hierarchy-item.svg";
import BoxIcon from "#assets/icons/hierarchy-record-group.svg";
import FileUnitIcon from "#assets/icons/hierarchy-file-unit.svg";

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.white};
  padding: 20px;
  position: relative;

  @media all and (min-width: 600px) {
    padding: 40px;
  }
`;

const OpenButton = styled.button`
  ${buttonReset}
  background-color: ${props => props.theme.colors.blue};
  bottom: 56px;
  color: ${(props) => props.theme.colors.textLightBlue};
  font-size: 0.8em;
  height: fit-content;
  padding: 10px;
  position: fixed;
  right: 0;
  text-transform: uppercase;

  svg {
    fill: ${props => props.theme.colors.yellow}
  }
`;

const Triangle = styled.div`
  border-style: solid;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent ${(props) => props.theme.colors.textLightBlue} transparent;
  display: inline-block;
  height: 0;
  margin: 0 5px 3px 0;
  width: 0;
`;

const CloseButton = styled.button`
  ${buttonReset}
  height: 15px;
  position: absolute;
  right: 40px;
  top: 25px;
  width: 15px;
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

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const CatalogContent = styled.div`

  @media (min-width: 600px) {
    border-right: 1px solid ${(props) => props.theme.colors.darkGrey};
    padding-right: 5%;
    width: 50%;
  }

  ul {
    li {
      border-top: 1px solid ${(props) => props.theme.colors.darkGrey};
      margin-bottom: 20px;
      padding-top: 20px;

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
  color: ${props => props.theme.colors.white};
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

const CatalogItemUtilities = styled.div`
`;

export const AddToGuide = styled(Link)`
  align-items: center;
  color: ${props => props.theme.colors.yellow};
  display: flex;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;

  ${fl_static(css`
    text-decoration: none;
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

export const PlusIcon = styled.div`
  display: inline-block;
  height: 24px;
  position: relative;
  vertical-align: middle;
  width: 24px;

  &:before,
  &:after {
    background: ${(props) => props.theme.colors.yellow};
    bottom: 3px;
    content: "";
    left: 3px;
    position: absolute;
    right: 3px;
    top: 3px;
  }

  &:before {
    width: 2px;
    margin: 3px auto;
  }

  &:after {
    margin: auto 3px;
    height: 2px;
    box-shadow: none;
  }
`;

export const GuidesContent = styled.div`
  @media (min-width: 600px) {
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
    border: 'none',
    left: '0',
    right: '0',
    bottom: '56px',
    overflow: 'initial',
    padding: '0',
    right: '0',
    top: 'initial'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const ContentRecommendations = () => {
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
        contentLabel="Content Recommendations">
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
              <p>Based on your added records, you might be interested in the following catalog content.</p>
              <ul>
                <li>
                  <IconWrap>
                    <FileUnitIcon />
                    File Unit
                  </IconWrap>
                  <CatalogItemTitle to="#">
                    March on Washington
                  </CatalogItemTitle>
                  <CatalogItemUtilities>
                    <AddToGuide to="#">
                      Add to Guide
                      <PlusIcon/>
                    </AddToGuide>
                  </CatalogItemUtilities>
                </li>
                <li>
                  <IconWrap>
                    <SeriesIcon />
                    Series
                  </IconWrap>
                  <CatalogItemTitle to="#">
                    Civil Rights March
                  </CatalogItemTitle>
                  <CatalogItemUtilities>
                    <AddToGuide to="#">
                      Add to Guide
                      <PlusIcon />
                    </AddToGuide>
                  </CatalogItemUtilities>
                </li>
                <li>
                  <IconWrap>
                    <ItemIcon />
                    Item
                  </IconWrap>
                  <CatalogItemTitle to="#">
                    White House Subject Files
                  </CatalogItemTitle>
                  <CatalogItemUtilities>
                    <AddToGuide to="#">
                      Add to Guide
                      <PlusIcon />
                    </AddToGuide>
                  </CatalogItemUtilities>
                </li>
              </ul>
            </CatalogContent>

            <GuidesContent>
              <Subheading>Guides to Records</Subheading>
              <p>These guides to records have some records in common with your guide.</p>
              <ResearchGuideGrid>
                <ResearchGuideCard
                    narrow={true}
                    key='5'
                    title='Cool Title'
                    image={true}
                    link={`/guides/5`}
                    approved='no'
                  />
              </ResearchGuideGrid>
            </GuidesContent>
          </ContentWrap>

        </ModalContent>
      </Modal>
    </>
  );
};

export default ContentRecommendations;
