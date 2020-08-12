import React, { useState } from "react";
import styled from 'styled-components';

// components
import * as Layout from "#components/shared/Layout";
import MenuToggle from './MenuToggle';
import NavBar from './NavBar';

export const Root = styled.div`
`;

export const UtilityNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper>
          <UtilityNav>
            <p>National Archives Catalog</p>
            <MenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </UtilityNav>
        </Layout.Wrapper>
      </Layout.Padding>
      <NavBar/>
    </Root>
  );
};

export default Header;
