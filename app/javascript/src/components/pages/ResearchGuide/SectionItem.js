import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components 
import ItemInfo from "./ItemInfo";
import SlideToggleContent from "../../shared/SlideToggleContent";
import Triangle from "../../shared/Triangle";

// assets
import ItemIcon from '#assets/icons/item.svg';
import FileUnitIcon from '#assets/icons/file-unit.svg';
import SeriesIcon from '#assets/icons/series.svg';

// styles
import * as Layout from "#components/shared/Layout";
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";
import { buttonReset } from '#styles/mixins';

export const Root = styled.div`
  padding: 0 20px;

  @media all and (min-width: 820px) {
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

  button {
    ${buttonReset}

    color: ${(props) => props.theme.colors.blue};
    display: block;
    font-size: 0.8em;
    margin-top: 20px;
    text-align: left;
    text-transform: uppercase;

    @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
      display: none;
    }
  }
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

export const DesktopInfo = styled.div`
  display: none;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    display: block;
  }
`;



export const Image = styled.div`
  display: none;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    background-color: ${(props) => props.theme.colors.mediumGrey};
    display: block;
    height: 100px;
    width: 20%;
  }
`;

export const MobileImage = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  height: 150px;
  margin-top: 20px;
  width: 150px;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    display: none;
  }
`;

const SectionItem = ({ item, fileUnit, series, image, id }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Root id={id}>
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
          {image &&
            <MobileImage></MobileImage>
          }

          {/* Mobile view for item info */}
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            Metadata
            <Triangle toggleOpen={isVisible}></Triangle>
          </button>
          <SlideToggleContent isVisible={isVisible}>
            <ItemInfo/>
          </SlideToggleContent>

          {/* Desktop view for item info */}
          <DesktopInfo>
            <ItemInfo />
          </DesktopInfo>

        </Content>
        {image && 
          <Image></Image>
        }
      </ContentWrap>
    </Root>
  );
};

export default SectionItem;
