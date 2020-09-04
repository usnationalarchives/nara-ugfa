import React, { useState } from "react";
import styled from "styled-components";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import SearchBox from "./SearchBox";
import MobileUserNav from "#components/shared/MobileUserNav";
import MobileUserNavToggle from "#components/shared/MobileUserNavToggle";
import DesktopUserNav from "#components/shared/DesktopUserNav";

// styles
import { buttonReset } from "#styles/mixins";

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  position: relative;
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;
`;

const NavBar = ({ title }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Root>
      <Layout.Padding>
        <Inner>
          {title && <Text.H3 style={{ padding: "5px 0" }}>{title}</Text.H3>}

          {!title && <SearchBox />}

          <MobileUserNavToggle
            open={mobileNavOpen}
            setOpen={setMobileNavOpen}
          />

          <DesktopUserNav />
        </Inner>
        {mobileNavOpen && <MobileUserNav />}
      </Layout.Padding>
    </Root>
  );
};

export default NavBar;
