import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// assets
import ItemIcon from '#assets/icons/item.svg';
import FileUnitIcon from '#assets/icons/file-unit.svg';
import SeriesIcon from '#assets/icons/series.svg';

// styles
import * as Layout from "#components/shared/Layout";
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";

export const Root = styled.div`
  padding: 0 20px;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    padding: 0;
  }

  & + & {
    border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
    margin-top: 20px;
    padding-top: 20px;

    @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
      margin-top: 40px;
      padding-top: 40px;
    }
  }
`;

export const ContentWrap = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  ${props =>
    props.image &&
    css`
      width: 75%;
    `}
`;

export const Label = styled.p`
  align-items: center;
  color: ${(props) => props.theme.colors.darkGrey};
  display: flex;
  font-size: 0.8em;
  margin-bottom: 10px;
  text-transform: uppercase;

  svg {
    margin-right: 10px;
  }
`;

export const Title = styled(Link)`
  color: ${(props) => props.theme.colors.blue};
  font-size: 1.1em;
  font-weight: bold;

  ${fl_static(css`
    color: ${(props) => props.theme.colors.blue};
    text-decoration: none;
  `)}
  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    flex-direction: row;
  }
`;

export const InfoLabel = styled.p`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 0.8em;
  text-transform: uppercase;
  opacity: 0.7;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    width: 20%;
  }
`;

export const Info = styled.p`
  color: ${(props) => props.theme.colors.darkGrey};

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    width: 78%;
  }
`;

export const Image = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  height: 100px;
  width: 20%;
`;

const SectionItem = ({ item, fileUnit, series, image}) => {
  return (
    <Root>
      {item &&
        <Label>
          <ItemIcon />
            Item
          </Label>}

      {fileUnit &&
        <Label>
          <FileUnitIcon />
            File Unit
          </Label>}

      {series &&
        <Label>
          <SeriesIcon />
            Series
          </Label>}
      <ContentWrap>
        <Content image={ image }>
          <Title to="/">Civil Rights March on Washignton [Leaders Marching from the Washington Monument to the Lincoln Memorial]</Title>
          <InfoItem>
            <InfoLabel>Creator(s)</InfoLabel>
            <Info>US Information Agency Press and Puiblications Service</Info>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Scope & Content</InfoLabel>
            <Info>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Info>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Belongs To</InfoLabel>
            <Info>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Info>
          </InfoItem>
        </Content>
        {image && 
          <Image></Image>
        }
      </ContentWrap>
    </Root>
  );
};

export default SectionItem;
