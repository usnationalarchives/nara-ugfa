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
  padding: 20px 0 0;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    padding: 60px 0 0;
  }
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    flex-direction: row;
    margin-top: 60px;
  }
`;

const NavItem = styled.li`
  font-size: 0.9rem;
  margin-bottom: 8px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    font-size: 1rem;
    margin-bottom: 0;
    padding-right: 30px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  `)}

  @media all and ${(props) => props.theme.breakpoints.medium} {
    border-bottom: 4px solid transparent;
    padding: 0 0 30px;

    &[aria-current] {
      border-color: ${(props) => props.theme.colors.yellow};
    }
  }
`;

const ItemMeta = styled.span`
  font-size: 0.8rem;
  margin-left: 5px;
`;

const SignOut = styled.button`
  ${buttonStyles}
  margin-bottom: 12px;
  margin-top: 12px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin: 0;
    transform: translateY(-30%);
  }
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
                  <Text.NoWrap>
                    ({guides.length} Guide
                    {guides.length != 1 ? "s" : null})
                  </Text.NoWrap>
                </ItemMeta>
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink exact to="/dashboard/bookmarked-guides">
                Bookmarked Guides
                <ItemMeta>
                  <Get url="/guides?bookmarked=true">
                    {(error, response, isLoading) => {
                      if (response) {
                        return (
                          <>
                            {response.data.data && (
                              <Text.NoWrap>
                                ({response.data.data.length} Guide
                                {response.data.data.length != 1 ? "s" : null})
                              </Text.NoWrap>
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
