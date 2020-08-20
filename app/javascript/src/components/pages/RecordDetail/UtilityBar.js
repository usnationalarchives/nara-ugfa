import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";

// assets
import Chev from '#assets/icons/chevron.svg';

// styles
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';

export const Root = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
  display: flex;
  font-size: 0.9em;
  justify-content: space-between;
`;

export const Utilties = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 10px 0;
  width: 100%;
  
  @media all and (min-width: ${(props) => props.theme.layout.catalogColumnMin}) {
    flex-direction: row;
    margin: auto;
    width: 100%;
  }
`;

export const BackLink = styled(Link)`
  font-size: 0.9em;
  ${fl_static(css`
      color: ${props => props.theme.colors.blue};
      text-decoration: none;
  `)}
    ${fl_attention(css`
      text-decoration: underline;
  `)}

  svg {
    margin-right: 5px;
    path {
      stroke: ${props => props.theme.colors.blue};
    } 
  }
`;

export const ShareLinks = styled.ul`
  display: flex;
  justify-content: space-around;
  opacity: 0.3;
  margin-bottom: 10px;
  width: 150px;

  li {
    padding-left: 5px;

    &:first-of-type {
      padding-left: 0;
    }
  }

  @media all and (min-width: ${(props) => props.theme.layout.catalogColumnMin}) {
    margin-bottom: 0;
  }
`;

const UtilityBar = () => {
  return (
    <Root>

      <Layout.Padding>
        <Layout.Wrapper>
      <Utilties>
        <BackLink to="/catalog-search">
          <Chev/>
          Back to results
        </BackLink>
        <ShareLinks>
          <li>Share |</li>
          <li>Export |</li>
          <li>Print</li>
        </ShareLinks>
          </Utilties>
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default UtilityBar;
