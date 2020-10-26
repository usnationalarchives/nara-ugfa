import React, { useState } from "react";
import styled from "styled-components";

// components
import * as Layout from "#components/shared/Layout";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";

export const Root = styled.div``;

export const UtilityNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Root id="header">
      <Layout.Padding>
        <UtilityNav>
          <Logo />
          <MenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </UtilityNav>
      </Layout.Padding>
    </Root>
  );
};

export default Header;
