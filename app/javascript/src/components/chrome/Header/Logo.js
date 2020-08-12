import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

// assets
import CatalogLogo from '#assets/catalog_logo.svg';

export const Root = styled.div`
  svg {
    height: 35px;
  }
`;

const Logo = () => {
  return (
    <Root>
      <Link>
        <CatalogLogo/>
      </Link>
    </Root>
  );
};

export default Logo;
