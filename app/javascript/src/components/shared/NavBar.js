import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import SearchBox from "./SearchBox";
import DropdownMenu, { DropdownLink } from "#components/shared/DropdownMenu";
import Button, { ButtonLink } from "#components/shared/Button";

// contexts
import { UserContext } from "#contexts/User";

// styles
import { fl_allStates } from "#styles/frontline";

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  position: relative;
`;

export const NavBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;

  @media all and ${(props) => props.theme.breakpoints.navBP} {
    align-items: center;
    flex-direction: row;
  }
`;

export const NavList = styled.div`
  display: flex;
  list-style: none;
  margin-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.navBP} {
    margin-top: 0;
  }
`;

export const NavListItem = styled.div`
  font-size: 1em;
  line-height: 1.25;
  margin-left: 20px;

  &:first-of-type {
    margin-left: 0;
  }

  @media all and ${(props) => props.theme.breakpoints.wideNavBP} {
    font-size: 1.1em;
  }
`;

export const LoginItem = styled.div`
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1em;
  line-height: 1.25;
  margin-left: 20px;
  padding-left: 20px;

  @media all and ${(props) => props.theme.breakpoints.wideNavBP} {
    font-size: 1.1em;
  }
`;

const LoginLink = styled(Link)`
  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  `)}
`;

const NavBar = ({ title }) => {
  const context = useContext(UserContext);

  const logout = () => {
    window.location = "/";
    context.actions.logout();
  };

  return (
    <Root>
      <Layout.Padding>
        <NavBarWrap>
          {title && <Text.H3 style={{ padding: "5px 0" }}>{title}</Text.H3>}
          {!title && <SearchBox />}
          <NavList>
            <NavListItem>
              <DropdownMenu label="Guides to Records">
                <DropdownLink to="/research-guides">
                  Explore Guides to Records
                </DropdownLink>
                <DropdownLink to="/research-guides">
                  Getting Started
                </DropdownLink>

                <ButtonLink
                  style={{ marginTop: "20px" }}
                  block
                  scheme="outline"
                  href="/research-guides"
                >
                  Create a Guide
                </ButtonLink>
              </DropdownMenu>
            </NavListItem>
            <LoginItem>
              {context.state.user && (
                <DropdownMenu label={context.state.user.name}>
                  <DropdownLink to="/dashboard">Dashboard</DropdownLink>
                  <DropdownLink to="/dashboard/guides">
                    My Guides to Records
                  </DropdownLink>
                  <DropdownLink to="/dashboard/settings">Settings</DropdownLink>
                  <Button
                    style={{ marginTop: "20px" }}
                    block
                    scheme="outline"
                    onClick={logout}
                  >
                    Sign Out
                  </Button>
                </DropdownMenu>
              )}

              {!context.state.user && <LoginLink to="/login">Login</LoginLink>}
            </LoginItem>
          </NavList>
        </NavBarWrap>
      </Layout.Padding>
    </Root>
  );
};

export default NavBar;
