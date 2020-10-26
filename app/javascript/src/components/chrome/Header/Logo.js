import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// components
import { Screenreader } from "#components/shared/Text";

// assets
import CatalogLogo from "#assets/catalog_logo.svg";

export const Root = styled.div`
  align-items: center;
  display: flex;
  width: 100%;

  svg {
    max-width: 350px;
    width: 100%;
  }
`;

export const LogoLink = styled(Link)`
  width: 100%;
`;

const Logo = () => {
  return (
    <Root>
      <LogoLink to="/">
        <CatalogLogo />
        <Screenreader>National Archives Catalog</Screenreader>
      </LogoLink>
    </Root>
  );
};

export default Logo;
