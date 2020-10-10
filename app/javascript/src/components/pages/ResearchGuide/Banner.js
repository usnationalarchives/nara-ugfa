import React, { useContext } from "react";
import styled from "styled-components";

// components
import * as Layout from "#components/shared/Layout";
import Button from "#components/shared/Button";

// contexts
import { UserContext } from "#contexts/User";

// modules
import backgroundColors from "#modules/backgroundColors";

// assets
import Star from "#assets/icons/star.svg";

export const Root = styled.div`
  align-items: stretch;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;

  @media all and (min-width: 700px) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  margin: auto;
  padding: 20px 0;
  position: relative;

  @media all and (min-width: 700px) {
    width: 500px;
  }

  @media all and (min-width: 1000px) {
    max-width: 700px;
  }
`;

export const ModeratorButtons = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  left: 0;
  margin-top: 20px;
  max-width: 250px;
  position: absolute;
  right: 20px;
  top: -45px;
`;

export const StyledButton = styled(Button)`
  font-size: 0.8em;
  max-width: 100px;
  padding: 10px 18px;
  width: 46%;

  &:active,
  &:focus {
    span {
      display: block !important;
    }
  }
`;

const DemoPopup = styled.span`
  background: #fff;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: 10px;
  box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.2);
  color: ${props => props.theme.colors.textLightGrey};
  display: none;
  font-size: 12px;
  height: fit-content;
  padding: 5px;
  position: absolute;
  right: -100px;
  text-transform: none;
  top: -20px;
  width: 120px;
  z-index: 100;

  @media ${(props) => props.theme.breakpoints.medium} {
    right: -25px;
    top: -62px;
    width: 150px;
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.textColor};
  font-size: 1.5em;
  font-weight: bold;
  line-height: 1.25;
  margin-bottom: 10px;

  @media all and (min-width: 700px) {
    font-size: 1.9em;
  }

  @media all and (min-width: 1000px) {
    font-size: 2.2em;
    margin-bottom: 20px;
  }
`;

export const Attribution = styled.p`
  color: ${(props) => props.textColor};
`;

export const PublishedDate = styled.p`
  color: ${(props) => props.textColor};
  font-size: 0.8em;
  margin-top: 20px;
  text-transform: uppercase;
  opacity: 0.7;
`;

export const Image = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  height: 150px;
  width: 100%;

  @media all and (min-width: 700px) {
    height: inherit;
    width: 33%;
  }
`;

export const UserRecommendations = styled.div`
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.white};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  display: flex;
  font-size: 0.8em;
  margin-top: 20px;
  padding: 5px 10px;
  width: 150px;

  &:hover {
    div {
      display: block;
    }
  }
  
  svg {
    height: 15px;
    fill: ${(props) => props.theme.colors.white};
    margin-right: 5px;
    width: 15px;
  }
`;

export const UserRecommendationsTooltip = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 3px;
  bottom: 55px;
  color: ${(props) => props.theme.colors.darkGrey};
  display: none;
  font-size: 0.65rem;
  left: -5px;
  padding: 5px;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  width: 200px;
  z-index: 10;
`;

const Triangle = styled.div`
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: ${(props) => props.theme.colors.white} transparent transparent transparent;
  bottom: -5px;
  display: inline-block;
  height: 0;
  left: 90px;
  position: absolute;
  width: 0;
`;

const Banner = ({ data }) => {
  const userContext = useContext(UserContext);

  const backgroundColor = backgroundColors.filter(
    (c) => c.value === data.attributes.background_color
  )[0].code;

  const textColor = backgroundColors.filter(
    (c) => c.value === data.attributes.background_color
  )[0].text;

  return (
    <Root backgroundColor={backgroundColor}>
      <Content>
        <Layout.Padding>
          {data.attributes.pending && 
          !data.attributes.nara_approved && 
          userContext.state.user.catalog_attributes.isNaraStaff && (
            <ModeratorButtons>
              <StyledButton scheme="green-outline">
                Approve
                <DemoPopup>This feature is for demonstration purposes only.</DemoPopup>
              </StyledButton>
              <StyledButton scheme="red-outline">
                Reject
                <DemoPopup>This feature is for demonstration purposes only.</DemoPopup>
              </StyledButton>
            </ModeratorButtons>
          )}
          <Title textColor={textColor}>{data.attributes.title}</Title>
          <Attribution textColor={textColor}>
            {data.attributes.author.name}, {data.attributes.author.role}
          </Attribution>
          <PublishedDate textColor={textColor}>
            Last Edit {data.attributes.updated}
          </PublishedDate>
          {data.attributes.nara_approved && (
            <UserRecommendations>
              <Star /> You and 12 Others
                <UserRecommendationsTooltip>
                  This guide is recommended by you  and 12 others.
                  <Triangle/>
                </UserRecommendationsTooltip>
            </UserRecommendations>
          )}
        </Layout.Padding>
      </Content>
      {data.attributes.background_image_url && (
        <Image imageUrl={data.attributes.background_image_url} />
      )}
    </Root>
  );
};

export default Banner;
