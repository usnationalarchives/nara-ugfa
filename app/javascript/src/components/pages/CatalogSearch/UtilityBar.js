import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";

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
  
  @media all and (min-width: ${(props) => props.theme.layout.catalogColumnMin}) {
    flex-direction: row;
    padding: 10px 0;

    p {
      width: 60%;
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
          <p>1-20 of 345,238 results in 1.38 seconds. Show expanded search terms.</p>
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
