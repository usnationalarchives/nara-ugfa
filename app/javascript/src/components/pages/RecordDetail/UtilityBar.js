import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// assets
import Chev from '#assets/icons/chevron.svg';

// styles
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';

export const Root = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
  font-size: 0.9em;
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

export const Utilties = styled.div`
  display: flex;
  padding: 10px 20px;
  
  @media all and (min-width: ${(props) => props.theme.layout.catalogColumnMin}) {
    margin-left: 150px;
    padding: 10px 0;
  }

  @media all and (min-width: 1000px) {
    margin-left: 200px;
  }

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    margin-left: 15%;
  }
`;

const UtilityBar = () => {
  return (
    <Root>
      <Utilties>
        <BackLink to="/catalog-search">
          <Chev/>
          Back to results
        </BackLink>
      </Utilties>
    </Root>
  );
};

export default UtilityBar;
