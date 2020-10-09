import React, { Fragment, useContext } from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { Get } from "react-axios";

// contexts
import { UserContext } from "#contexts/User";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";

// styles
import { buttonStyles } from "#components/shared/Button";
import { fl_allStates } from "#styles/frontline";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.white};
  padding: 60px 0 0;
`;

const Nav = styled.ul`
  display: flex;
  margin-top: 60px;
  align-items: center;
`;

const NavItem = styled.li`
  margin-right: 30px;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  padding: 0 0 30px;
  border-bottom: 4px solid transparent;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  `)}

  &[aria-current] {
    border-color: ${(props) => props.theme.colors.yellow};
  }
`;

const ItemMeta = styled.span`
  font-size: 0.8rem;
  margin-left: 5px;
`;

const SignOut = styled.button`
  ${buttonStyles}
  transform: translateY(-30%);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 100%;
  margin-right: 1rem;
`;

const Name = styled.div``;

const Banner = ({ name, gravatar, role, guides }) => {
  const userContext = useContext(UserContext);

  const handleLogOut = () => {
    userContext.actions.logout();
    window.location = "/";
  };

  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper medium>
          <UserInfo>
            <Avatar
              src={gravatar}
              alt=""
              aria-hidden="true"
              role="presentation"
            />
            <Name>
              <Text.H1>{name}</Text.H1>
              <p>{role}</p>
            </Name>
          </UserInfo>

          <Nav>
            <NavItem>
              <StyledNavLink exact to="/dashboard">
                Dashboard
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink exact to="/dashboard/guides">
                My Guides to Records
                <ItemMeta>
                  ({guides.length} Guide
                  {guides.length > 1 ? "s" : null})
                </ItemMeta>
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink exact to="/dashboard/bookmarked-guides">
                Bookmarked Guides
                <ItemMeta>
                  <Get url="/guides">
                    {(error, response, isLoading) => {
                      if (response) {
                        return (
                          <>
                            {response.data.data && (
                              <span>({response.data.data.length} Guides)</span>
                            )}
                          </>
                        );
                      }
                      return <div>Loading...</div>;
                    }}
                  </Get>
                </ItemMeta>
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink exact to="/dashboard/settings">
                Settings
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <SignOut onClick={handleLogOut}>Sign Out</SignOut>
            </NavItem>
          </Nav>
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default Banner;
