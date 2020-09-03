import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// styles
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";

export const Root = styled.div``;

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

  a {
    ${fl_static(css`
      color: ${(props) => props.theme.colors.blue};
      text-decoration: none;
    `)}
    ${fl_attention(css`
      text-decoration: underline;
    `)}
  }
`;

const ItemInfo = () => {
  return (
    <>
      <InfoItem>
        <InfoLabel>Creator(s)</InfoLabel>
        <Info>
          <Link to="/">
            US Information Agency Press and Puiblications Service
          </Link>{" "}
          (Most Recent)
        </Info>
      </InfoItem>
      <InfoItem>
        <InfoLabel>Scope & Content</InfoLabel>
        <Info>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Info>
      </InfoItem>
    </>
  );
};

export default ItemInfo;
