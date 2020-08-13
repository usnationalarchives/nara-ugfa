import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

// assets
import CatalogLogo from '#assets/catalog_logo.svg';

export const Root = styled.div`
  align-items: center;
  display: flex;
  width: 60%;

  svg {
    width: 100%;
    
    @media all and ${(props) => props.theme.breakpoints.wideNavBP} {
     max-width: 400px;
    }
  }
`;

const Logo = () => {
  return (
    <Root>
      <Link to="/">
        <CatalogLogo/>
      </Link>
    </Root>
  );
};

export default Logo;
